import { BrowserRouter, Route, Routes } from "react-router";
import { RegisterComponent } from "../features/auth/components/RegisterComponent";
import { TasksLayout } from "../features/tasks/layouts/TasksLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import { AuthLayout } from "../features/auth/layouts/AuthLayout";

export const AppRouter: React.FC = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoutes>
                        <TasksLayout />
                    </ProtectedRoutes>
                }/>
                <Route path="/login" element={ <AuthLayout /> } />
                <Route path="/register" element={ <RegisterComponent /> } />
            </Routes>
        </BrowserRouter>
    );
}