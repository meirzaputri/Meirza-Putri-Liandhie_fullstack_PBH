import { createContext, useContext, useEffect, useState } from "react";
import { me } from "../services/auth";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await me(token);
        setUser(res.data);
      } catch (e) {
        console.error("Failed load user:", e);
      }
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
