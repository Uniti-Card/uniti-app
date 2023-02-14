import * as types from "./types";

import LinkService from "../../services/link.service";

export const getLinks = (profileId) => async (dispatch) => {
  try {
    dispatch({
      type: types.LINK_REQUEST,
    });
    const res = await LinkService.getAll(profileId);

    dispatch({
      type: types.GET_LINKS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.LINK_FAIL,
      payload: message,
    });
  }
};
