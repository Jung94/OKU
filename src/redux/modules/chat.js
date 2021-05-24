import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { API } from "shared/Api";

import { actionCreators as loadingActions } from "redux/modules/loading";

// 액션
const GET_MSG = "GET_MSG";
const SET_MSG = "SET_MSG";
const LOADING = "LOADING";
const BADGE = "BADGE";
const RECEIVEBADGE = "RECEIVEBADGE";
const USERS = "USERS";

// 액션 생성함수
const getMsg = createAction(GET_MSG, (msg) => ({ msg }));
const setMsg = createAction(SET_MSG, (msg) => ({ msg }));
const badgeOff = createAction(BADGE, (uid) => ({ uid }));
const receiveBadge = createAction(RECEIVEBADGE, (uid) => ({ uid }));
const user_list = createAction(USERS, (user_list) => ({ user_list }));

// initialState
const initialState = {
  chat_list: [],
  user_list: [],
};

// 소켓 설정(전역으로 사용하기위해 export)
const socket = socketIOClient(`${API}/chat`);
const globalSocket = socketIOClient(`${API}/`);

// 거래 종료 - 유저 목록에서 삭제
const endOfChat = (productId, otherId, myId) => {
  return function (dispatch, { history }) {
    let access_token = localStorage.getItem("access_token");
    console.log(productId, otherId, myId);
    axios({
      method: "delete",
      url: `${API}/chat/exit/${productId}/${otherId}/${myId}`,
      headers: {
        access_token: `${access_token}`,
      },
    })
      .then((res) => {
        console.log(res.data.result);
        // dispatch(endOfDeal());
        // history.replace("/chat");
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

// 유저 목록 조회
const middlewareUsers = () => {
  return function (dispatch) {
    let access_token = localStorage.getItem("access_token");

    axios({
      method: "get",
      url: `${API}/chat/member`,
      headers: {
        access_token: `${access_token}`,
      },
    })
      .then((res) => {
        if (res.data.targets !== false) {
          const users = res.data.targets.map((val) => {
            // 알림 배지 여부를 위해 처리
            return { ...val, is_badge: false };
          });

          dispatch(user_list(users));
        } else {
          return;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

// 채팅 목록 불러오기
const loadChatList = () => {
  return function (dispatch) {
    socket.on("load", (res) => {
      dispatch(getMsg(res));
    });
  };
};

// 채팅 내용 추가하기
const addChatList = () => {
  return function (dispatch) {
    socket.on("receive", (res) => {
      dispatch(setMsg(res));
    });
  };
};

const globalAddChatList = (room) => {
  return function (dispatch, getState) {
    globalSocket.on("globalReceive", (res) => {
      // const myId = getState().user.user.uid;
      const myId = localStorage.getItem("uid");
      const receive_val = res.room.split("-");

      // 나한태 오는 알림일 경우
      if (receive_val.includes(myId) === true) {
        // 내가 보내는 알림은 울리지 않게 끔
        if (getState().user.user.uid !== res.uid) {
          // 해당 채팅방에서는 알람이 울리지 않게 끔 조건 처리
          if (room !== res.room) {
            // 배지 알림
            dispatch(receiveBadge(res.uid));
            // 크롬 noti
            // noti 권한 허용일 경우
            if (Notification.permission === "granted") {
              new Notification(res.username, {
                body: res.msg,
                icon: res.profile_img,
              });
              // noti 권한이 허용이 아닐 경우
            } else if (Notification.permission !== "denied") {
              Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                  new Notification(res.username, {
                    body: res.msg,
                    icon: res.profile_img,
                  });
                }
              });
            }
          }
        }
      }
    });
  };
};

// 리듀서
export default handleActions(
  {
    [GET_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.chat_list = action.payload.msg;
      }),
    [SET_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.chat_list = [...draft.chat_list, action.payload.msg];
      }),
    [LOADING]: (state, action) => produce(state, (draft) => {}),
    [BADGE]: (state, action) =>
      produce(state, (draft) => {
        console.log();
        const idx = draft.user_list.findIndex((val) => val.userId === action.payload.uid);
        draft.user_list[idx].is_badge = false;
      }),
    [RECEIVEBADGE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.user_list.findIndex((val) => val.userId === action.payload.uid);
        draft.user_list[idx].is_badge = true;
      }),
    [USERS]: (state, action) =>
      produce(state, (draft) => {
        draft.user_list = action.payload.user_list;
      }),
  },
  initialState
);

const actionCreators = {
  loadChatList,
  addChatList,
  globalAddChatList,
  badgeOff,
  middlewareUsers,
  endOfChat,
  socket,
  globalSocket,
};

export { actionCreators };
