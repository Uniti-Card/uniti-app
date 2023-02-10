import * as types from './types';

import LeadService from '../../services/lead.service';

export const addLead = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.LEAD_REQUEST,
    });
    const res = await LeadService.add(id, data);
    dispatch({
      type: types.ADD_LEAD_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.LEAD_FAIL,
      payload: message,
    });
  }
};
