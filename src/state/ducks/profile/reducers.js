import * as types from "./types";

const initialState = {};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.GET_PROFILE_SUCCESS:
      return {
        loading: false,
        details: payload,
      };
    case types.PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export default reducer;
