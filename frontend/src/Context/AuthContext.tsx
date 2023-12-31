import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import jwt_decode from "jwt-decode";

// Define the types for your user and AuthContext
interface User {
  sub: string;
  email: string;
  name: string;
  exp: number;
  id: number;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  expired: () => boolean;
  getToken: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        setUser(decodedUser);
      }
    }
  }, []);

  function decodeToken(token: string) {
    try {
      const decoded = jwt_decode<User>(token);
      return decoded;
    } catch (error) {
      return null;
    }
  }

  function login(token: string) {
    const decodedUser = decodeToken(token);
    if (decodedUser) {
      setUser(decodedUser);
      localStorage.setItem("accessToken", token);
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("accessToken");
  }

  function expired() {
    if (user && user.exp) {
      const currentTimestamp = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
      return user.exp < currentTimestamp;
    }
    return true; // If user is not defined or "exp" claim is missing, consider it as expired
  }

  function getToken() {
    const token = localStorage.getItem("accessToken");
    return token || "";
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    expired,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
