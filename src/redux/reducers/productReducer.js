const initialState = {
  categories: [],
  productList: [],
  product: null,      
  total: 0,
  limit: 12,
  offset: 0,
  filter: "",
  sort: "",
  category: null,
  loading: false,      
  error: null,         
  fetchState: "NOT_FETCHED",
};

const SET_CATEGORIES = "SET_CATEGORIES";
const SET_PRODUCT_LIST = "SET_PRODUCT_LIST";
const SET_TOTAL = "SET_TOTAL";
const SET_FETCH_STATE = "SET_FETCH_STATE";
const SET_FILTER = "SET_FILTER";
const SET_SORT = "SET_SORT";
const SET_CATEGORY = "SET_CATEGORY";

const PRODUCT_FETCH_REQUEST = "PRODUCT_FETCH_REQUEST";
const PRODUCT_FETCH_SUCCESS = "PRODUCT_FETCH_SUCCESS";
const PRODUCT_FETCH_FAIL = "PRODUCT_FETCH_FAIL";

// Categories & Products
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

    case PRODUCT_FETCH_REQUEST:
      return { ...state, loading: true, error: null };
    case PRODUCT_FETCH_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
