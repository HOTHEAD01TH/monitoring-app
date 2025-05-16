
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Custom Dashboards</h1>
        <p className="text-muted-foreground">Create custom visualizations for your metrics.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Builder</CardTitle>
          <CardDescription>Create and manage custom dashboards</CardDescription>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center">
          <p className="text-muted-foreground">Dashboard builder content will appear here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardsPage;
