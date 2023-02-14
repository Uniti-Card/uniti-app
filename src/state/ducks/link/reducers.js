import * as types from "./types";

const initialState = {};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LINK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.LINK_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.GET_LINKS_SUCCESS:
      return payload;
    case types.LINK_RESET:
      return {};
    default:
      return state;
  }
};

export default reducer;
