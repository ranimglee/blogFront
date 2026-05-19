import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    }
    return null;
  };

  const afaq_visitor_id = getCookie("afaq_visitor_id");

  let sessionId = sessionStorage.getItem("sessionId");

  if (config.headers) {
    if (afaq_visitor_id) {
      config.headers.set("X-Visitor-Id", afaq_visitor_id);
    }
if (sessionId) {
  config.headers.set("X-Session-Id", sessionId);
}  }

  return config;
});

export default api;