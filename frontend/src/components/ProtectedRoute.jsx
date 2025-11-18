import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { me } from "../services/auth";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        await me(token);
        setIsValid(true);
      } catch {
        localStorage.removeItem("token");
        setIsValid(false);
      }
    };

    checkToken();
  }, []);

  if (isValid === null) return null;

  return isValid ? children : <Navigate to="/" replace />;
}
