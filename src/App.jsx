import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Activities from "./pages/Activities";
import CreateActivity from "./pages/CreateActivity";
import { useAuth } from "./AuthContext";

function PrivateRoute({ children }) {
  const { user, initializing } = useAuth();

  // Loading skeleton
  if (initializing) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Just a moment...</p>
      </div>
    );
  }

  //  Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Email not verified → block access
  if (!user.emailVerified) {
    return (
      <div className="container mt-5">
        <h4>Email verification required</h4>
        <p>Please check your inbox and verify your email to continue.</p>
      </div>
    );
  }

  //  Allowed
  return children;
}

function App() {
  const location = useLocation();
  console.log("Current route:", location.pathname);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/activities"
            element={
              <PrivateRoute>
                <Activities />
              </PrivateRoute>
            }
          />

          <Route
            path="/create-activity"
            element={
              <PrivateRoute>
                <CreateActivity />
              </PrivateRoute>
            }
          />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
