import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { LoginPage } from "../pages/LoginPage";
import { QuotationPage } from "../pages/QuotationPage";

export function AppRoutes() {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage isLoggedIn={isLoggedIn} onLogin={login} />}
        />

        <Route
          path="/"
          element={
            isLoggedIn ? (
              <QuotationPage onLogout={logout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}