
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Plus, ExternalLink, ArrowRight, TrendingUp, TrendingDown, Activity, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock website data
const initialWebsites = [
  {
    id: 1,
    url: "https://example.com",
    name: "Example Website",
    status: "Online",
    uptime: 99.98,
    responseTime: 235,
    lastChecked: new Date().toISOString()
  },
  {
    id: 2,
    url: "https://demo-site.com",
    name: "Demo Site",
    status: "Online",
    uptime: 99.85,
    responseTime: 342,
    lastChecked: new Date().toISOString()
  },
  {
    id: 3,
    url: "https://test-website.net",
    name: "Test Website",
    status: "Issues",
    uptime: 98.12,
    responseTime: 523,
    lastChecked: new Date().toISOString()
  }
];

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

// Mock services data for website details
const services = [
  { name: "API Gateway", status: "healthy", apdex: 0.98, responseTime: "45ms", throughput: "240 rpm" },
  { name: "User Service", status: "healthy", apdex: 0.92, responseTime: "120ms", throughput: "180 rpm" },
  { name: "Payment Processor", status: "degraded", apdex: 0.76, responseTime: "350ms", throughput: "95 rpm" },
  { name: "Authentication", status: "healthy", apdex: 0.95, responseTime: "85ms", throughput: "210 rpm" },
];

const WebsitesPage = () => {
  const [websites, setWebsites] = useState(initialWebsites);
  const [newUrl, setNewUrl] = useState("");
  const [newSiteName, setNewSiteName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState<typeof websites[0] | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const addWebsite = () => {
    if (!newUrl || !newSiteName) return;
    
    const newWebsite = {
      id: websites.length + 1,
      url: newUrl.startsWith('http') ? newUrl : `https://${newUrl}`,
      name: newSiteName,
      status: "Pending",
      uptime: 0,
      responseTime: 0,
      lastChecked: new Date().toISOString()
    };
    
    setWebsites([...websites, newWebsite]);
    setNewUrl("");
    setNewSiteName("");
    setShowAddForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online":
        return "bg-emerald-500";
      case "Issues":
        return "bg-yellow-500";
      case "Offline":
        return "bg-red-500";
      case "healthy": 
        return "bg-green-500";
      case "degraded": 
        return "bg-yellow-500";
      case "critical": 
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99.9) return "text-emerald-500";
    if (uptime >= 99) return "text-yellow-500";
    return "text-red-500";
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

  // Dashboard Overview
  if (selectedWebsite) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedWebsite(null)}
            className="flex items-center"
          >
            &larr; Back to websites
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => window.open(selectedWebsite.url, '_blank')}
          >
            Visit Website <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <Card className="bg-card">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{selectedWebsite.name}</CardTitle>
                <CardDescription className="text-sm">{selectedWebsite.url}</CardDescription>
              </div>
              <div className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(selectedWebsite.status)}`}>
                {selectedWebsite.status}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Uptime</h3>
                <p className={`text-3xl font-bold ${getUptimeColor(selectedWebsite.uptime)}`}>
                  {selectedWebsite.uptime}%
                </p>
                <Progress value={selectedWebsite.uptime} className="h-2 mt-2" />
              </div>
              <div className="bg-background p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Response Time</h3>
                <p className="text-3xl font-bold">
                  {selectedWebsite.responseTime} <span className="text-sm font-normal">ms</span>
                </p>
              </div>
              <div className="bg-background p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Last Checked</h3>
                <p className="text-lg font-medium">
                  {new Date(selectedWebsite.lastChecked).toLocaleTimeString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedWebsite.lastChecked).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
              <Card className="col-span-1 bg-card">
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
              <Card className="col-span-1 bg-card">
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
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Website Services</CardTitle>
                <CardDescription>Performance metrics for website services</CardDescription>
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
                          className={`border-b hover:bg-muted/50 ${i % 2 === 0 ? 'bg-background/50' : ''}`}
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
                <Button variant="ghost" size="sm" className="ml-auto">
                  View all services <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="metrics">
            <Card className="bg-card">
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
            <Card className="bg-card">
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
            <Card className="bg-card">
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
  }

  // Websites Listing View
  return (
    <div className="space-y-6 bg-background">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Website Monitoring</h1>
          <p className="text-muted-foreground">Track and monitor your websites' performance and availability.</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Add Website
        </Button>
      </div>
      
      {showAddForm && (
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Add New Website</CardTitle>
            <CardDescription>Enter the details of the website you want to monitor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="site-name" className="block text-sm font-medium mb-1">Website Name</label>
              <Input 
                id="site-name"
                value={newSiteName} 
                onChange={(e) => setNewSiteName(e.target.value)} 
                placeholder="My Website" 
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="site-url" className="block text-sm font-medium mb-1">Website URL</label>
              <Input 
                id="site-url"
                value={newUrl} 
                onChange={(e) => setNewUrl(e.target.value)} 
                placeholder="https://example.com" 
                className="w-full"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button onClick={addWebsite}>Add Website</Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Websites</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{websites.length}</div>
            <p className="text-xs text-muted-foreground">
              Actively monitoring
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.42%</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" /> +0.1%
              </span>
              {" "}vs last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">217ms</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-600">
                <TrendingDown className="mr-1 h-3 w-3" /> -12ms
              </span>
              {" "}vs last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Website with performance issues
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {websites.map((website) => (
          <Card 
            key={website.id} 
            className="hover:shadow-md transition-shadow cursor-pointer bg-card"
            onClick={() => setSelectedWebsite(website)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg truncate" title={website.name}>
                  {website.name}
                </CardTitle>
                <div className={`h-3 w-3 rounded-full ${getStatusColor(website.status)}`} />
              </div>
              <CardDescription className="truncate" title={website.url}>
                {website.url}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                  <p className={`font-medium ${getUptimeColor(website.uptime)}`}>
                    {website.uptime}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Response</p>
                  <p className="font-medium">{website.responseTime} ms</p>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WebsitesPage;
