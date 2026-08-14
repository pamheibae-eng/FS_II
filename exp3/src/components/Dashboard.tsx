import { getUserFromToken, removeToken } from "../utils/auth";

interface DashboardProps {
  onLogout: () => void;
}

function Dashboard({ onLogout }: DashboardProps) {
  const user = getUserFromToken();

  if (!user) {
    return (
      <div className="page">
        <div className="dashboard-card">
          <h1>Access Denied ❌</h1>
          <p>Please login to continue.</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    removeToken();
    onLogout();
  };

  const isAdmin = user.role === "admin";

  return (
    <div className="dashboard-page">
      <nav className="navbar">
        <div className="brand">
          🔐 AuthSystem
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <main className="dashboard-container">
        <div className="welcome-card">
          <div>
            <p className="small-text">Welcome back</p>

            <h1>
              Hello, {user.username}! 👋
            </h1>

            <span
              className={
                isAdmin ? "role-badge admin" : "role-badge user"
              }
            >
              {isAdmin ? "👑 ADMIN" : "👤 USER"}
            </span>
          </div>

          <div className="shield">
            🛡️
          </div>
        </div>

        <div className="cards">
          <div className="info-card">
            <div className="card-icon">🔑</div>

            <h3>Authentication</h3>

            <p>
              Your identity has been verified successfully using JWT
              authentication.
            </p>

            <span className="status success">
              ✓ Authenticated
            </span>
          </div>

          <div className="info-card">
            <div className="card-icon">🛡️</div>

            <h3>Authorization</h3>

            <p>
              Your role determines which resources you are allowed
              to access.
            </p>

            <span className="status success">
              ✓ Authorized
            </span>
          </div>

          <div className="info-card">
            <div className="card-icon">🎫</div>

            <h3>JWT Token</h3>

            <p>
              A JWT token is stored in localStorage and used to
              identify the logged-in user.
            </p>

            <span className="status success">
              ✓ Token Active
            </span>
          </div>
        </div>

        {isAdmin ? (
          <div className="admin-panel">
            <h2>👑 Admin Panel</h2>

            <p>
              You have administrator privileges.
            </p>

            <div className="permission-list">
              <div>✓ View users</div>
              <div>✓ Manage users</div>
              <div>✓ Access admin resources</div>
              <div>✓ View system information</div>
            </div>
          </div>
        ) : (
          <div className="user-panel">
            <h2>👤 User Dashboard</h2>

            <p>
              You are logged in as a normal user.
            </p>

            <div className="permission-list">
              <div>✓ View your profile</div>
              <div>✓ Access user resources</div>
              <div>✓ Update your information</div>
              <div>✕ Admin resources</div>
            </div>
          </div>
        )}

        <div className="security-note">
          <strong>🔒 Security Demo</strong>

          <p>
            This experiment demonstrates JWT-based authentication
            and role-based authorization in a React application.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;