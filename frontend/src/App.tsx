import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider, useAuth } from './lib/auth-context'

import LandingPage from "./pages/LandingPage";
import Documentation from "./pages/Documentation";
import Dashboard from "./pages/Dashboard/Dashboard";
import ApmPage from "./pages/Dashboard/ApmPage";
import BrowserMonitoring from "./pages/Dashboard/BrowserMonitoring";
import SyntheticMonitoring from "./pages/Dashboard/SyntheticMonitoring";
import WebsitesPage from "./pages/Dashboard/WebsitesPage";
import LogsPage from "./pages/Dashboard/LogsPage";
import DashboardsPage from "./pages/Dashboard/DashboardsPage";
import AlertsPage from "./pages/Dashboard/AlertsPage";
import SettingsPage from "./pages/Dashboard/SettingsPage";
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import SiteDetails from './pages/SiteDetails'
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

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider defaultTheme="system">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AuthProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/docs" element={<Documentation />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Dashboard Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }>
                    {/* Make websites the main dashboard page */}
                    <Route index element={<WebsitesPage />} />
                    <Route path="apm" element={<ApmPage />} />
                    <Route path="browser" element={<BrowserMonitoring />} />
                    <Route path="synthetic" element={<SyntheticMonitoring />} />
                    <Route path="overview" element={<Dashboard />} />
                    <Route path="logs" element={<LogsPage />} />
                    <Route path="dashboards" element={<DashboardsPage />} />
                    <Route path="alerts" element={<AlertsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>

                  {/* Site Details Route */}
                  <Route path="/sites/:id" element={
                    <ProtectedRoute>
                      <SiteDetails />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
