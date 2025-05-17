import { Hono } from 'hono'
import { z } from 'zod'
import { prisma } from '../lib/db'
import { CheckType } from '@prisma/client'
import { authMiddleware } from '../lib/auth'
import type { Context } from 'hono'

// Extend Hono context to allow userId
interface UserContext extends Context {
  set<T = unknown>(key: string, value: T): void
  get<T = unknown>(key: string): T
}

const checks = new Hono()

// Get the base URL from environment or default to localhost
const API_URL = process.env.API_URL || 'http://localhost:8787'

// Validation schemas
const createCheckSchema = z.object({
  siteId: z.string(),
  type: z.nativeEnum(CheckType),
  interval: z.number().int().min(30).default(300), // Default 5 minutes
})

const updateCheckSchema = createCheckSchema.partial()

// Middleware to require authentication
checks.use('*', async (c, next) => {
  try {
    const authResult = await authMiddleware(c.req.raw)
    const authData = authResult as { userId: string }
    (c as UserContext).set<string>('userId', authData.userId)
    await next()
  } catch (error) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
})

// Get all checks for a site
checks.get('/site/:siteId', async (c) => {
  const siteId = c.req.param('siteId')
  const userId = (c as UserContext).get<string>('userId')
  
  try {
    // Verify site belongs to user
    const site = await prisma.site.findFirst({
      where: { id: siteId, userId },
    })
    
    if (!site) {
      return c.json({ error: 'Site not found' }, 404)
    }

    const checks = await prisma.check.findMany({
      where: { siteId },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return c.json(checks)
  } catch (error) {
    console.error('Failed to fetch checks:', error)
    return c.json({ error: 'Failed to fetch checks' }, 500)
  }
})

// Create a new check
checks.post('/', async (c) => {
  const userId = (c as UserContext).get<string>('userId')
  
  try {
    const body = await c.req.json()
    const validatedData = createCheckSchema.parse(body)
    
    // Verify site belongs to user
    const site = await prisma.site.findFirst({
      where: { id: validatedData.siteId, userId },
    })
    
    if (!site) {
      return c.json({ error: 'Site not found' }, 404)
    }

    // Create check with pending status
    const check = await prisma.check.create({
      data: {
        ...validatedData,
        status: 'pending',
        response: null,
        latency: null,
      },
    })

    // Update site status to pending
    await prisma.site.update({
      where: { id: site.id },
      data: { status: 'MAINTENANCE' }, // Using MAINTENANCE as pending state
    })

    // Trigger immediate check
    try {
      const response = await fetch(`${API_URL}/api/cron/check`, {
        method: 'GET',
        headers: {
          'Authorization': c.req.header('Authorization') || '',
        },
      })
      if (!response.ok) {
        console.error('Failed to trigger initial check:', await response.text())
      }
    } catch (error) {
      console.error('Error triggering initial check:', error)
    }

    return c.json(check, 201)
  } catch (error) {
    console.error('Failed to create check:', error)
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400)
    }
    return c.json({ error: 'Failed to create check' }, 500)
  }
})

// Update a check
checks.patch('/:id', async (c) => {
  const id = c.req.param('id')
  const userId = (c as UserContext).get<string>('userId')
  
  try {
    const body = await c.req.json()
    const validatedData = updateCheckSchema.parse(body)
    
    // Verify check belongs to user's site
    const check = await prisma.check.findFirst({
      where: { id },
      include: { site: true },
    })
    
    if (!check || check.site.userId !== userId) {
      return c.json({ error: 'Check not found' }, 404)
    }

    const updatedCheck = await prisma.check.update({
      where: { id },
      data: validatedData,
    })
    return c.json(updatedCheck)
  } catch (error) {
    console.error('Failed to update check:', error)
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400)
    }
    return c.json({ error: 'Failed to update check' }, 500)
  }
})

// Delete a check
checks.delete('/:id', async (c) => {
  const id = c.req.param('id')
  const userId = (c as UserContext).get<string>('userId')
  
  try {
    // Verify check belongs to user's site
    const check = await prisma.check.findFirst({
      where: { id },
      include: { site: true },
    })
    
    if (!check || check.site.userId !== userId) {
      return c.json({ error: 'Check not found' }, 404)
    }

    await prisma.check.delete({
      where: { id },
    })
    return c.json({ message: 'Check deleted successfully' })
  } catch (error) {
    console.error('Failed to delete check:', error)
    return c.json({ error: 'Failed to delete check' }, 500)
  }
})

// Get check history
checks.get('/:id/history', async (c) => {
  const id = c.req.param('id')
  const userId = (c as UserContext).get<string>('userId')
  const limit = parseInt(c.req.query('limit') || '100')
  const startDate = c.req.query('startDate')
  const endDate = c.req.query('endDate')

  try {
    // Verify check belongs to user's site
    const check = await prisma.check.findFirst({
      where: { id },
      include: { site: true },
    })
    
    if (!check || check.site.userId !== userId) {
      return c.json({ error: 'Check not found' }, 404)
    }

    // Get check results with time range if provided
    const where = {
      checkId: id,
      ...(startDate && endDate ? {
        timestamp: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      } : {
        // Default to last 24 hours if no date range provided
        timestamp: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      }),
    }

    const results = await prisma.checkResult.findMany({
      where,
      orderBy: {
        timestamp: 'asc',
      },
      take: limit,
    })

    console.log(`Found ${results.length} check results for check ${id}`)
    return c.json(results)
  } catch (error) {
    console.error('Failed to fetch check history:', error)
    return c.json({ error: 'Failed to fetch check history' }, 500)
  }
})

// Get check metrics (aggregated data)
checks.get('/:id/metrics', async (c) => {
  const id = c.req.param('id')
  const userId = (c as UserContext).get<string>('userId')
  const startDate = c.req.query('startDate')
  const endDate = c.req.query('endDate')

  try {
    // Verify check belongs to user's site
    const check = await prisma.check.findFirst({
      where: { id },
      include: { site: true },
    })
    
    if (!check || check.site.userId !== userId) {
      return c.json({ error: 'Check not found' }, 404)
    }

    // Get check results with time range if provided
    const where = {
      checkId: id,
      ...(startDate && endDate ? {
        timestamp: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      } : {}),
    }

    const results = await prisma.checkResult.findMany({
      where,
      orderBy: {
        timestamp: 'asc',
      },
    })

    // Calculate metrics
    const totalChecks = results.length
    const successfulChecks = results.filter(r => r.status === "200").length
    const uptime = totalChecks > 0 ? (successfulChecks / totalChecks) * 100 : 0
    const avgLatency = results.reduce((acc, r) => acc + (r.latency || 0), 0) / totalChecks
    const errorRate = totalChecks > 0 ? ((totalChecks - successfulChecks) / totalChecks) * 100 : 0

    return c.json({
      uptime,
      avgLatency,
      errorRate,
      totalChecks,
      successfulChecks,
      results,
    })
  } catch (error) {
    console.error('Failed to fetch check metrics:', error)
    return c.json({ error: 'Failed to fetch check metrics' }, 500)
  }
})

export default checks 