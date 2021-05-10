import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { API } from "shared/Api";

// actions
const SET_PROFILE = "SET_PROFILE";


//actionCreators
const setProfile = createAction(SET_PROFILE, ( nickname ) => ({ nickname }));


const initialState = {
  nickname: '',
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
        if (res.okay) {
          let nickname = res.nickname;
          dispatch(setProfile(nickname));
        } else {
          console.log("해당 데이터가 준비되지 않았습니다.");
        }
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
        draft.nickname = action.payload.nickname;
      }),
  },
  initialState
);

const actionCreators = {
  setProfileAPI,
};

export { actionCreators };
