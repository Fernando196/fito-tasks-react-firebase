import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { User } from "firebase/auth";
import { authStateChange, logoutFirebase } from "../services/authService";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user,setUser] = useState<User | null>(null);
    const [isGuest,setIsGuest] = useState<boolean>(false);
    const [isLoading,setIsLoading] = useState<boolean>(true);
    const [isAuthenticated,setIsAuthenticated] = useState<boolean>(false);

    useEffect(() =>{
        setIsLoading(true);
        const unsuscribe = authStateChange((user)=>{
            if(user){
                setUser(user);
                setIsAuthenticated(true);
            }else{
                setUser(null);
                setIsAuthenticated(false)
            }

            setIsLoading(false);
        });

        return () => unsuscribe();
    },[])

    const login = (user: User) =>{
        setUser(user);
        setIsAuthenticated(true);
    }

    const logout = async () =>{
        await logoutFirebase();
    }

    const handleChangeGuest = async ( value: boolean )=>{
        setIsAuthenticated(value);
        setIsGuest(value);
    }

    return(
        <AuthContext.Provider 
            value={{ 
                user,
                isAuthenticated,
                login,
                logout,
                isLoading,
                isGuest,
                handleChangeGuest,
                loading: false 
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}