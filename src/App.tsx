import { Toaster } from "./components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "./lib/query-client";
import NavigationTracker from "./lib/NavigationTracker";
import { pagesConfig } from "./pages.config";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
//import { AuthProvider, useAuth } from "@/lib/AuthContext";
//import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import React, { ReactNode, useEffect } from "react";

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? (Object.keys(Pages)[0] as string);
const MainPage = mainPageKey ? (Pages as any)[mainPageKey] : () => <></>;

// טיפוס ל-LayoutWrapper props
interface LayoutWrapperProps {
  children: ReactNode;
  currentPageName: string;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children, currentPageName }) =>
  Layout ? <Layout currentPageName={currentPageName}>{children}</Layout> : <>{children}</>;

// קומפוננטת AuthenticatedApp
const AuthenticatedApp: React.FC = () => {
  //const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth

  // Render the main app
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LayoutWrapper currentPageName={mainPageKey}>
            <MainPage />
          </LayoutWrapper>
        }
      />
      {(Object.entries(Pages) as [string, React.ComponentType][]).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

// Component to handle scroll reset
const ScrollReset: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Reset scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

const App: React.FC = () => {
  return (
    
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <ScrollReset />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
   
  );
};

export default App;
