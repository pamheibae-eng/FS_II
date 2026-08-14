export type Role = "admin" | "editor" | "viewer";

export interface User {
  username: string;
  role: Role;
  permissions: string[];
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
      permissions: payload.permissions,
    };
  } catch {
    return null;
  }
};

export const hasPermission = (permission: string): boolean => {
  const user = getUserFromToken();

  if (!user) {
    return false;
  }

  return user.permissions.includes(permission);
};