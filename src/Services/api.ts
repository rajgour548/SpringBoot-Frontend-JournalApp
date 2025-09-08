const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

/**
 * Generic API function to mimic Axios instance
 */
async function api(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const token = localStorage.getItem("jwt");

  // Use Record<string, string> for safe TypeScript headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Logout if token expired (401)
    if (response.status === 401) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("jwt");
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Helper methods to mimic Axios instance
 */
api.get = (endpoint: string, options: RequestInit = {}) =>
  api(endpoint, { ...options, method: "GET" });

api.post = (endpoint: string, body?: any, options: RequestInit = {}) =>
  api(endpoint, { ...options, method: "POST", body: JSON.stringify(body) });

api.put = (endpoint: string, body?: any, options: RequestInit = {}) =>
  api(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) });

api.delete = (endpoint: string, options: RequestInit = {}) =>
  api(endpoint, { ...options, method: "DELETE" });

export default api;
