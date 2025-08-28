const initialState = {
  user: null,
  addressList: [],
  creditCards: [], 
  roles: [],
  theme: "light",
  language: "en",
  loading: true,
};

const SET_USER = "SET_USER";
const SET_ROLES = "SET_ROLES";
const SET_THEME = "SET_THEME";
const SET_LANGUAGE = "SET_LANGUAGE";
const CLEAR_USER = "CLEAR_USER";

const SET_ADDRESSES = "SET_ADDRESSES";
const ADD_ADDRESS = "ADD_ADDRESS";
const UPDATE_ADDRESS = "UPDATE_ADDRESS";
const DELETE_ADDRESS = "DELETE_ADDRESS";

const SET_LOADING = "SET_LOADING";

const SET_CARDS = "SET_CARDS";
const ADD_CARD = "ADD_CARD";
const UPDATE_CARD = "UPDATE_CARD";
const DELETE_CARD = "DELETE_CARD";

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_ROLES:
      return { ...state, roles: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case CLEAR_USER:
      return { ...state, user: null, roles: [], addressList: [], creditCards: [] };

    case SET_ADDRESSES:
      return { ...state, addressList: action.payload };
    case ADD_ADDRESS:
      return { ...state, addressList: [...state.addressList, action.payload] };
    case UPDATE_ADDRESS:
      return {
        ...state,
        addressList: state.addressList.map((addr) =>
          addr.id === action.payload.id ? action.payload : addr
        ),
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        addressList: state.addressList.filter((addr) => addr.id !== action.payload),
      };

    case SET_LOADING:
      return { ...state, loading: action.payload };

    case SET_CARDS:
      return { ...state, creditCards: action.payload };
    case ADD_CARD:
      return { ...state, creditCards: [...state.creditCards, action.payload] };
    case UPDATE_CARD:
      return {
        ...state,
        creditCards: state.creditCards.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case DELETE_CARD:
      return {
        ...state,
        creditCards: state.creditCards.filter((c) => c.id !== action.payload),
      };

    default:
      return state;
  }
}

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme });
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language });
export const clearUser = () => ({ type: CLEAR_USER });

export const setAddresses = (addresses) => ({ type: SET_ADDRESSES, payload: addresses });
export const addAddress = (address) => ({ type: ADD_ADDRESS, payload: address });
export const updateAddressAction = (address) => ({ type: UPDATE_ADDRESS, payload: address });
export const deleteAddressAction = (addressId) => ({ type: DELETE_ADDRESS, payload: addressId });
export const setLoading = (loading) => ({ type: SET_LOADING, payload: loading });

export const setCards = (cards) => ({ type: SET_CARDS, payload: cards });
export const addCard = (card) => ({ type: ADD_CARD, payload: card });
export const updateCardAction = (card) => ({ type: UPDATE_CARD, payload: card });
export const deleteCardAction = (cardId) => ({ type: DELETE_CARD, payload: cardId });
