import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { API } from "shared/Api";

import { actionCreators as loadingActions } from "redux/modules/loading";

// actions
const SET_ALERT = "SET_ALERT";

//actionCreators
const setAlert = createAction(SET_ALERT, (alert) => ({ alert }));

const initialState = {
  all_alert: [],
};

// const Alert_API = "http://3.35.137.38/bid/alert";
// const getAlertAPI = () => {
//   return function (dispatch, getState, { history }) {
//     axios
//     .get(Alert_API)
//       .then((resp) => {
//         dispatch(setAlert(resp.data));
//       })
//       .catch((e) => console.log(e));
//   };
// };

// 알림
const getAlertAPI = () => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/bid/alert`, {
      method: "GET",
      headers: {
        access_token: access_token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "not_login") {
        } else {
          console.log(res);
          //     let _prebid = res.alreadyCheck;
          //     _prebid.sort(function (a, b) {
          //       return a.createAt > b.createAt ? -1 : a.createAt < b.createAt ? 1 : 0;
          //     });
          //     let _prebid = res.notCheck;
          // dispatch(setAlert(res.alreadyCheck));
          // dispatch(setAlert(res.notCheck));
          dispatch(setAlert(res));
          // }
        }
      })
      .catch((error) => {
        console.log("알림 문제", error);
      });
  };
};

export default handleActions(
  {
    [SET_ALERT]: (state, action) =>
      produce(state, (draft) => {
        // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
        draft.all_alert = action.payload.alert;
      }),
  },
  initialState
);

const actionCreators = {
  getAlertAPI,
};

export { actionCreators };
