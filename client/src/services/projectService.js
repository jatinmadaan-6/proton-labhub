const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, { headers: { "Content-Type": "application/json" }, ...options });
  if (!response.ok) { const body = await response.json().catch(() => ({})); throw new Error(body.error || "Unable to complete that request."); }
  return response.status === 204 ? null : response.json();
}
export const projectService = {
  list: () => request("/projects"),
  create: (project) => request("/projects", { method: "POST", body: JSON.stringify(project) }),
  update: (id, project) => request(`/projects/${id}`, { method: "PUT", body: JSON.stringify(project) }),
  remove: (id) => request(`/projects/${id}`, { method: "DELETE" }),
};
