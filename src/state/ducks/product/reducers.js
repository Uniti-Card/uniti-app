import * as types from "./types";

const initialState = {};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.GET_PRODUCTS_SUCCESS:
      return payload;
    case types.PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export default reducer;
