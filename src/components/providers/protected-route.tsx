import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSessionStore } from "@/stores/auth-store";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session } = useSessionStore();
  if (!session) {
    return <Navigate to="/" />;
  }
  return children;
};
