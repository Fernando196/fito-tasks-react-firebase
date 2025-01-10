import { Navigate } from "react-router";
import LoginComponent from "../components/loginComponent";
import { useAuth } from "../context/useAuth";


export const AuthLayout = () =>{
    const { isLoading, isAuthenticated } = useAuth();
    return(
        <>
            { isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <>
                    { isAuthenticated ? (
                        <Navigate to="/" />
                    ) : (
                        <LoginComponent />
                    )}
                </>
            )}
        </>
    )
}