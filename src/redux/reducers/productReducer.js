const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 12,
  offset: 0,
  filter: "",
  sort: "",
  category: null,
  fetchState: "NOT_FETCHED",
};

const SET_CATEGORIES = "SET_CATEGORIES";
const SET_PRODUCT_LIST = "SET_PRODUCT_LIST";
const SET_TOTAL = "SET_TOTAL";
const SET_FETCH_STATE = "SET_FETCH_STATE";
const SET_FILTER = "SET_FILTER";
const SET_SORT = "SET_SORT";
const SET_CATEGORY = "SET_CATEGORY";

export const setCategories = (data) => ({ type: SET_CATEGORIES, payload: data });
export const setProductList = (data) => ({ type: SET_PRODUCT_LIST, payload: data });
export const setTotal = (data) => ({ type: SET_TOTAL, payload: data });
export const setFetchState = (data) => ({ type: SET_FETCH_STATE, payload: data });
export const setFilter = (data) => ({ type: SET_FILTER, payload: data });
export const setSort = (data) => ({ type: SET_SORT, payload: data });
export const setCategory = (data) => ({ type: SET_CATEGORY, payload: data });

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_PRODUCT_LIST:
      return { ...state, productList: action.payload };
    case SET_TOTAL:
      return { ...state, total: action.payload };
    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    case SET_SORT:
      return { ...state, sort: action.payload };
    case SET_CATEGORY:
      return { ...state, category: action.payload };
    default:
      return state;
  }
}
