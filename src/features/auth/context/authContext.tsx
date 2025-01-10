import { User } from "firebase/auth";
import { createContext } from "react";

interface AuthContextType{
    user: User | null;
    logout: () => Promise<void>;
    loading: boolean;
    isAuthenticated: boolean;
    login: (user: User) => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);