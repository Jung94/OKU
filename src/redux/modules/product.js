import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { API } from "shared/Api";

// actions
const LOADING = "LOADING";
const SET_PRODUCT_ALL = "SET_PRODUCT_ALL";
const SET_QNA = "SET_QNA";
const ADD_QUESTION = "ADD_QUESTION";
const ADD_ANSWER = "ADD_ANSWER";

//actionCreators
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const setProductAll = createAction(SET_PRODUCT_ALL, (pid, product_detail) => ({ pid, product_detail }));
const setQnA = createAction(SET_QNA, (question) => ({ question }));
const addQuestion = createAction(ADD_QUESTION, (new_question) => ({ new_question }));
const addAnswer = createAction(ADD_ANSWER, (qid, new_answer) => ({ qid, new_answer }));

const initialState = {
  is_loading: false,
  product_detail: [],
  qna_list: [],
  productId: null,
};

const _idTest = "60956601e87c8e7c77e86771";

const setProductAllAPI = (_id) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    // 추후에 product 클릭 id를 가져와야함
    // _id
    fetch(`${API}/product/detail/${_idTest}`, {
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
          dispatch(setProductAll(res.result._id, res.result));
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
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) {
          const _result = res.result;
          const unstructureObj = [];
          _result.forEach((r) => {
            // 비구조화 할당
            let {
              buyernickname,
              buyerprofile,
              sellernickname,
              QnA: { contents, answer, createdAt, updatedAt, productId, sellerId, userId, _id },
            } = r;
            let extracted = { buyernickname, buyerprofile, sellernickname, contents, answer, createdAt, updatedAt, productId, sellerId, userId, _id };
            unstructureObj.push({ ...extracted });
            //최신순으로 정렬
            unstructureObj.sort(function (a, b) {
              return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0;
            });
          });
          dispatch(setQnA(unstructureObj));
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

const addQuestionAPI = (_id, _contents, sellerunique, sellerNickname, createdAt) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    const access_token = localStorage.getItem("access_token");
    const nickname = localStorage.getItem("nickname");
    const newQuestion = JSON.stringify({ sellerunique: sellerunique, contents: _contents });
    const draft = {
      buyernickname: nickname,
      sellernickname: sellerNickname,
      contents: _contents,
      createdAt: createdAt,
      productId: _id,
      sellerId: sellerunique,
    };
    fetch(`${API}/product/quest/${_idTest}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: `${access_token}`,
      },
      body: newQuestion,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) {
          dispatch(addQuestion(draft));
          dispatch(loading(false));
        } else {
          console.log("해당 데이터가 준비되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.log("addQuestionAPI에 문제가 있습니다.", error);
      });
  };
};

const addAnswerAPI = (_id, _answer, sellerId, updatedAt) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    const access_token = localStorage.getItem("access_token");
    const nickname = localStorage.getItem("nickname");
    const newQuestion = JSON.stringify({ sellerunique: sellerId, contents: _answer });
    const draft = {
      sellernickname: nickname,
      answer: _answer,
      updatedAt: updatedAt,
      productId: _id,
      sellerId: sellerId,
    };
    fetch(`${API}/product/answer/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: `${access_token}`,
      },
      body: newQuestion,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) {
          dispatch(addAnswer(_id, draft));
          dispatch(loading(false));
        } else {
          console.log("판매자가 아니거나, 답변 등록에 실패하였습니다.");
          dispatch(loading(false));
        }
      })
      .catch((error) => {
        console.log("addAnswerAPI에 문제가 있습니다.", error);
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
        draft.productId = action.payload.pid;
        draft.product_detail = action.payload.product_detail;
        // console.log("🟡I'm product_detail status: ", draft.product_detail);
      }),
    [SET_QNA]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        draft.qna_list = action.payload.question;
        // console.log("🟡I'm qna_list status: ", draft.qna_list);
      }),
    [ADD_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        // console.log("🟡", action.payload.new_question);
        // unshift: 데이터를 배열 맨 앞에 넣어줌.
        draft.qna_list.unshift(action.payload.new_question);
      }),
    [ADD_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        if (!draft.qna_list) {
          return;
        }
        draft.is_loading = action.payload.is_loading;
        let idx = draft.qna_list.findIndex((e) => e._id === action.payload.qid);
        console.log("🟡", idx); // idx는 잘나오고
        console.log("🟡", draft.qna_list[idx]); // 이건 proxy로 나옴. 무슨 의미?
        draft.qna_list[idx] = { ...draft.qna_list[idx], ...action.payload.new_answer };
      }),
  },
  initialState
);

const actionCreators = {
  setProductAll,
  setProductAllAPI,
  setQnA,
  setQnAAPI,
  addQuestionAPI,
  addAnswerAPI,
};

export { actionCreators };
