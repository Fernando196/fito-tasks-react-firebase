import { createBrowserRouter, RouterProvider } from "react-router";
import LoginComponent from "./features/auth/components/loginComponent";
import { RegisterComponent } from "./features/auth/components/RegisterComponent";


const router = createBrowserRouter([
    {
        path:'/',
        element: <h1>Home</h1>
    },
    {
        path:"/login",
        element: <LoginComponent />
    },
    {
        path:'/register',
        element: <RegisterComponent />
    }
])

export const AppRouter: React.FC = () =>{
    return <RouterProvider router={router} />;
}