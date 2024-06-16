import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSessionStore } from "@/stores/auth-store";

export const UnprotectedRoute = ({ children }: { children: ReactNode }) => {
  const { session } = useSessionStore();
  if (session) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};
