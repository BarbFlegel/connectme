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
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
      <NavLink to="/home" className="navbar-brand fw-bold">
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
        <ul className="navbar-nav ms-auto align-items-lg-center">
          {/* Greeting */}
          {user && (
            <li className="nav-item me-3 d-flex align-items-center">
              <span className="navbar-text small">
                Hello, {displayName || "user"} 👋
              </span>
            </li>
          )}

          {/* ALWAYS visible if logged in */}
          {user && (
            <>
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

              <li className="nav-item">
                <NavLink
                  to="/activities"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Activities
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/my-activities"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  My Activities
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/create-activity"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  + Create Activity
                </NavLink>
              </li>

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

              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-link nav-link text-danger"
                  type="button"
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {/* PUBLIC MENU (not logged-in) */}
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
        </ul>
      </div>
    </nav>
  );
}
