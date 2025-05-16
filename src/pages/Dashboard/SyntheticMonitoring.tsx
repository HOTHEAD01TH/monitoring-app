
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SyntheticMonitoring = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Synthetic Monitoring</h1>
        <p className="text-muted-foreground">Proactive monitoring with scripted browsers.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Synthetic Tests</CardTitle>
          <CardDescription>Monitor critical user flows with automated tests</CardDescription>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center">
          <p className="text-muted-foreground">Synthetic monitoring content will appear here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SyntheticMonitoring;
