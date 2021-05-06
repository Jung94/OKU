import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { API } from "shared/Api";

// actions
const LOADING = "LOADING";
const SET_PRODUCT_ALL = "SET_PRODUCT_ALL";
const SET_QUESTION = "SET_QUESTION";
const SET_ANSWER = "SET_ANSWER";
const POST_QNA = "POST_QNA";

//actionCreators
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const setProductAll = createAction(SET_PRODUCT_ALL, (product_detail) => ({ product_detail }));
const setQuestion = createAction(SET_QUESTION, (question) => ({ question }));
const setAnswer = createAction(SET_ANSWER, (answer) => ({ answer }));
const postQnA = createAction(POST_QNA, () => ({}));

const initialState = {
  is_loading: false,
  product_detail: [],
  question_list: [],
};

const _idTest = "609239b59cc98128bdb5884c";

const setProductAllAPI = (_id) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    // 추후에 product 클릭 id를 가져와야함
    // _id
    fetch(`${API}/product/detail/${_idTest}`, {
      method: "GET",
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
    fetch(`${API}/product/quest/${_idTest}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) {
          dispatch(setQuestion(res.result));
          dispatch(loading(false));
          // console.log("🟢", res.result);
        } else {
          console.log("해당 데이터가 준비되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.log("setQnAAPI에 문제가 있습니다.", error);
      });
  };
};

const postQnAAPI = (_id) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/product/quest/${_idTest}`, {
      method: "POST",
      headers: {
        access_token: `${access_token}`,
      },
      body: {
        productId: _id,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) {
          dispatch(setQuestion(res.result));
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
        console.log("🟡I'm product_detail status: ", draft.product_detail);
      }),
    [SET_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        draft.question_list = action.payload.question;
        draft.answer_list = action.payload.answer;
        // console.log("🟡I'm question_list status: ", draft.question_list);
      }),
    [SET_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        // console.log("🟡I'm answer_list status: ", draft.answer_list);
      }),
    [POST_QNA]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  setProductAll,
  setProductAllAPI,
  setQuestion,
  setQnAAPI,
  setAnswer,
  postQnAAPI,
};

export { actionCreators };
