import * as types from './types';

const initialState = {};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.USER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.GET_USER_SUCCESS:
      return {
        loading: false,
        details: payload,
      };
    case types.USER_RESET:
      return {};
    default:
      return state;
  }
};

export default reducer;
