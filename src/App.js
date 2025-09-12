import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Auth Page (switches between login, register, forgot/reset)
import AuthPage from "./screens/AuthPage";

// Protected Pages
import HomePage from "./screens/HomePage";
import UpdateMonitorPage from "./screens/UpdateMonitorPage";
import LogsPage from "./screens/LogsPage";
import ProfilePage from "./screens/ProfilePage";

// Route Guard
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Auth routes */}
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route path="/forgot-password" element={<AuthPage mode="forgot" />} />
          <Route path="/reset-password/:token" element={<AuthPage mode="reset" />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/monitor"
            element={
              <PrivateRoute>
                <UpdateMonitorPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/monitor/edit/:id"
            element={
              <PrivateRoute>
                <UpdateMonitorPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/monitor/logs/:id"
            element={
              <PrivateRoute>
                <LogsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
