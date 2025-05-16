
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Search, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTheme } from "@/components/providers/theme-provider";

const Documentation = () => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-md"></div>
            <span className="text-lg font-semibold">Observify</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/signin">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row lg:gap-10">
          {/* Sidebar Navigation */}
          <aside className="lg:w-1/5">
            <nav className="sticky top-20 hidden lg:block">
              <div className="space-y-1">
                <h3 className="font-semibold mb-2">Getting Started</h3>
                <a href="#introduction" className="block text-sm py-1 text-muted-foreground hover:text-foreground">
                  Introduction
                </a>
                <a href="#installation" className="block text-sm py-1 text-muted-foreground hover:text-foreground">
                  Installation
                </a>
                <a href="#quick-start" className="block text-sm py-1 text-muted-foreground hover:text-foreground">
                  Quick Start
                </a>
                <h3 className="font-semibold mt-6 mb-2">Features</h3>
                <a href="#monitoring" className="block text-sm py-1 text-muted-foreground hover:text-foreground">
                  Website Monitoring
                </a>
                <a href="#apm" className="block text-sm py-1 text-muted-foreground hover:text-foreground">
                  Application Performance
                </a>
                <a href="#logs" className="block text-sm py-1 text-muted-foreground hover:text-foreground">
                  Logs Management
                </a>
                <a href="#alerts" className="block text-sm py-1 text-muted-foreground hover:text-foreground">
                  Alerts & AI
                </a>
              </div>
            </nav>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 lg:max-w-3xl xl:max-w-4xl">
            {/* Search */}
            <div className="relative mb-10">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                className="w-full pl-9"
              />
            </div>
            
            {/* Introduction */}
            <section id="introduction" className="mb-16">
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Observify Documentation</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Complete observability platform for modern applications and infrastructure.
              </p>
              
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="font-medium">For Developers</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Integrate Observify SDK into your applications for complete visibility.
                  </p>
                  <Button variant="link" className="mt-4 px-0" asChild>
                    <a href="#installation">
                      Get started <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="font-medium">For Operations</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Set up alerts, dashboards and monitor your infrastructure.
                  </p>
                  <Button variant="link" className="mt-4 px-0" asChild>
                    <a href="#alerts">
                      Learn more <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </section>
            
            {/* Installation */}
            <section id="installation" className="mb-16 scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
              <p className="mt-4 text-muted-foreground">
                Get started with Observify by installing our SDK into your application.
              </p>
              
              <Tabs defaultValue="npm" className="mt-6">
                <TabsList>
                  <TabsTrigger value="npm">npm</TabsTrigger>
                  <TabsTrigger value="yarn">yarn</TabsTrigger>
                  <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                </TabsList>
                <TabsContent value="npm" className="mt-4">
                  <div className="relative rounded-md bg-secondary p-4">
                    <code className="text-sm font-mono">npm install @observify/sdk</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 hover:bg-muted"
                      onClick={() => copyToClipboard("npm install @observify/sdk")}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="yarn" className="mt-4">
                  <div className="relative rounded-md bg-secondary p-4">
                    <code className="text-sm font-mono">yarn add @observify/sdk</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 hover:bg-muted"
                      onClick={() => copyToClipboard("yarn add @observify/sdk")}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="pnpm" className="mt-4">
                  <div className="relative rounded-md bg-secondary p-4">
                    <code className="text-sm font-mono">pnpm add @observify/sdk</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 hover:bg-muted"
                      onClick={() => copyToClipboard("pnpm add @observify/sdk")}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </section>
            
            {/* Quick Start */}
            <section id="quick-start" className="mb-16 scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight">Quick Start</h2>
              <p className="mt-4 text-muted-foreground">
                Integrate Observify into your application in just a few steps.
              </p>
              
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">1. Initialize the SDK</h3>
                  <div className="rounded-md bg-secondary p-4">
                    <pre className="text-sm font-mono overflow-x-auto">
{`import { Observify } from '@observify/sdk';

Observify.init({
  apiKey: 'YOUR_API_KEY',
  applicationName: 'my-awesome-app',
  environment: 'production'
});`}
                    </pre>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">2. Track Performance</h3>
                  <div className="rounded-md bg-secondary p-4">
                    <pre className="text-sm font-mono overflow-x-auto">
{`// Track endpoint performance
Observify.trackEndpoint('/api/users', {
  method: 'GET',
  responseTime: 120,
  statusCode: 200
});`}
                    </pre>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">3. Log Errors</h3>
                  <div className="rounded-md bg-secondary p-4">
                    <pre className="text-sm font-mono overflow-x-auto">
{`try {
  // Your code
} catch (error) {
  Observify.logError(error, {
    context: 'User authentication',
    userId: '123'
  });
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Website Monitoring */}
            <section id="monitoring" className="mb-16 scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight">Website Monitoring</h2>
              <p className="mt-4 text-muted-foreground">
                Track website performance, uptime, and user experience.
              </p>
              
              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Key Features</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Real-time uptime monitoring with 1-minute precision</li>
                  <li>Global performance checks from multiple locations</li>
                  <li>SSL certificate validation and expiration alerts</li>
                  <li>Page load speed and core web vitals tracking</li>
                  <li>Detailed waterfall charts for resource loading</li>
                </ul>
                
                <div className="rounded-md border p-4 mt-6">
                  <h4 className="font-medium">Learn More</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Check out our comprehensive guide on website monitoring best practices.
                  </p>
                  <Button variant="link" className="mt-2 px-0" asChild>
                    <a href="#" className="flex items-center">
                      View guide <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </section>
            
            {/* Add more sections for APM, Logs, and Alerts */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
