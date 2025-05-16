
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, AlertCircle, Clock, TrendingUp, TrendingDown, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for charts
const performanceData = [
  { name: "12AM", value: 65 },
  { name: "2AM", value: 59 },
  { name: "4AM", value: 80 },
  { name: "6AM", value: 81 },
  { name: "8AM", value: 56 },
  { name: "10AM", value: 55 },
  { name: "12PM", value: 40 },
  { name: "2PM", value: 78 },
  { name: "4PM", value: 90 },
  { name: "6PM", value: 95 },
  { name: "8PM", value: 82 },
  { name: "10PM", value: 68 },
];

const errorRateData = [
  { name: "12AM", errors: 2, requests: 120 },
  { name: "2AM", errors: 3, requests: 110 },
  { name: "4AM", errors: 1, requests: 130 },
  { name: "6AM", errors: 7, requests: 150 },
  { name: "8AM", errors: 4, requests: 170 },
  { name: "10AM", errors: 5, requests: 190 },
  { name: "12PM", errors: 6, requests: 210 },
  { name: "2PM", errors: 2, requests: 170 },
  { name: "4PM", errors: 1, requests: 160 },
  { name: "6PM", errors: 3, requests: 180 },
  { name: "8PM", errors: 4, requests: 140 },
  { name: "10PM", errors: 3, requests: 130 },
];

const services = [
  { name: "API Gateway", status: "healthy", apdex: 0.98, responseTime: "45ms", throughput: "240 rpm" },
  { name: "User Service", status: "healthy", apdex: 0.92, responseTime: "120ms", throughput: "180 rpm" },
  { name: "Payment Processor", status: "degraded", apdex: 0.76, responseTime: "350ms", throughput: "95 rpm" },
  { name: "Authentication", status: "healthy", apdex: 0.95, responseTime: "85ms", throughput: "210 rpm" },
  { name: "Notification Service", status: "critical", apdex: 0.65, responseTime: "890ms", throughput: "45 rpm" },
  { name: "Data Processing", status: "healthy", apdex: 0.97, responseTime: "78ms", throughput: "120 rpm" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-green-500";
      case "degraded": return "bg-yellow-500";
      case "critical": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "degraded": return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "critical": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getApdexClass = (score: number) => {
    if (score >= 0.94) return "text-green-600";
    if (score >= 0.85) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your application performance.</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button size="sm" variant="outline">
            Last 24 hours <Clock className="ml-2 h-4 w-4" />
          </Button>
          <Button size="sm">
            Add to Dashboard
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.98%</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" /> +0.1%
              </span>
              {" "}vs last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Apdex Score</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">A</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.92</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-yellow-600">
                <TrendingDown className="mr-1 h-3 w-3" /> -0.03
              </span>
              {" "}vs last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">132ms</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" /> -15ms
              </span>
              {" "}vs last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-red-600">
                <TrendingUp className="mr-1 h-3 w-3" /> +1.1%
              </span>
              {" "}vs last week
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
          <TabsTrigger value="traces">Traces</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Response Time Chart */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Response Time</CardTitle>
                <CardDescription>Average response time over the past 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#1763FF"
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Error Rate Chart */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Error Rate</CardTitle>
                <CardDescription>Application errors over the past 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={errorRateData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="errors" fill="#FF4E00" barSize={20} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Services Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monitored Services</CardTitle>
              <CardDescription>Performance metrics for your application services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="px-4 py-3 font-medium text-muted-foreground">Service</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Apdex</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Response Time</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Throughput</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, i) => (
                      <tr 
                        key={i} 
                        className={`border-b hover:bg-muted/50 ${i % 2 === 0 ? 'bg-muted/20' : ''}`}
                      >
                        <td className="px-4 py-3 font-medium">{service.name}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <span className={`h-2 w-2 rounded-full ${getStatusColor(service.status)} mr-2`}></span>
                            <span className="capitalize">{service.status}</span>
                          </div>
                        </td>
                        <td className={`px-4 py-3 ${getApdexClass(service.apdex)}`}>
                          {service.apdex.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">{service.responseTime}</td>
                        <td className="px-4 py-3">{service.throughput}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto" asChild>
                <a href="#">
                  View all services <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Metrics</CardTitle>
              <CardDescription>Advanced performance metrics and analytics</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Detailed metrics content will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="errors">
          <Card>
            <CardHeader>
              <CardTitle>Error Analysis</CardTitle>
              <CardDescription>Detailed breakdown of application errors</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Error analysis content will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="traces">
          <Card>
            <CardHeader>
              <CardTitle>Distributed Traces</CardTitle>
              <CardDescription>End-to-end transaction traces</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Distributed traces content will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
