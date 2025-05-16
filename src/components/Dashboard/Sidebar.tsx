
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import {
  Activity,
  Monitor,
  Globe,
  FileText,
  BarChart2,
  Bell,
  Settings,
  Home
} from "lucide-react";

const NAV_ITEMS = [
  { 
    path: "/dashboard", 
    label: "Overview", 
    icon: Home, 
    exact: true
  },
  { 
    path: "/dashboard/apm", 
    label: "APM", 
    icon: Activity
  },
  { 
    path: "/dashboard/browser", 
    label: "Browser", 
    icon: Monitor
  },
  { 
    path: "/dashboard/synthetic", 
    label: "Synthetic", 
    icon: Globe
  },
  { 
    path: "/dashboard/logs", 
    label: "Logs", 
    icon: FileText
  },
  { 
    path: "/dashboard/dashboards", 
    label: "Dashboards", 
    icon: BarChart2
  },
  { 
    path: "/dashboard/alerts", 
    label: "Alerts & AI", 
    icon: Bell
  },
  { 
    path: "/dashboard/settings", 
    label: "Settings", 
    icon: Settings
  }
];

const Sidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium flex items-center space-x-3 p-2 rounded-md w-full" 
      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground flex items-center space-x-3 p-2 rounded-md w-full";

  return (
    <SidebarComponent
      className={`transition-all duration-300 ${collapsed ? "w-14" : "w-60"} bg-sidebar`}
      collapsible
    >
      {/* Logo */}
      <div className={`p-4 flex ${collapsed ? "justify-center" : "justify-start"} items-center border-b border-sidebar-border`}>
        <div className="h-8 w-8 bg-nr-blue rounded-md"></div>
        {!collapsed && <span className="ml-2 text-lg font-semibold text-white">Observify</span>}
      </div>
      
      {/* Mini-mode trigger inside sidebar */}
      <SidebarTrigger className="m-2 self-end text-sidebar-foreground" />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      end={item.exact}
                      className={getNavCls}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
