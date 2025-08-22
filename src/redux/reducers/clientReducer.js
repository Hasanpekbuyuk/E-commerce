// Initial state
const initialState = {
  user: null,        
  addressList: [],
  creditCards: [],
  roles: [],
  theme: "light",
  language: "en",
};

// Action types
const SET_USER = "SET_USER";
const SET_ROLES = "SET_ROLES";
const SET_THEME = "SET_THEME";
const SET_LANGUAGE = "SET_LANGUAGE";
const CLEAR_USER = "CLEAR_USER"; 

// Reducer
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
      return { ...state, user: null, roles: [] };
    default:
      return state;
  }
}

// Action creators
export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme });
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language });
export const clearUser = () => ({ type: CLEAR_USER }); 
