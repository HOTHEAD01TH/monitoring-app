
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AlertsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Alerts & AI</h1>
        <p className="text-muted-foreground">Intelligent alerting and anomaly detection.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Alert Management</CardTitle>
          <CardDescription>Create and manage alerts for your applications</CardDescription>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center">
          <p className="text-muted-foreground">Alert management content will appear here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertsPage;
