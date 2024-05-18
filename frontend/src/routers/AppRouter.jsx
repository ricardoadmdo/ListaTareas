import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginScreen } from "../components/login/LoginScreen.jsx";
import { DashboardRoutes } from "./DashboardRoutes.jsx";
import { PrivateRoute } from "./PrivateRoute.jsx";
import { PublicRoute } from "./PublicRoute.jsx";
import { RegisterScreen } from "../components/login/RegisterScreen.jsx";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <LoginScreen />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <RegisterScreen />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/*"
                    element={
                        <PrivateRoute>
                            <DashboardRoutes />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};
