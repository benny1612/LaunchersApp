import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../api";

export default function AdminGuard({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);

  const check = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAdmin(false);
      return;
    }

    const response = await getUser(token);

    if (response) {
      if (response.user.user_type === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    check();
  }, []);

  if (isAdmin === null) {
    return null;
  }

  if (isAdmin === true) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
