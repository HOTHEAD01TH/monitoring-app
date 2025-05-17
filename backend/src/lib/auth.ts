import { z } from 'zod'
import * as jose from 'jose'

// JWT secret key from environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// JWT payload schema
const jwtPayloadSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  iat: z.number(),
  exp: z.number(),
})

// Request body schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type JWTPayload = z.infer<typeof jwtPayloadSchema>
type LoginRequest = z.infer<typeof loginSchema>
type RegisterRequest = z.infer<typeof registerSchema>

// Helper function to convert string to ArrayBuffer
function stringToArrayBuffer(str: string): Uint8Array {
  const encoder = new TextEncoder()
  return encoder.encode(str)
}

// Helper function to convert ArrayBuffer to string
function arrayBufferToString(buffer: Uint8Array): string {
  const decoder = new TextDecoder()
  return decoder.decode(buffer)
}

// Helper function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < buffer.byteLength; i++) {
    binary += String.fromCharCode(buffer[i])
  }
  return btoa(binary)
}

// Helper function to convert base64 to ArrayBuffer
function base64ToArrayBuffer(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

// Sign JWT token
export async function signJWT(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: now + 24 * 60 * 60, // 24 hours
  }

  const secret = new TextEncoder().encode(JWT_SECRET)
  return await new jose.SignJWT(tokenPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secret)
}

// Verify JWT token
export async function verifyJWT(token: string): Promise<JWTPayload> {
  const secret = new TextEncoder().encode(JWT_SECRET)
  const { payload } = await jose.jwtVerify(token, secret)
  const validatedPayload = jwtPayloadSchema.parse(payload)

  if (validatedPayload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired')
  }

  return validatedPayload
}

// Auth middleware
export async function authMiddleware(request: Request): Promise<{ userId: string }> {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing or invalid authorization header')
  }

  const token = authHeader.split(' ')[1]
  const payload = await verifyJWT(token)

  return { userId: payload.userId }
}

export { loginSchema, registerSchema } 