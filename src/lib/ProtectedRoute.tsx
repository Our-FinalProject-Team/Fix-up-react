import { Navigate } from "react-router-dom";
import { useAuth } from "@/pages/Contexts/AuthContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  path: string;
}

export default function ProtectedRoute({ children, path }: ProtectedRouteProps) {
  const { isLoggedIn, userRole } = useAuth();

  // הגדרת רשימת עמודים שדורשים הרשאה ספציפית
  const proOnlyPages = ['ProDashboard', 'Jobs'];
  const clientOnlyPages = ['MyOrders', 'RequestService'];
  const authRequiredPages = ['Profile', ...proOnlyPages, ...clientOnlyPages];

  // 1. אם העמוד דורש התחברות והמשתמש לא מחובר
  if (authRequiredPages.includes(path) && !isLoggedIn) {
    return <Navigate to="/LogIn" replace />;
  }

  // 2. חסימת לקוח מעמודי בעל מקצוע
  if (proOnlyPages.includes(path) && userRole !== "Professional") {
    return <Navigate to="/" replace />;
  }

  // 3. חסימת בעל מקצוע מעמודי לקוח
  if (clientOnlyPages.includes(path) && userRole !== "Client") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};