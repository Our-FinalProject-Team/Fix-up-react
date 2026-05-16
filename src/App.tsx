import { Toaster } from "./components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "./lib/query-client";
import NavigationTracker from "./lib/NavigationTracker";
import { pagesConfig } from "./pages.config";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import BookService from "./pages/BookService";

//import { AuthProvider, useAuth } from "@/lib/AuthContext";
//import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import React, { ReactNode, useEffect } from "react";
import { BookingProvider } from "./pages/Contexts/BookServiceContext";
import { AuthProvider } from "./pages/Contexts/AuthContext";
import  ProtectedRoute  from "@/lib/ProtectedRoute";
import { Provider } from 'react-redux';
import { store } from './pages/store';
import { useDispatch } from 'react-redux';
import { setUser } from './pages/store/slices/userSlice';
import api from "./pages/api";

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

  const dispatch = useDispatch();

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('userRole');

      if (!token || !role) return;

      try {
        const endpoint = role === 'Professional' ? '/Professionals/me' : '/Clients/me';
        const response = await api.get(endpoint);
        
        dispatch(setUser({
          ...response.data,
          role: role as 'Professional' | 'Client'
        }));
      } catch (error) {
        console.error("חלה שגיאה בטעינת נתוני המשתמש", error);
      }
    };

    initializeUser();
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LayoutWrapper currentPageName={mainPageKey}>
            <ProtectedRoute path={mainPageKey}>
              <MainPage />
            </ProtectedRoute>
          </LayoutWrapper>
        }
      />
      {(Object.entries(Pages) as [string, React.ComponentType][]).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <ProtectedRoute path={path}>
                <Page />
              </ProtectedRoute>
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClientInstance}>
        <AuthProvider>
         <BookingProvider>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </BookingProvider>
        </AuthProvider>
      </QueryClientProvider>
   </Provider>

  );
};

export default App;
