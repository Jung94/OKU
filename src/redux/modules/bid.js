import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { API } from "shared/Api";
import product from "./product";

// actions
const LOADING = "LOADING";
const SET_BID = "SET_BID";
const ADD_BID = "ADD_BID";
const ADD_SUCBID = "ADD_SUCBID";

//actionCreators
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const setBid = createAction(SET_BID, (bid_list) => ({ bid_list }));
const addBid = createAction(ADD_BID, () => ({}));
const addSucbid = createAction(ADD_SUCBID, () => ({}));

const initialState = {
  is_loading: false,
  bid_list: [],
};

const _idTest = "60956601e87c8e7c77e86771";
// 45,000원

const setBidAPI = () => {
  return function (dispatch, getState, { history }) {
    let id = getState().product.productId;
    dispatch(loading(true));
    fetch(`${API}/bid/bidinfo/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.prebid) {
          let _prebid = res.prebid;
          _prebid.sort(function (a, b) {
            return a.createAt > b.createAt ? -1 : a.createAt < b.createAt ? 1 : 0;
          });
          dispatch(setBid(_prebid));
          dispatch(loading(false));
        } else {
          console.log("해당 데이터가 준비되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.log("setQnAAPI에 문제가 있습니다.", error);
      });
  };
};

const addBidAPI = (bidPrice, createAt) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
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
        console.log(res);
        if (res.result) {
          dispatch(addBid(res.result));
          dispatch(loading(false));
        } else {
          console.log("해당 데이터가 준비되지 않았습니다.");
          dispatch(loading(false));
        }
      })
      .catch((err) => {
        console.log("addBidAPI에 문제가 있습니다.", err);
      });
  };
};

const addSucbidAPI = (sucBid, sellerunique, createAt) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    let id = getState().product.productId;
    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/bid/sucbid/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: `${access_token}`,
      },
      body: JSON.stringify({ sellerunique: sellerunique, sucBid: sucBid }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.msg);
        dispatch(loading(false));
      })
      .catch((err) => {
        console.log("addBidAPI에 문제가 있습니다.", err);
      });
  };
};

export default handleActions(
  {
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        // console.log("🟡I'm loading status: ", draft.is_loading);
      }),
    [SET_BID]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        draft.bid_list = action.payload.bid_list.slice(0, 5); // 정보 5개만 불러오기
        console.log("🟡I'm bid_list status: ", draft.bid_list);
      }),
    [ADD_BID]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        // console.log("🟡", action.payload.new_question);
        // unshift: 데이터를 배열 맨 앞에 넣어줌.
        // draft.qna_list.unshift(action.payload.new_question);
      }),
    [ADD_SUCBID]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        // console.log("🟡", action.payload.new_question);
        // unshift: 데이터를 배열 맨 앞에 넣어줌.
        // draft.qna_list.unshift(action.payload.new_question);
      }),
  },
  initialState
);

const actionCreators = {
  setBidAPI,
  addBidAPI,
  addSucbidAPI,
};

export { actionCreators };
