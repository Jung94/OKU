import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const LOADING = "LOADING";
const SET_PRODUCT_ALL = "SET_PRODUCT_ALL";
const SET_QNA = "SET_QNA";
const POST_QNA = "POST_QNA";

//actionCreators
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const setProductAll = createAction(SET_PRODUCT_ALL, (product_detail) => ({ product_detail }));
const setQnA = createAction(SET_QNA, (qna) => ({ qna }));
const postQnA = createAction(POST_QNA, () => ({}));

const initialState = {
  is_loading: false,
  product_detail: [],
  qna_list: {}, // []이 아닌 {}로 들어간다...
};

const PRODUCT_API = "http://3.35.137.38/product/detail/608ff18419fa4844b5192783";

const setProductAllAPI = (_id) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    //  추후에 product 클릭 id를 가져와야함
    // _id
    fetch(PRODUCT_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      // fetch를 통해서는 json형태를 거치고 then과정을 해야한다.
      // Q. 이거 '비동기'관련 개념인가?
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) {
          dispatch(setProductAll(res.result));
          dispatch(loading(false));
        } else {
          console.log("해당 데이터가 준비되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.log("setProductAllAPI에 문제가 있습니다.", error);
      });
  };
};

const setQnAAPI = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    fetch(PRODUCT_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) {
          dispatch(setQnA(res.result));
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

const postQnAAPI = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    fetch(PRODUCT_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) {
          dispatch(setQnA(res.result));
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

export default handleActions(
  {
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        // console.log("🟡I'm loading status: ", draft.is_loading);
      }),
    [SET_PRODUCT_ALL]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        draft.product_detail = action.payload.product_detail;
        // console.log("🟡I'm product_detail status: ", draft.product_detail);
      }),
    [SET_QNA]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        draft.qna_list = action.payload.qna;
        // console.log("🟡I'm qna_list status: ", draft.qna_list);
      }),
    [POST_QNA]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  setProductAll,
  setProductAllAPI,
  setQnA,
  setQnAAPI,
  postQnAAPI,
};

export { actionCreators };
