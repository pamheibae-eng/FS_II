export interface User {
  username: string;
  role: "user" | "admin";
}

export interface AuthData {
  username: string;
  role: "user" | "admin";
}

export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

// Decode the demo JWT payload
export const getUserFromToken = (): User | null => {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(parts[1]));

    return {
      username: payload.username,
      role: payload.role,
    };
  } catch {
    return null;
  }
};