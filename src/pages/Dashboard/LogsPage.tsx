
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LogsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Logs</h1>
        <p className="text-muted-foreground">Centralize and analyze logs from all your services.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Log Explorer</CardTitle>
          <CardDescription>Search and analyze logs from all your applications</CardDescription>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center">
          <p className="text-muted-foreground">Log explorer content will appear here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogsPage;
