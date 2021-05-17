import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { API } from "shared/Api";

import { actionCreators as loadingActions } from "redux/modules/loading";

// actions
const SET_PROFILE = "SET_PROFILE";
const SET_INFO = "SET_INFO";
const SET_MYSELLING = "SET_MYSELLING";
const SET_PREVIEW = "SET_PREVIEW";

//actionCreators
const setProfile = createAction(SET_PROFILE, (user) => ({ user }));
const setInfo = createAction(SET_INFO, (user) => ({ user }));
const setMystore = createAction(SET_MYSELLING, (selling_list, sold_list, length) => ({ selling_list, sold_list, length }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  user: {},
  user_info: {},
  my_selling: [],
  my_sold: [],
  my_length: 0,
};

const setProfileAPI = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));
    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/user/mypronick`, {
      method: "GET",
      headers: {
        access_token: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) {
          let _user = { nickname: res.nickname, profile: res.profile };
          dispatch(setProfile(_user));
        } else {
          console.log("해당 데이터가 준비되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.log("setProfileAPI에 문제가 있습니다.", error);
      })
      .finally(() => {
        dispatch(loadingActions.loading(false));
      });
  };
};

const editProfileAPI = (nickname, profile) => {
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));
    const access_token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("nick", nickname);
    formData.append("profileImg", profile);
    fetch(`${API}/user/mypronick`, {
      method: "PUT",
      headers: {
        access_token: `${access_token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) {
          localStorage.removeItem("nickname");
          localStorage.setItem("nickname", nickname);
          if (res.profileImg === profile) {
            let draft = { nickname: nickname, profile: res.profileImg };
            dispatch(setProfile(draft));
          } else if (!profile) {
            let original = getState().mypage.user.profile;
            let draft = { nickname: nickname, profile: original };
            dispatch(setProfile(draft));
          } else {
            const reader = new FileReader();
            reader.readAsDataURL(profile); // 파일 내용을 읽어오기
            reader.onloadend = () => {
              let draft = { nickname: nickname, profile: reader.result };
              dispatch(setProfile(draft));
            };
          }
        } else {
          console.log("해당 데이터가 준비되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.log("editProfileAPI에 문제가 있습니다.", error);
      })
      .finally(() => {
        dispatch(loadingActions.loading(false));
      });
  };
};

const setInfoAPI = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));

    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/user/myinfo`, {
      method: "GET",
      headers: {
        access_token: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) {
          dispatch(setInfo(res.user));
        } else {
          console.log("해당 데이터가 준비되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.log("setInfoAPI에 문제가 있습니다.", error);
      })
      .finally(() => {
        dispatch(loadingActions.loading(false));
      });
  };
};

const setMystoreAPI = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));

    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/user/myproduct`, {
      method: "GET",
      headers: {
        access_token: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) {
          let selling = [];
          let sold = [];
          const all = res.result;
          all.forEach((r) => {
            if (r.onSale) {
              selling.push(r);
            } else {
              sold.push(r);
            }
          });
          dispatch(setMystore(selling, sold, all.length));
        } else {
          console.log("해당 데이터가 준비되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.log("setInfoAPI에 문제가 있습니다.", error);
      })
      .finally(() => {
        dispatch(loadingActions.loading(false));
      });
  };
};

export default handleActions(
  {
    [SET_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
    [SET_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.user_info = action.payload.user;
      }),
    [SET_MYSELLING]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.selling_list === 0) {
          return;
        } else if (action.payload.selling_list < 5) {
          draft.my_selling = action.payload.selling_list;
        } else {
          draft.my_selling = action.payload.selling_list.slice(0, 4);
        }

        if (action.payload.sold_list === 0) {
          return;
        } else if (action.payload.sold_list < 5) {
          draft.my_sold = action.payload.sold_list;
        } else {
          draft.my_sold = action.payload.sold_list.slice(0, 4);
        }
        draft.my_length = action.payload.length;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview_image = action.payload.preview;
        draft.progress = true;
      }),
  },
  initialState
);

const actionCreators = {
  setProfile,
  setProfileAPI,
  editProfileAPI,
  setPreview,
  setInfo,
  setInfoAPI,
  setMystore,
  setMystoreAPI,
};

export { actionCreators };
