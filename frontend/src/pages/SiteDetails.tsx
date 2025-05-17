import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, Site, Check, Response } from '../lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function SiteDetails() {
  const { id } = useParams<{ id: string }>()
  const [site, setSite] = useState<Site | null>(null)
  const [checks, setChecks] = useState<Check[]>([])
  const [responses, setResponses] = useState<Response[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [siteData, checksData] = await Promise.all([
          api.getSites().then(sites => sites.find(s => s.id === id)),
          api.getChecks(id!),
        ])

        if (!siteData) {
          toast.error('Site not found')
          return
        }

        setSite(siteData)
        setChecks(checksData)

        // Fetch response data for the first check if available
        if (checksData.length > 0) {
          const responseData = await api.getCheckHistory(checksData[0].id)
          setResponses(responseData)
        }
      } catch (error) {
        toast.error('Failed to fetch site data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!site) {
    return <div>Site not found</div>
  }

  const chartData = responses.map(response => ({
    timestamp: new Date(response.timestamp).toLocaleTimeString(),
    latency: response.latency,
    status: response.status,
  }))

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{site.name}</h1>
        <p className="text-gray-600">{site.url}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Site Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  site.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className="capitalize">{site.status.toLowerCase()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{checks.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Response Time History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="latency"
                  stroke="#8884d8"
                  name="Response Time (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monitoring Checks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {checks.map(check => (
              <div
                key={check.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold capitalize">{check.type.toLowerCase()}</h3>
                  <p className="text-sm text-gray-600">
                    Interval: {check.interval} seconds
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 