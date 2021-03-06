import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { API } from "shared/Api";

import { actionCreators as loadingActions } from "redux/modules/loading";

// bid 모듈을 따로 빼서 처음에는 컴포넌트에 useEffect 로 사용
// 두번 reload를 시켜야 하는 부담
// 컴포넌트에서 id로드 후 bidAction을 실행할 수 있었음
// 원하는건 : product로드시, 딸린 애들 ex) bid / 문의 를 같이 불러오고 싶은데
// bidAction을 product 모듈에 심으면 getState로 따로 받지 않아도 _id를 받아와 바로 실행가능

// actions
const SET_BID = "SET_BID";
const ADD_BID = "ADD_BID";
const SET_CURRENT = "SET_CURRENT";
const WARNING_BID = "WARNING_BID";

const SET_MSG = "SET_MSG";
// 유저 조회
const GET_PUBLIC_USER = "GET_PUBLIC_USER";

//actionCreators
const setBid = createAction(SET_BID, (bid_list) => ({ bid_list }));
const addBid = createAction(ADD_BID, (new_bid) => ({ new_bid }));
const warningBid = createAction(WARNING_BID, (warning_bid) => ({ warning_bid }));
const setCurrent = createAction(SET_CURRENT, (current) => ({ current }));

const setMsg = createAction(SET_MSG, (msg) => ({ msg }));
// 유저 조회
const getPublicUser = createAction(GET_PUBLIC_USER, (user) => ({ user }));

const initialState = {
  bid_list: [],
  new_bid: {},
  current: 0,
  bid_before: "",
  buyer: {},
  successMsg: "",
};

const setBidAPI = (_id, lowBid) => {
  return function (dispatch, getState, { history }) {
    fetch(`${API}/bid/bidinfo/${_id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        // 입찰자가 있을때 응답
        // okay: true, prebid: Array(2)
        if (res.okay) {
          let _prebid = res.prebid;
          _prebid.sort(function (a, b) {
            return a.createAt > b.createAt ? -1 : a.createAt < b.createAt ? 1 : 0;
          });
          if (_prebid.length === 0) {
            dispatch(setBid([]));
            dispatch(setCurrent(lowBid));
          } else if (_prebid.length < 4) {
            dispatch(setBid(_prebid));
            dispatch(setCurrent(_prebid[0].bid));
          } else {
            dispatch(setBid(_prebid.slice(0, 4)));
            dispatch(setCurrent(_prebid[0].bid));
          }
        } else {
          // 새로고침 없이 상품 정보 불러올 때 입찰정보가 로딩이 안된 이유는 이곳에 있다
          // 입찰 내역이 없을때 다음과 같이 응답이 옴
          // okay: false, msg: "현재입찰자가 없습니다."
          // 여기서 디스패치를 안해주어서 입찰내역이 안뜬거임
          // console.log("입찰 내역이 없음!");
          // console.log(lowBid);
          dispatch(setBid([]));
          dispatch(setCurrent(lowBid));
        }
      })
      .catch((error) => {
        console.log("setQnAAPI에 문제가 있습니다.", error);
      });
  };
};

const addBidAPI = (bidPrice, createAt) => {
  return function (dispatch, getState, { history }) {
    let id = getState().product.productId;
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      if (window.confirm("로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?")) {
        history.replace("/login");
      }
      return;
    }

    fetch(`${API}/bid/bidtry/${id}`, {
      method: "POST",
      headers: {
        // 여기선 contenttype/json필요 있음
        "Content-Type": "application/json",
        access_token: `${access_token}`,
      },
      body: JSON.stringify({ bid: bidPrice }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.result);
        if (res.result === "before" || res.result === "lowBid") {
          // console.log(res.result);
          dispatch(warningBid("before"));
          return;
        } else if (res.result === "time") {
          // console.log(res.result);
          dispatch(warningBid("time"));
          return;
        } else if (res.result._id) {
          // console.log(res.result);
          dispatch(warningBid("success"));
          dispatch(addBid({ bid: res.result.bid, nickName: res.result.nickName, createAt: res.result.createAt }));
          dispatch(setCurrent(res.result.bid));
          return;
        } else {
          console.log("해당 데이터가 준비되지 않았습니다.");
        }
      })
      .catch((err) => {
        console.log("addBidAPI에 문제가 있습니다.", err);
      });
  };
};

const addSucbidAPI = (sucBid, sellerunique, createAt) => {
  return function (dispatch, getState, { history }) {
    let id = getState().product.productId;
    let nickname = localStorage.getItem("nickname");
    const access_token = localStorage.getItem("access_token");
    const draft = { bid: sucBid, nickName: nickname, createAt: createAt };
    fetch(`${API}/bid/sucbid/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: `${access_token}`,
      },
      body: JSON.stringify({ sellerunique: sellerunique, sucbid: sucBid }),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(addBid(draft));
        // window.location.reload();
      })
      .catch((err) => {
        console.log("addBidAPI에 문제가 있습니다.", err);
      });
  };
};

