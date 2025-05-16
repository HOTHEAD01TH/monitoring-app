
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BrowserMonitoring = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Browser Monitoring</h1>
        <p className="text-muted-foreground">Monitor real user experience and frontend performance.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Browser Performance</CardTitle>
          <CardDescription>Monitor page load times, JavaScript errors, and user interactions</CardDescription>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center">
          <p className="text-muted-foreground">Browser monitoring content will appear here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrowserMonitoring;
