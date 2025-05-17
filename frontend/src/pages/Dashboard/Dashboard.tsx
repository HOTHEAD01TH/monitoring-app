import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, AlertCircle, Clock, TrendingUp, TrendingDown, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [sites, setSites] = useState<any[]>([]);
  const [checkHistory, setCheckHistory] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
    // Refresh data every minute
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      // Load all sites
      const sitesData = await api.getSites();
      setSites(sitesData);

      // Load check history for all sites
      const allCheckHistory: any[] = [];
      for (const site of sitesData) {
        const checks = await api.getChecks(site.id);
        if (checks.length > 0) {
          const history = await api.getCheckHistory(checks[0].id, 100);
          allCheckHistory.push(...history);
        }
      }

      // Sort check history by timestamp
      const sortedHistory = allCheckHistory.sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      setCheckHistory(sortedHistory);

      // Calculate overall metrics
      const totalChecks = sortedHistory.length;
      const successfulChecks = sortedHistory.filter(check => check.status === "200").length;
      const uptime = totalChecks > 0 ? (successfulChecks / totalChecks) * 100 : 0;
      const avgResponse = totalChecks > 0 
        ? sortedHistory.reduce((acc, check) => acc + (check.latency || 0), 0) / totalChecks 
        : 0;
      const errorRate = totalChecks > 0 
        ? ((totalChecks - successfulChecks) / totalChecks) * 100 
        : 0;

      setMetrics({
        uptime,
        avgResponse,
        errorRate,
        totalChecks,
        successfulChecks
      });

    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE": return "bg-green-500";
      case "MAINTENANCE": return "bg-yellow-500";
      case "INACTIVE": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "MAINTENANCE": return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "INACTIVE": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  // Format data for response time graph
  const performanceData = checkHistory
    .map(check => ({
      name: new Date(check.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: check.latency || 0,
    }));

  // Format data for error rate graph
  const errorRateData = checkHistory
    .map(check => ({
      name: new Date(check.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      errors: check.status !== "200" ? 1 : 0,
      requests: 1,
    }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
            <div className="text-2xl font-bold">{metrics?.uptime?.toFixed(2) || 0}%</div>
            <p className="text-xs text-muted-foreground">
              Based on {metrics?.totalChecks || 0} checks
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.avgResponse?.toFixed(0) || 0}ms</div>
            <p className="text-xs text-muted-foreground">
              Average response time
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.errorRate?.toFixed(2) || 0}%</div>
            <p className="text-xs text-muted-foreground">
              {metrics?.totalChecks - metrics?.successfulChecks || 0} errors in {metrics?.totalChecks || 0} checks
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sites</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sites.filter(site => site.status === 'ACTIVE').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of {sites.length} total sites
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
                <CardDescription>Average response time over time</CardDescription>
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
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      label={{ value: 'ms', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}ms`, 'Response Time']}
                      labelFormatter={(label) => `Time: ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#1763FF"
                      strokeWidth={2}
                      dot={{ r: 2 }}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Error Rate Chart */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Error Rate</CardTitle>
                <CardDescription>Application errors over time</CardDescription>
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
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      label={{ value: 'Errors', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}`, 'Errors']}
                      labelFormatter={(label) => `Time: ${label}`}
                    />
                    <Bar dataKey="errors" fill="#FF4E00" barSize={20} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Sites Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monitored Sites</CardTitle>
              <CardDescription>Status and performance of your monitored sites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="px-4 py-3 font-medium text-muted-foreground">Site</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Last Check</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Response Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sites.map((site, i) => (
                      <tr 
                        key={i} 
                        className={`border-b hover:bg-muted/50 ${i % 2 === 0 ? 'bg-muted/20' : ''}`}
                      >
                        <td className="px-4 py-3 font-medium">{site.name}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <span className={`h-2 w-2 rounded-full ${getStatusColor(site.status)} mr-2`}></span>
                            <span className="capitalize">{site.status}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {new Date(site.updatedAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          {site.responseTime || 'N/A'}ms
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto" asChild>
                <a href="/websites">
                  View all sites <ArrowRight className="ml-2 h-4 w-4" />
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
