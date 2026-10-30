import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { getUser } from "@/lib/utils";

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const user = await getUser();
      setIsAuthenticated(!!user);
    }

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" replace />;
}