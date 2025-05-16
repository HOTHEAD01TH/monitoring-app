
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ApmPage from "./pages/Dashboard/ApmPage";
import BrowserMonitoring from "./pages/Dashboard/BrowserMonitoring";
import SyntheticMonitoring from "./pages/Dashboard/SyntheticMonitoring";
import LogsPage from "./pages/Dashboard/LogsPage";
import DashboardsPage from "./pages/Dashboard/DashboardsPage";
import AlertsPage from "./pages/Dashboard/AlertsPage";
import SettingsPage from "./pages/Dashboard/SettingsPage";

import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/Dashboard/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="apm" element={<ApmPage />} />
            <Route path="browser" element={<BrowserMonitoring />} />
            <Route path="synthetic" element={<SyntheticMonitoring />} />
            <Route path="logs" element={<LogsPage />} />
            <Route path="dashboards" element={<DashboardsPage />} />
            <Route path="alerts" element={<AlertsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
