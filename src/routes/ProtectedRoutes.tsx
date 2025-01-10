import { ReactNode } from "react";
import { useAuth } from "../features/auth/context/useAuth";
import { Navigate } from "react-router";
import { useLocation } from "react-router";


const ProtectedRoutes = ( { children } : { children: ReactNode } )=>{
    const user = useAuth();
    const location = useLocation();

    if(!user.isAuthenticated){
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;
}

export default ProtectedRoutes;