import * as types from "./types";

import ProfileService from "../../services/profile.service";

export const getProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.PROFILE_REQUEST,
    });
    const res = await ProfileService.get(id);

    dispatch({
      type: types.GET_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PROFILE_FAIL,
      payload: message,
    });
  }
};
