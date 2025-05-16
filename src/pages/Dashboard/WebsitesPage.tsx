
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Plus, ExternalLink } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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

const WebsitesPage = () => {
  const [websites, setWebsites] = useState(initialWebsites);
  const [newUrl, setNewUrl] = useState("");
  const [newSiteName, setNewSiteName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState<typeof websites[0] | null>(null);

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
      default:
        return "bg-gray-400";
    }
  };

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99.9) return "text-emerald-500";
    if (uptime >= 99) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
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
        <Card>
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
      
      {selectedWebsite ? (
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
          
          <Card>
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
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Uptime</h3>
                  <p className={`text-3xl font-bold ${getUptimeColor(selectedWebsite.uptime)}`}>
                    {selectedWebsite.uptime}%
                  </p>
                  <Progress value={selectedWebsite.uptime} className="h-2 mt-2" />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Response Time</h3>
                  <p className="text-3xl font-bold">
                    {selectedWebsite.responseTime} <span className="text-sm font-normal">ms</span>
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Last Checked</h3>
                  <p className="text-lg font-medium">
                    {new Date(selectedWebsite.lastChecked).toLocaleTimeString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedWebsite.lastChecked).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Uptime History</CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Uptime history chart will appear here</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Response Time History</CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Response time chart will appear here</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((website) => (
            <Card 
              key={website.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
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
                    <p className="text-sm text-gray-500">Uptime</p>
                    <p className={`font-medium ${getUptimeColor(website.uptime)}`}>
                      {website.uptime}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Response</p>
                    <p className="font-medium">{website.responseTime} ms</p>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WebsitesPage;
