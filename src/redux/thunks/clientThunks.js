import api from "../../api";
import {
  setUser,
  setRoles,
  clearUser,
  setAddresses,
  addAddress,
  updateAddressAction,
  deleteAddressAction,
  setLoading,
  setCards,
  addCard,
  updateCardAction,
  deleteCardAction
} from "../reducers/clientReducer";
import { setCart } from "../reducers/cartReducer";

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

    if (userData.token) {
      if (rememberMe) {
        localStorage.setItem("token", userData.token);
      } 
      document.cookie = `token=${userData.token}; path=/`;
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
    console.error("Addresses could not be retrieved:", error);
  }
};

export const createAddress = (addressData, callback) => async (dispatch) => {
  try {
    const response = await api.post("/user/address", addressData);
    const newAddress = response.data[0] ?? response.data;

    dispatch(addAddress(newAddress));
    if (callback) callback(null, newAddress);
  } catch (error) {
    console.error("Address could not be added:", error);
    if (callback) callback(error);
  }
};

export const editAddress = (addressData, callback) => async (dispatch) => {
  try {
    const response = await api.put("/user/address", addressData);
    dispatch(updateAddressAction(response.data));
    if (callback) callback(null, response.data);
  } catch (error) {
    console.error("Address could not be updated:", error);
    if (callback) callback(error);
  }
};

export const removeAddress = (addressId, callback) => async (dispatch) => {
  try {
    await api.delete(`/user/address/${addressId}`);
    dispatch(deleteAddressAction(addressId));
    if (callback) callback(null);
  } catch (error) {
    console.error("Address could not be deleted:", error);
    if (callback) callback(error);
  }
};

export const fetchCards = () => async (dispatch) => {
  try {
    const response = await api.get("/user/card");
    dispatch(setCards(response.data));
  } catch (error) {
    console.error("Cards could not be retrieved:", error);
  }
};

export const createCard = (cardData, callback) => async (dispatch) => {
  try {
    const response = await api.post("/user/card", cardData);
    const newCard = response.data[0] ?? response.data;
    dispatch(addCard(newCard));
    if (callback) callback(null, newCard);
  } catch (error) {
    console.error("Card could not be added:", error);
    if (callback) callback(error);
  }
};

export const editCard = (cardData, callback) => async (dispatch) => {
  try {
    const response = await api.put("/user/card", cardData);
    dispatch(updateCardAction(response.data));
    if (callback) callback(null, response.data);
  } catch (error) {
    console.error("Card could not be updated:", error);
    if (callback) callback(error);
  }
};

export const removeCard = (cardId, callback) => async (dispatch) => {
  try {
    await api.delete(`/user/card/${cardId}`);
    dispatch(deleteCardAction(cardId));
    if (callback) callback(null);
  } catch (error) {
    console.error("Card could not be deleted:", error);
    if (callback) callback(error);
  }
};

export const createOrder = (orderData, callback) => async (dispatch) => {
  try {
    const response = await api.post("/order", orderData);

    dispatch(setCart([]));

    alert("Congratulations! Your order has been successfully placed.");

    if (callback) callback(null, response.data);
  } catch (error) {
    console.error("Order could not be created:", error);
    if (callback) callback(error);
  }
};