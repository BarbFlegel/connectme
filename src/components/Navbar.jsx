import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const { user, profile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const displayName = profile?.username || (user && user.email);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <NavLink to="/home" className="navbar-brand">
        ConnectMe
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {user && (
            <li className="nav-item me-3 d-flex align-items-center">
              <span className="navbar-text small">
                Hello, {displayName || "user"} 👋
              </span>
            </li>
          )}

          <li className="nav-item">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>

          {user && (
            <li className="nav-item">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Profile
              </NavLink>
            </li>
          )}

          {!user && (
            <>
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          )}

          {user && (
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn btn-link nav-link"
                type="button"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
