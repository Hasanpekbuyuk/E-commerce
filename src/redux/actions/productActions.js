// src/redux/actions/productActions.js
import api from "../../api"; 
import {
  setCategories,
  setFetchState,
  setProductList,
  setTotal,
} from "../reducers/productReducer";

// --- Categories ---
export const fetchCategories = () => async (dispatch, getState) => {
  const { categories } = getState().product;
  if (categories.length > 0) return;

  dispatch(setFetchState("FETCHING"));
  try {
    const res = await api.get("/categories");
    dispatch(setCategories(res.data));
    dispatch(setFetchState("FETCHED"));
  } catch (err) {
    dispatch(setFetchState("FAILED"));
  }
};

// --- Products List ---
export const fetchProducts = ({ limit = 25, offset = 0 } = {}) => async (dispatch, getState) => {
  const { category, filter, sort } = getState().product;

  dispatch(setFetchState("FETCHING"));
  try {
    const res = await api.get("/products", {
      params: {
        limit,
        offset,
        ...(category ? { category } : {}),
        ...(filter ? { filter } : {}),
        ...(sort ? { sort } : {}),
      },
    });

    dispatch(setProductList(res.data.products));
    dispatch(setTotal(res.data.total));
    dispatch(setFetchState("FETCHED"));
  } catch (err) {
    dispatch(setFetchState("FAILED"));
  }
};

// --- Single Product ---
export const fetchProduct = (productId) => async (dispatch) => {
  dispatch({ type: "PRODUCT_FETCH_REQUEST" });
  try {
    const res = await api.get(`/products/${productId}`);
    dispatch({ type: "PRODUCT_FETCH_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "PRODUCT_FETCH_FAIL", payload: err.message });
  }
};
