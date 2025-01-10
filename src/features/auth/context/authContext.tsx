import { User } from "firebase/auth";
import { createContext } from "react";

interface AuthContextType{
    user: User | null;
    setUser: (user: User) => void;
    logout: () => Promise<void>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);