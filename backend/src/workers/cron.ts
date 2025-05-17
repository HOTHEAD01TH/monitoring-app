import { Hono } from 'hono'
import { prisma } from '../lib/db'
import { CheckType } from '@prisma/client'

const cron = new Hono()

// Function to perform HTTP check
async function performHttpCheck(url: string): Promise<{ status: number; latency: number; error?: string }> {
  const startTime = Date.now()
  try {
    const response = await fetch(url)
    const latency = Date.now() - startTime
    return {
      status: response.status,
      latency,
    }
  } catch (error) {
    return {
      status: 0,
      latency: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Function to perform ping check
async function performPingCheck(host: string): Promise<{ status: number; latency: number; error?: string }> {
  const startTime = Date.now()
  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${host}/health`)
    const latency = Date.now() - startTime
    return {
      status: response.status,
      latency,
    }
  } catch (error) {
    return {
      status: 0,
      latency: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Function to determine site status based on check results
function determineSiteStatus(checkResult: { status: number; latency: number; error?: string }): 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' {
  if (checkResult.error || checkResult.status === 0) {
    return 'INACTIVE'
  }
  if (checkResult.status >= 500) {
    return 'MAINTENANCE'
  }
  if (checkResult.status >= 400) {
    return 'INACTIVE'
  }
  return 'ACTIVE'
}

// Main cron handler
cron.get('/check', async (c) => {
  try {
    // Get all active checks
    const checks = await prisma.check.findMany({
      include: {
        site: true,
      },
    })

    console.log(`Running checks for ${checks.length} sites`)

    const results = []

    for (const check of checks) {
      try {
        console.log(`Checking site: ${check.site.url}`)
        let checkResultData

        switch (check.type) {
          case CheckType.HTTP:
          case CheckType.HTTPS:
            checkResultData = await performHttpCheck(check.site.url)
            break
          case CheckType.PING:
            checkResultData = await performPingCheck(check.site.url)
            break
          default:
            console.warn(`Unsupported check type: ${check.type}`)
            continue
        }

        console.log(`Check result for ${check.site.url}:`, checkResultData)

        // Determine site status based on check result
        const siteStatus = determineSiteStatus(checkResultData)
        console.log(`Setting site status to: ${siteStatus}`)

        // Create a new check result entry
        const checkResult = await prisma.checkResult.create({
          data: {
            checkId: check.id,
            status: checkResultData.status.toString(),
            latency: checkResultData.latency,
            response: checkResultData.error || JSON.stringify({ status: checkResultData.status }),
            timestamp: new Date(),
          },
        })

        // Update the check with the latest result
        const updatedCheck = await prisma.check.update({
          where: { id: check.id },
          data: {
            status: checkResultData.status.toString(),
            latency: checkResultData.latency,
            response: checkResultData.error || JSON.stringify({ status: checkResultData.status }),
          },
        })

        // Update the site status
        await prisma.site.update({
          where: { id: check.site.id },
          data: {
            status: siteStatus,
          },
        })

        results.push(updatedCheck)
      } catch (error) {
        console.error(`Error processing check for site ${check.site.url}:`, error)
        // Continue with next check even if one fails
        continue
      }
    }

    return c.json({ success: true, results })
  } catch (error) {
    console.error('Cron job failed:', error)
    return c.json({ error: 'Cron job failed' }, 500)
  }
})

export default cron 