const addNEWSucbidAPI = (sucBid, sellerunique, createAt) => {
  return function (dispatch, getState, { history }) {
    let id = getState().product.productId;
    let nickname = localStorage.getItem("nickname");
    const access_token = localStorage.getItem("access_token");
    const draft = { bid: sucBid, nickName: nickname, createAt: createAt };
    fetch(`${API}/bid/newsucbid/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: `${access_token}`,
      },
      body: JSON.stringify({ sellerunique: sellerunique, sucbid: sucBid }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.okay) {
          dispatch(addBid(draft));
          dispatch(setMsg(res.msg));
        } else {
          console.log("response is not ok.");
        }
      })
      .catch((err) => {
        console.log("addNEWSucbidAPI에 문제가 있습니다.", err);
      });
  };
};

// alert 과정에서 진행
const confirmSuccessAPI = (alertId, successBoolean) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/bid/sellerconfirm/${alertId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: `${access_token}`,
      },
      body: JSON.stringify({ decision: successBoolean }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.msg);
        if (res.okay) {
          dispatch(setMsg(res.msg));
        } else {
          console.log("response is not ok.");
        }
      })
      .catch((err) => {
        console.log("getPublicUserAPI에 문제가 있습니다.", err);
      });
  };
};

// 퍼블릭 유저 정보 얻기
// 프로필 이미지 & 유저아이디
const getPublicUserAPI = (buyerId) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/bid/buyercheck/${buyerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.okay) {
          dispatch(getPublicUser(res.user));
        } else {
          console.log("response is not okay.");
        }
      })
      .catch((err) => {
        console.log("getPublicUserAPI에 문제가 있습니다.", err);
      });
  };
};

export default handleActions(
  {
    [SET_BID]: (state, action) =>
      produce(state, (draft) => {
        draft.bid_list = action.payload.bid_list;
        // console.log("🟡I'm bid_list: ", draft.bid_list);
      }),
    [ADD_BID]: (state, action) =>
      produce(state, (draft) => {
        // unshift: 데이터를 배열 맨 앞에 넣어줌.
        draft.bid_list.unshift(action.payload.new_bid);
        if (draft.bid_list.length > 5) {
          // shift: 배열 맨 뒤 데이터 빼기.
          // -> 꼭그렇지 않은듯
          // unshift쓰고 shift쓰면 넣은거 다시 빼는 동작이라 아무 변화가 없음
          // 마지막 데이터는 pop으로!
          draft.bid_list.pop();
        }
      }),
    [SET_CURRENT]: (state, action) =>
      produce(state, (draft) => {
        draft.current = action.payload.current;
      }),
    [WARNING_BID]: (state, action) =>
      produce(state, (draft) => {
        draft.bid_before = action.payload.warning_bid;
      }),
    [SET_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.successMsg = action.payload.msg;
        console.log(draft.successMsg);
      }),
    [GET_PUBLIC_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.buyer = action.payload.user;
      }),
  },
  initialState
);

const actionCreators = {
  setBidAPI,
  // API뿐만 아니라 dispatch할라면 짝으로 같이 넣어줘야함.
  addBid,
  addBidAPI,
  addSucbidAPI, //쓰지않음
  warningBid,
  // 즉시 낙찰 +a 과정 - 물건 즉시 사라짐 방지
  addNEWSucbidAPI,
  confirmSuccessAPI,

  setMsg,
  getPublicUserAPI,
};

export { actionCreators };
