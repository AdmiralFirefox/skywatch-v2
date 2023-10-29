import { useState, useEffect } from "react";
import { AuthContext, UserInfo } from "../context/AuthContext";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!user) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }

      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
