import { useState } from "react";
import { saveToken } from "../utils/auth";

interface LoginProps {
  onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    let role: "user" | "admin" | null = null;

    // Demo accounts
    if (username === "admin" && password === "1234") {
      role = "admin";
    } else if (username === "user" && password === "1234") {
      role = "user";
    }

    if (!role) {
      setError("Invalid username or password.");
      return;
    }

    // Demo JWT
    const header = btoa(
      JSON.stringify({
        alg: "HS256",
        typ: "JWT",
      })
    );

    const payload = btoa(
      JSON.stringify({
        username,
        role,
      })
    );

    const signature = "demo-signature";

    const demoJWT = `${header}.${payload}.${signature}`;

    saveToken(demoJWT);

    onLogin();
  };

  return (
    <div className="page">
      <div className="login-card">
        <div className="login-icon">🔐</div>

        <h1>Secure Login</h1>

        <p className="subtitle">
          JWT Authentication & Authorization
        </p>

        <div className="form-group">
          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <div className="demo-info">
          <strong>Demo Accounts</strong>

          <p>
            👑 Admin: <b>admin</b> / <b>1234</b>
          </p>

          <p>
            👤 User: <b>user</b> / <b>1234</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;