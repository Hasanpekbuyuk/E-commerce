export const SET_CART = "SET_CART";
export const SET_PAYMENT = "SET_PAYMENT";
export const SET_ADDRESS = "SET_ADDRESS";
export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_FROM_CART = "DECREASE_FROM_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const TOGGLE_CHECK = "TOGGLE_CHECK";

export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});
export const decreaseFromCart = (productId) => ({
  type: DECREASE_FROM_CART,
  payload: productId,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const toggleCheck = (productId) => ({
  type: TOGGLE_CHECK,
  payload: productId,
});
