import api from "../../api";
import {
  setUser,
  setRoles,
  clearUser,
  setAddresses,
  addAddress,
  updateAddressAction,
  deleteAddressAction,
  setLoading // yeni ekledik
} from "../reducers/clientReducer";

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

    if (callback) callback(null, userData);
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
    dispatch(setLoading(true)); 
    api.defaults.headers.common["Authorization"] = token;

    const response = await api.get("/verify");
    const userData = response.data;

    dispatch(setUser(userData));
    dispatch(setLoading(false)); 

    if (userData.token) {
      localStorage.setItem("token", userData.token);
      api.defaults.headers.common["Authorization"] = userData.token;
    }
  } catch (err) {
    console.error("Token verification failed:", err);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    dispatch(clearUser());
    dispatch(setLoading(false));
  }
};

export const fetchAddresses = () => async (dispatch) => {
  try {
    const response = await api.get("/user/address");
    dispatch(setAddresses(response.data));
  } catch (error) {
    console.error("Adresler alınamadı:", error);
  }
};

export const createAddress = (addressData, callback) => async (dispatch) => {
  try {
    const response = await api.post("/user/address", addressData);
    console.log("New address response:", response.data);

    const newAddress = response.data[0] ?? response.data;

    dispatch(addAddress(newAddress));
    if (callback) callback(null, newAddress);
  } catch (error) {
    console.error("Adres eklenemedi:", error);
    if (callback) callback(error);
  }
};

export const editAddress = (addressData, callback) => async (dispatch) => {
  try {
    const response = await api.put("/user/address", addressData);
    dispatch(updateAddressAction(response.data));
    if (callback) callback(null, response.data);
  } catch (error) {
    console.error("Adres güncellenemedi:", error);
    if (callback) callback(error);
  }
};

export const removeAddress = (addressId, callback) => async (dispatch) => {
  try {
    await api.delete(`/user/address/${addressId}`);
    dispatch(deleteAddressAction(addressId));
    if (callback) callback(null);
  } catch (error) {
    console.error("Adres silinemedi:", error);
    if (callback) callback(error);
  }
};
