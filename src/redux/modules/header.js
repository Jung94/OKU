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

//actionCreators
const setBid = createAction(SET_BID, (bid_list) => ({ bid_list }));
const addBid = createAction(ADD_BID, (new_bid) => ({ new_bid }));
const setCurrent = createAction(SET_CURRENT, (current) => ({ current }));

const initialState = {
  is_loading: false,
  bid_list: [],
  new_bid: {},
  current: false,
};

const setBidAPI = (_id) => {
  return function (dispatch, getState, { history }) {
    // let id = getState().product.productId;
    fetch(`${API}/bid/bidinfo/${_id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.prebid) {
          let _prebid = res.prebid;
          _prebid.sort(function (a, b) {
            return a.createAt > b.createAt ? -1 : a.createAt < b.createAt ? 1 : 0;
          });
          if (_prebid.length < 5) {
            dispatch(setBid(_prebid.slice(0, -1)));
            dispatch(setCurrent(_prebid[0].bid));
          } else {
            dispatch(setBid(_prebid.slice(0, 5)));
            dispatch(setCurrent(_prebid[0].bid));
          }
        } else {
          console.log(res.msg);
        }
      })
      .catch((error) => {
        console.log("setQnAAPI에 문제가 있습니다.", error);
      });
  };
};

const addBidAPI = (bidPrice, createAt) => {
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));
    let id = getState().product.productId;
    const access_token = localStorage.getItem("access_token");
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
        if (res) {
          dispatch(addBid({ bid: res.result.bid, nickName: res.result.nickName, createAt: res.result.createAt }));
          dispatch(loadingActions.loading(false));
        } else {
          console.log("해당 데이터가 준비되지 않았습니다.");
          dispatch(loadingActions.loading(false));
        }
      })
      .catch((err) => {
        console.log("addBidAPI에 문제가 있습니다.", err);
      });
  };
};

const addSucbidAPI = (sucBid, sellerunique, createAt) => {
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));
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
        dispatch(loadingActions.loading(false));
      })
      .catch((err) => {
        console.log("addBidAPI에 문제가 있습니다.", err);
      });
  };
};

export default handleActions(
  {
    [SET_BID]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        draft.bid_list = action.payload.bid_list;
        // console.log("🟡I'm bid_list: ", draft.bid_list);
      }),
    [ADD_BID]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
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
  },
  initialState
);

const actionCreators = {
  setBidAPI,
  // API뿐만 아니라 dispatch할라면 짝으로 같이 넣어줘야함.
  addBid,
  addBidAPI,
  addSucbidAPI,
};

export { actionCreators };
