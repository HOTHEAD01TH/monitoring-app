import { Hono } from 'hono'
import { z } from 'zod'
import { prisma } from '../lib/db'
import { authMiddleware } from '../lib/auth'
import type { Context } from 'hono'

// Extend Hono context to allow userId
interface UserContext extends Context {
  set<T = unknown>(key: string, value: T): void
  get<T = unknown>(key: string): T
}

const sites = new Hono()

// Validation schemas
const createSiteSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  description: z.string().nullable(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE']).default('ACTIVE'),
})

const updateSiteSchema = createSiteSchema.partial()

// Middleware to require authentication for all site routes
sites.use('*', async (c, next) => {
  try {
    const authResult = await authMiddleware(c.req.raw);
    const userId = (authResult as { userId: string }).userId;
    (c as UserContext).set<string>('userId', userId);
    await next();
  } catch (error) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
});

// Get all sites
sites.get('/', async (c) => {
  try {
    const userId = (c as UserContext).get<string>('userId')
    const sites = await prisma.site.findMany({
      where: { userId: userId as string },
      include: {
        checks: true,
      },
    })
    return c.json(sites)
  } catch (error) {
    return c.json({ error: 'Failed to fetch sites' }, 500)
  }
})

// Get a single site
sites.get('/:id', async (c) => {
  const id = c.req.param('id')
  try {
    const userId = (c as UserContext).get<string>('userId')
    const site = await prisma.site.findUnique({
      where: { id, userId: userId as string },
      include: {
        checks: true,
      },
    })
    if (!site) {
      return c.json({ error: 'Site not found' }, 404)
    }
    return c.json(site)
  } catch (error) {
    return c.json({ error: 'Failed to fetch site' }, 500)
  }
})

// Create a new site
sites.post('/', async (c) => {
  try {
    const userId = (c as UserContext).get<string>('userId')
    const body = await c.req.json()
    const validatedData = createSiteSchema.parse(body)
    
    const site = await prisma.site.create({
      data: {
        ...validatedData,
        user: { connect: { id: userId as string } },
      },
    })
    return c.json(site, 201)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400)
    }
    return c.json({ error: 'Failed to create site' }, 500)
  }
})

// Update a site
sites.patch('/:id', async (c) => {
  const id = c.req.param('id')
  try {
    const userId = (c as UserContext).get<string>('userId')
    const body = await c.req.json()
    const validatedData = updateSiteSchema.parse(body)
    
    const site = await prisma.site.update({
      where: { id, userId: userId as string },
      data: validatedData,
    })
    return c.json(site)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400)
    }
    return c.json({ error: 'Failed to update site' }, 500)
  }
})

// Delete a site
sites.delete('/:id', async (c) => {
  const id = c.req.param('id')
  try {
    const userId = (c as UserContext).get<string>('userId')
    
    // First delete all checks associated with the site
    await prisma.check.deleteMany({
      where: { 
        siteId: id,
        site: {
          userId: userId as string
        }
      },
    })
    
    // Then delete the site
    await prisma.site.delete({
      where: { 
        id,
        userId: userId as string 
      },
    })
    
    return c.json({ message: 'Site deleted successfully' })
  } catch (error) {
    console.error('Failed to delete site:', error)
    return c.json({ error: 'Failed to delete site' }, 500)
  }
})

export default sites