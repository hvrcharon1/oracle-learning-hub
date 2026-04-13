import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import {
  LayoutDashboard,
  BookOpen,
  Database,
  Image,
  Newspaper,
  FileText,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import GlobalSearch from "./GlobalSearch";

interface OracleDashboardLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export default function OracleDashboardLayout({
  children,
  currentPage = "dashboard",
}: OracleDashboardLayoutProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
    },
    {
      id: "fusion",
      label: "Fusion Apps",
      icon: BookOpen,
      href: "/fusion-apps",
    },
    {
      id: "26ai",
      label: "Oracle 26ai DB",
      icon: Database,
      href: "/oracle-26ai",
    },
    {
      id: "diagrams",
      label: "Diagrams",
      icon: Image,
      href: "/diagrams",
    },
    {
      id: "news",
      label: "News Feed",
      icon: Newspaper,
      href: "/news-feed",
    },
    {
      id: "resources",
      label: "Resources",
      icon: FileText,
      href: "/resources",
    },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 flex flex-col border-r border-slate-700 shadow-lg`}
      >
        {/* Logo/Brand */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center w-full"}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
                O
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-lg font-bold">Oracle Hub</h1>
                  <p className="text-xs text-slate-400">Learning Center</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-3 py-4 border-b border-slate-700">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg flex items-center gap-2 text-sm transition-colors"
          >
            <Search size={16} />
            {sidebarOpen && <span>Search...</span>}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <Link key={item.id} href={item.href}>
                <a
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </a>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-slate-700 p-4 space-y-3">
          {user ? (
            <>
              <div className={`px-4 py-2 bg-slate-700 rounded-lg ${!sidebarOpen && "hidden"}`}>
                <p className="text-sm font-medium text-white truncate">{user.name || user.email}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700"
              >
                <LogOut size={18} />
                {sidebarOpen && <span className="ml-2">Logout</span>}
              </Button>
            </>
          ) : (
            <Button
              asChild
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <a href={getLoginUrl()}>
                {sidebarOpen ? "Sign In" : "Login"}
              </a>
            </Button>
          )}
        </div>

        {/* Toggle Button */}
        <div className="border-t border-slate-700 p-3">
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            variant="ghost"
            size="sm"
            className="w-full text-slate-300 hover:text-white hover:bg-slate-700"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </aside>

      {/* Search Modal */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          {children}
        </div>
      </main>
    </div>
  );
}
