import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { getUserFromToken } from "./utils/auth";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(getUserFromToken())
  );

  return (
    <>
      {isAuthenticated ? (
        <Dashboard
          onLogout={() => setIsAuthenticated(false)}
        />
      ) : (
        <Login
          onLogin={() => setIsAuthenticated(true)}
        />
      )}
    </>
  );
}

export default App;