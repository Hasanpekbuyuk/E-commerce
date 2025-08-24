import api from "../../api"; // API instance
import {
  setCategories,
  setFetchState,
  setProductList,
  setTotal,
} from "../reducers/productReducer";

// --- Categories ---
export const fetchCategories = () => async (dispatch, getState) => {
  const { categories } = getState().product;
  if (categories.length > 0) return; // zaten varsa fetch etme

  dispatch(setFetchState("FETCHING"));
  try {
    const res = await api.get("/categories");
    console.log("Categories Response:", res.data);
    dispatch(setCategories(res.data));
    dispatch(setFetchState("FETCHED"));
  } catch (err) {
    console.error("Error fetching categories:", err);
    dispatch(setFetchState("FAILED"));
  }
};

export const fetchProducts =
  ({ limit = 25, offset = 0 } = {}) =>
  async (dispatch, getState) => {
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
      console.error("Error fetching products:", err);
      dispatch(setFetchState("FAILED"));
    }
  };