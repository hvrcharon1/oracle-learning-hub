import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import FusionApps from "@/pages/FusionApps";
import Oracle26ai from "@/pages/Oracle26ai";
import Resources from "@/pages/Resources";
import DiagramGallery from "@/pages/DiagramGallery";
import NewsFeed from "@/pages/NewsFeed";
import Healthcare from "@/pages/Healthcare";
import ChatWidget from "@/components/ChatWidget";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Dashboard} />
      <Route path={"/fusion-apps"} component={FusionApps} />
      <Route path={"/oracle-26ai"} component={Oracle26ai} />
      <Route path={"/diagrams"} component={DiagramGallery} />
      <Route path={"/news-feed"} component={NewsFeed} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/healthcare"} component={Healthcare} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <ChatWidget />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
