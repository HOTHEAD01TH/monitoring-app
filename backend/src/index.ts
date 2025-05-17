// Polyfill global for Node.js compatibility
if (typeof global === 'undefined') {
  (globalThis as any).global = globalThis;
}

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import sites from './routes/sites'
import checks from './routes/checks'
import auth from './routes/auth'
import cron from './workers/cron'
import { authMiddleware } from './lib/auth'

const app = new Hono()

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://observify.pages.dev',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Middleware
app.use('*', logger())
app.use('*', cors({
  origin: ['http://localhost:5173', 'https://observify.pages.dev'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
}))

// Health check
app.get('/', (c) => c.json({ status: 'ok' }))

// Auth routes (public)
app.route('/api/auth', auth)

// Protected API routes
app.route('/api/sites', sites)
app.route('/api/checks', checks)

// Cron worker routes (protected)
app.route('/api/cron', cron)

// Error handling
app.onError((err, c) => {
  console.error(`${err}`)
  return c.json({ error: 'Internal Server Error' }, 500)
})

export default app
