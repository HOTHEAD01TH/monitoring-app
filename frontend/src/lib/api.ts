import { z } from 'zod'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787/api'

// API response types
export const siteSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  description: z.string().nullable(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE']),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const checkSchema = z.object({
  id: z.string(),
  siteId: z.string(),
  type: z.enum(['HTTP', 'HTTPS', 'PING', 'TCP', 'DNS']),
  interval: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const responseSchema = z.object({
  id: z.string(),
  checkId: z.string(),
  timestamp: z.string(),
  status: z.number(),
  latency: z.number(),
  error: z.string().nullable(),
})

export type Site = z.infer<typeof siteSchema>
export type Check = z.infer<typeof checkSchema>
export type Response = z.infer<typeof responseSchema>

export interface CheckResult {
  id: string;
  checkId: string;
  status: string;
  latency: number | null;
  response: string | null;
  timestamp: string;
}

export interface CheckMetrics {
  uptime: number;
  avgLatency: number;
  errorRate: number;
  totalChecks: number;
  successfulChecks: number;
  results: CheckResult[];
}

// API client class
class ApiClient {
  private token: string | null = null

  constructor() {
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('token')
  }

  private get headers() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }
    return headers
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    const data = await response.json()
    this.token = data.token
    localStorage.setItem('token', data.token)
    return data
  }

  async register(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed')
    }

    this.token = data.token
    localStorage.setItem('token', data.token)
    return data
  }

  logout() {
    this.token = null
    localStorage.removeItem('token')
  }

  // Site methods
  async getSites() {
    const response = await fetch(`${API_URL}/sites`, {
      headers: this.headers,
    })

    if (!response.ok) {
      throw new Error('Failed to fetch sites')
    }

    const data = await response.json()
    return z.array(siteSchema).parse(data)
  }

  async createSite(site: Omit<Site, 'id' | 'createdAt' | 'updatedAt'>) {
    const response = await fetch(`${API_URL}/sites`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(site),
    })

    if (!response.ok) {
      throw new Error('Failed to create site')
    }

    const data = await response.json()
    return siteSchema.parse(data)
  }

  async updateSite(id: string, site: Partial<Site>) {
    const response = await fetch(`${API_URL}/sites/${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(site),
    })

    if (!response.ok) {
      throw new Error('Failed to update site')
    }

    const data = await response.json()
    return siteSchema.parse(data)
  }

  async deleteSite(id: string) {
    const response = await fetch(`${API_URL}/sites/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })

    if (!response.ok) {
      throw new Error('Failed to delete site')
    }

    return response.json()
  }

  // Check methods
  async getChecks(siteId: string) {
    const response = await fetch(`${API_URL}/checks/site/${siteId}`, {
      headers: this.headers,
    })

    if (!response.ok) {
      throw new Error('Failed to fetch checks')
    }

    const data = await response.json()
    return z.array(checkSchema).parse(data)
  }

  async createCheck(check: Omit<Check, 'id' | 'createdAt' | 'updatedAt'>) {
    const response = await fetch(`${API_URL}/checks`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(check),
    })

    if (!response.ok) {
      throw new Error('Failed to create check')
    }

    const data = await response.json()
    return checkSchema.parse(data)
  }

  async updateCheck(id: string, check: Partial<Check>) {
    const response = await fetch(`${API_URL}/checks/${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(check),
    })

    if (!response.ok) {
      throw new Error('Failed to update check')
    }

    const data = await response.json()
    return checkSchema.parse(data)
  }

  async deleteCheck(id: string) {
    const response = await fetch(`${API_URL}/checks/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })

    if (!response.ok) {
      throw new Error('Failed to delete check')
    }

    return response.json()
  }

  // Response methods
  async getCheckHistory(checkId: string, limit = 100, startDate?: string, endDate?: string) {
    const params = new URLSearchParams({
      limit: limit.toString(),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    })

    const response = await fetch(`${API_URL}/checks/${checkId}/history?${params}`, {
      headers: this.headers,
    })

    if (!response.ok) {
      throw new Error('Failed to fetch check history')
    }

    const data = await response.json()
    return data
  }

  async getCheckMetrics(checkId: string): Promise<CheckMetrics> {
    const response = await fetch(`${API_URL}/checks/${checkId}/metrics`, {
      headers: this.headers,
    })

    if (!response.ok) {
      throw new Error('Failed to fetch check metrics')
    }

    return response.json()
  }
}

export const api = new ApiClient() 