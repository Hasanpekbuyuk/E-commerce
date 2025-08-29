const CART_STORAGE_KEY = "cartItems";
const ADDRESS_STORAGE_KEY = "selectedAddress";

const getInitialCart = () => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (err) {
    console.error("Failed to parse cart from localStorage:", err);
    return [];
  }
};

const initialState = {
  cart: getInitialCart(),
  payment: {},
  address: JSON.parse(localStorage.getItem(ADDRESS_STORAGE_KEY)) || {},
};

const SET_CART = "SET_CART";
const SET_PAYMENT = "SET_PAYMENT";
const SET_ADDRESS = "SET_ADDRESS";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const DECREASE_FROM_CART = "DECREASE_FROM_CART";
const TOGGLE_CHECK = "TOGGLE_CHECK";

const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    console.error("Failed to save cart to localStorage:", err);
  }
};

const saveAddressToLocalStorage = (address) => {
  try {
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(address));
  } catch (err) {
    console.error("Failed to save address to localStorage:", err);
  }
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      saveCartToLocalStorage(action.payload);
      return { ...state, cart: action.payload };

    case ADD_TO_CART: {
      const existingIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.id
      );

      let updatedCart;
      if (existingIndex >= 0) {
        updatedCart = [...state.cart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          count: updatedCart[existingIndex].count + 1,
        };
      } else {
        updatedCart = [
          ...state.cart,
          { count: 1, checked: true, product: action.payload },
        ];
      }
      saveCartToLocalStorage(updatedCart);
      return { ...state, cart: updatedCart };
    }

    case REMOVE_FROM_CART: {
      const updatedCart = state.cart.filter(
        (item) => item.product.id !== action.payload
      );
      saveCartToLocalStorage(updatedCart);
      return { ...state, cart: updatedCart };
    }

    case DECREASE_FROM_CART: {
      const updatedCart = state.cart
        .map((item) =>
          item.product.id === action.payload
            ? { ...item, count: item.count - 1 }
            : item
        )
        .filter((item) => item.count > 0);
      saveCartToLocalStorage(updatedCart);
      return { ...state, cart: updatedCart };
    }

    case TOGGLE_CHECK: {
      const updatedCart = state.cart.map((item) =>
        item.product.id === action.payload
          ? { ...item, checked: !item.checked }
          : item
      );
      saveCartToLocalStorage(updatedCart);
      return { ...state, cart: updatedCart };
    }

    case SET_PAYMENT:
      return { ...state, payment: action.payload };

    case SET_ADDRESS:
      saveAddressToLocalStorage(action.payload);
      return { ...state, address: action.payload };

    default:
      return state;
  }
}

export const setCart = (cart) => ({ type: SET_CART, payload: cart });
export const setPayment = (payment) => ({ type: SET_PAYMENT, payload: payment });
export const setAddress = (address) => ({ type: SET_ADDRESS, payload: address });
export const clearAddress = () => ({ type: SET_ADDRESS, payload: {} });

export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product });
export const removeFromCart = (productId) => ({ type: REMOVE_FROM_CART, payload: productId });
export const decreaseFromCart = (productId) => ({ type: DECREASE_FROM_CART, payload: productId });
export const toggleCheck = (productId) => ({ type: TOGGLE_CHECK, payload: productId });
