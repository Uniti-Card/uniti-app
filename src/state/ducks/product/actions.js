import * as types from "./types";

import ProductService from "../../services/product.service";

export const getProducts = (profileId) => async (dispatch) => {
  try {
    dispatch({
      type: types.PRODUCT_REQUEST,
    });
    const res = await ProductService.getAll(profileId);

    dispatch({
      type: types.GET_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PRODUCT_FAIL,
      payload: message,
    });
  }
};
