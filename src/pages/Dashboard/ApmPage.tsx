
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Server, Database, Globe, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const transactionData = [
  { time: "00:00", throughput: 120, latency: 45 },
  { time: "01:00", throughput: 132, latency: 40 },
  { time: "02:00", throughput: 101, latency: 39 },
  { time: "03:00", throughput: 134, latency: 52 },
  { time: "04:00", throughput: 90, latency: 38 },
  { time: "05:00", throughput: 110, latency: 42 },
  { time: "06:00", throughput: 185, latency: 63 },
  { time: "07:00", throughput: 220, latency: 78 },
  { time: "08:00", throughput: 340, latency: 90 },
  { time: "09:00", throughput: 310, latency: 80 },
  { time: "10:00", throughput: 350, latency: 85 },
  { time: "11:00", throughput: 280, latency: 70 },
  { time: "12:00", throughput: 380, latency: 95 },
  { time: "13:00", throughput: 390, latency: 98 },
  { time: "14:00", throughput: 409, latency: 105 },
  { time: "15:00", throughput: 350, latency: 90 },
  { time: "16:00", throughput: 290, latency: 75 },
  { time: "17:00", throughput: 280, latency: 72 },
  { time: "18:00", throughput: 240, latency: 65 },
  { time: "19:00", throughput: 220, latency: 62 },
  { time: "20:00", throughput: 200, latency: 58 },
  { time: "21:00", throughput: 180, latency: 52 },
  { time: "22:00", throughput: 145, latency: 48 },
  { time: "23:00", throughput: 130, latency: 45 }
];

const ApmPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Application Performance Monitoring</h1>
          <p className="text-muted-foreground">Detailed insights into your application's performance.</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button variant="outline">Last 24 hours</Button>
          <Button>Add to Dashboard</Button>
        </div>
      </div>
      
      {/* Service Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Web Transactions</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75 ms</div>
            <p className="text-xs text-muted-foreground">Avg. response time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25 ms</div>
            <p className="text-xs text-muted-foreground">Avg. query time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">External Services</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Active connections</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Code Level</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Active issues</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="databases">Databases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* Main APM Metrics Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Application Throughput & Latency</CardTitle>
              <CardDescription>Transaction throughput and average response time over the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={transactionData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" orientation="left" stroke="#1763FF" />
                  <YAxis yAxisId="right" orientation="right" stroke="#11A5A1" />
                  <Tooltip />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="throughput" 
                    name="Throughput (rpm)"
                    stroke="#1763FF" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="latency" 
                    name="Latency (ms)"
                    stroke="#11A5A1" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Web Transaction Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Web Transactions</CardTitle>
                <CardDescription>Highest traffic routes in your application</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="px-4 py-3 font-medium">Route</th>
                        <th className="px-4 py-3 font-medium">Avg. Time</th>
                        <th className="px-4 py-3 font-medium">Throughput</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { route: "/api/users", time: "42ms", throughput: "120rpm" },
                        { route: "/api/products", time: "65ms", throughput: "95rpm" },
                        { route: "/api/orders", time: "78ms", throughput: "60rpm" },
                        { route: "/api/auth", time: "35ms", throughput: "55rpm" },
                        { route: "/api/search", time: "120ms", throughput: "40rpm" }
                      ].map((tx, i) => (
                        <tr key={i} className={`border-b ${i % 2 === 0 ? 'bg-muted/20' : ''}`}>
                          <td className="px-4 py-3 font-medium">{tx.route}</td>
                          <td className="px-4 py-3">{tx.time}</td>
                          <td className="px-4 py-3">{tx.throughput}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Error Rate</CardTitle>
                <CardDescription>Application errors over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={transactionData.map(d => ({...d, errors: Math.round(d.throughput * 0.02 * Math.random())}))}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="errors" 
                      name="Errors"
                      stroke="#FF4E00" 
                      fill="#FF4E00" 
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Web Transactions</CardTitle>
              <CardDescription>Detailed breakdown of all web transactions</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <p className="text-muted-foreground">Transaction details will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>External Services</CardTitle>
              <CardDescription>Monitoring of external APIs and services</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <p className="text-muted-foreground">External services details will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="databases">
          <Card>
            <CardHeader>
              <CardTitle>Database Performance</CardTitle>
              <CardDescription>Monitoring of database queries and performance</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <p className="text-muted-foreground">Database performance details will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApmPage;
