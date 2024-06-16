import { useSessionStore } from "@/stores/auth-store";
import { IsFetchingEnum } from "@/stores/store-types";
import { ReactNode, useEffect } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { status, getSession } = useSessionStore();

  useEffect(() => {
    getSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === IsFetchingEnum.loading) return <div>Loading..</div>;
  return children;
};
