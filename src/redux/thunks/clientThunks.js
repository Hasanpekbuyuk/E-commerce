// src/redux/thunks/clientThunks.js
import api from "../../api";
import { setUser, setRoles, clearUser } from "../reducers/clientReducer";

// Roles fetch thunk
export const fetchRoles = () => async (dispatch, getState) => {
  const { roles } = getState().client;
  if (roles && roles.length > 0) return;

  try {
    const response = await api.get("/roles");
    dispatch(setRoles(response.data));
  } catch (err) {
    console.error("Failed to fetch roles", err);
  }
};

export const loginUser = (email, password, rememberMe = false, callback) => async (dispatch) => {
  try {
    const response = await api.post("/login", { email, password });
    const userData = response.data;

    dispatch(setUser(userData));

    if (rememberMe && userData.token) {
      localStorage.setItem("token", userData.token);
      api.defaults.headers.common["Authorization"] = userData.token;
    }

    if (callback) callback(null, userData); // başarılı
  } catch (error) {
    console.error("Login failed:", error);

    let message = "Login failed!";
    if (error.response && error.response.data) {
      if (typeof error.response.data === "string") message = error.response.data;
      else if (error.response.data.message) message = error.response.data.message;
      else message = JSON.stringify(error.response.data);
    }

    if (callback) callback(message);
  }
};

export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return; 

  try {
    api.defaults.headers.common["Authorization"] = token;

    const response = await api.get("/verify");
    const userData = response.data;

    dispatch(setUser(userData));

    if (userData.token) {
      localStorage.setItem("token", userData.token);
      api.defaults.headers.common["Authorization"] = userData.token;
    }
  } catch (err) {
    console.error("Token verification failed:", err);

    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    dispatch(clearUser());
  }
};
