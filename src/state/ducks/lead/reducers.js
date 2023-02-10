import * as types from './types';

const initialState = {};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.LEAD_REQUEST:
      return {
        loading: true,
      };
    case types.LEAD_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case types.ADD_LEAD_SUCCESS:
      return {
        success: true,
      };
    case types.LEAD_RESET:
      return {};
    default:
      return state;
  }
}
