// src/screens/AuthPage.js
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../passwords/ForgotPassword";
import ResetPasswordPage from "../passwords/ResetPassword";
import "./AuthPage.css";

const AuthPage = ({ mode }) => {
  const renderForm = () => {
    switch (mode) {
      case "login":
        return <LoginPage />;
      case "register":
        return <RegisterPage />;
      case "forgot":
        return <ForgotPasswordPage />;
      case "reset":
        return <ResetPasswordPage />;
      default:
        return <LoginPage />;
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">{renderForm()}</div>
    </div>
  );
};

export default AuthPage;
