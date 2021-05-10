import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { API } from "shared/Api";

import { actionCreators as loadingActions } from "redux/modules/loading";

// actions
const SET_PROFILE = "SET_PROFILE";
const EDIT_PROFILE = "EDIT_PROFILE";

//actionCreators
const setProfile = createAction(SET_PROFILE, (user) => ({ user }));
const editProfile = createAction(EDIT_PROFILE, (nickname, profile) => ({ nickname, profile }));

const initialState = {
  is_loading: false,
  user: {},
};

const setProfileAPI = () => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/user/mypronick`, {
      method: "GET",
      headers: {
        access_token: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.okay) {
          let _user = { nickname: res.nickname, profile: res.profile };
          dispatch(setProfile(_user));
        } else {
          console.log("해당 데이터가 준비되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.log("setProductAllAPI에 문제가 있습니다.", error);
      });
  };
};

const editProfileAPI = (nickname, profile) => {
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));
    const access_token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("nick", nickname);
    formData.append("img", profile);

    fetch(`${API}/user/mypronick`, {
      method: "PUT",
      headers: {
        access_token: `${access_token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.okay) {
        } else {
          console.log("해당 데이터가 준비되지 않았습니다.");
        }
        dispatch(loadingActions.loading(false));
      })
      .catch((error) => {
        console.log("setProductAllAPI에 문제가 있습니다.", error);
      });
  };
};

export default handleActions(
  {
    [SET_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        draft.user = action.payload.user;
      }),
    [EDIT_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        draft.user = action.payload.user;
      }),
  },
  initialState
);

const actionCreators = {
  setProfile,
  setProfileAPI,
  editProfile,
  editProfileAPI,
};

export { actionCreators };
