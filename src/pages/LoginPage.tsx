import { Navigate } from "react-router";
import { LoginForm } from "../components/auth/LoginForm";

type Props = {
  isLoggedIn: boolean;
  onLogin: (username: string, password: string) => boolean;
};

export function LoginPage({ isLoggedIn, onLogin }: Props) {
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <LoginForm onLogin={onLogin} />;
}