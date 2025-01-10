import { BrowserRouter, Route, Routes } from "react-router";
import LoginComponent from "../features/auth/components/loginComponent";
import { RegisterComponent } from "../features/auth/components/RegisterComponent";
import { TasksLayout } from "../features/tasks/layouts/TasksLayout";
import ProtectedRoutes from "./ProtectedRoutes";

export const AppRouter: React.FC = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoutes>
                        <TasksLayout />
                    </ProtectedRoutes>
                }/>
                <Route path="/login" element={ <LoginComponent /> } />
                <Route path="/register" element={ <RegisterComponent /> } />
            </Routes>
        </BrowserRouter>
    );
}