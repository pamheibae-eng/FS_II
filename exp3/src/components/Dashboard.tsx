import {
  getUserFromToken,
  hasPermission,
  removeToken,
} from "../utils/auth";

interface DashboardProps {
  onLogout: () => void;
}

interface Permission {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const permissions: Permission[] = [
  {
    id: "view_users",
    name: "View Users",
    icon: "👥",
    description: "View registered users",
  },
  {
    id: "manage_users",
    name: "Manage Users",
    icon: "⚙️",
    description: "Create, edit and manage users",
  },
  {
    id: "admin_resources",
    name: "Admin Resources",
    icon: "👑",
    description: "Access administrator resources",
  },
  {
    id: "system_info",
    name: "System Information",
    icon: "🖥️",
    description: "View system information",
  },
  {
    id: "edit_content",
    name: "Edit Content",
    icon: "✏️",
    description: "Create and edit application content",
  },
  {
    id: "view_profile",
    name: "View Profile",
    icon: "👤",
    description: "View your personal profile",
  },
];

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

  const handlePermission = (
    permission: Permission
  ) => {
    if (hasPermission(permission.id)) {
      alert(
        `✅ Authorized!\n\n${user.username} has permission to: ${permission.name}`
      );
    } else {
      alert(
        `❌ Access Denied!\n\n${user.username} does not have permission to: ${permission.name}`
      );
    }
  };

  return (
    <div className="dashboard-page">
      <nav className="navbar">
        <div className="brand">
          🔐 AuthSystem
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <main className="dashboard-container">
        <div className="welcome-card">
          <div>
            <p className="small-text">
              Welcome back
            </p>

            <h1>
              Hello, {user.username}! 👋
            </h1>

            <span
              className={`role-badge ${user.role}`}
            >
              {user.role === "admin" && "👑 ADMIN"}
              {user.role === "editor" && "✏️ EDITOR"}
              {user.role === "user" && "👤 USER"}
            </span>
          </div>

          <div className="shield">
            🛡️
          </div>
        </div>

        <div className="cards">
          <div className="info-card">
            <div className="card-icon">
              🔑
            </div>

            <h3>Authentication</h3>

            <p>
              Your identity has been verified
              using JWT authentication.
            </p>

            <span className="status success">
              ✓ Authenticated
            </span>
          </div>

          <div className="info-card">
            <div className="card-icon">
              🛡️
            </div>

            <h3>Authorization</h3>

            <p>
              Your role controls which resources
              and actions you can access.
            </p>

            <span className="status success">
              ✓ Authorization Active
            </span>
          </div>

          <div className="info-card">
            <div className="card-icon">
              🎫
            </div>

            <h3>JWT Token</h3>

            <p>
              Your JWT contains your username,
              role and permissions.
            </p>

            <span className="status success">
              ✓ Token Active
            </span>
          </div>
        </div>

        <div className="permissions-section">
          <div className="section-heading">
            <div>
              <h2>🛡️ Available Permissions</h2>

              <p>
                Click an action to test authorization.
              </p>
            </div>

            <span className="permission-count">
              {user.permissions.length} permissions
            </span>
          </div>

          <div className="permission-list">
            {permissions.map((permission) => {
              const allowed = hasPermission(
                permission.id
              );

              return (
                <button
                  key={permission.id}
                  className={`permission-button ${
                    allowed
                      ? "allowed"
                      : "denied"
                  }`}
                  onClick={() =>
                    handlePermission(permission)
                  }
                >
                  <span className="permission-icon">
                    {permission.icon}
                  </span>

                  <span className="permission-text">
                    <strong>
                      {permission.name}
                    </strong>

                    <small>
                      {permission.description}
                    </small>
                  </span>

                  <span
                    className={`permission-status ${
                      allowed
                        ? "allowed-status"
                        : "denied-status"
                    }`}
                  >
                    {allowed
                      ? "✓ Allowed"
                      : "✕ Denied"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="security-note">
          <strong>
            🔒 Role-Based Authorization
          </strong>

          <p>
            Your permissions are determined by
            your assigned role. Different users
            receive different levels of access.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;