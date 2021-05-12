import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { API } from "shared/Api";

import { actionCreators as loadingActions } from "redux/modules/loading";

// actions
const SET_HEADER = "SET_HEADER";

//actionCreators
const setHeader = createAction(SET_HEADER, (display) => ({ display }));

const initialState = {
  header_display: true,
};

export default handleActions(
  {
    [SET_HEADER]: (state, action) =>
      produce(state, (draft) => {
        draft.header_display = action.payload.display;
      }),
  },
  initialState
);

const actionCreators = {
  setHeader,
};

export { actionCreators };
