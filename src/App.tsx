
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";

import LandingPage from "./pages/LandingPage";
import Documentation from "./pages/Documentation";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import ApmPage from "./pages/Dashboard/ApmPage";
import BrowserMonitoring from "./pages/Dashboard/BrowserMonitoring";
import SyntheticMonitoring from "./pages/Dashboard/SyntheticMonitoring";
import WebsitesPage from "./pages/Dashboard/WebsitesPage";
import LogsPage from "./pages/Dashboard/LogsPage";
import DashboardsPage from "./pages/Dashboard/DashboardsPage";
import AlertsPage from "./pages/Dashboard/AlertsPage";
import SettingsPage from "./pages/Dashboard/SettingsPage";

import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/Dashboard/DashboardLayout";

// Create a new QueryClient instance outside of component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider defaultTheme="system">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/docs" element={<Documentation />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                
                {/* Dashboard Routes */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="apm" element={<ApmPage />} />
                  <Route path="browser" element={<BrowserMonitoring />} />
                  <Route path="synthetic" element={<SyntheticMonitoring />} />
                  <Route path="websites" element={<WebsitesPage />} />
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
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
