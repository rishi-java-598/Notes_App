const BASE_URL = "https://notes-app-6-bc3x.onrender.com/api";

export const request = async (path, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  return res.json();
};
