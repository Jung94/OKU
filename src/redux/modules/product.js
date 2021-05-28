import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { API } from "shared/Api";
import axios from "axios";

import { actionCreators as loadingActions } from "redux/modules/loading";

import { actionCreators as bidActions } from "redux/modules/bid";
import { actionCreators as likeActions } from "redux/modules/like";
import { actionCreators as mypageActions } from "redux/modules/mypage";

// actions
const SET_PRODUCT_ALL = "SET_PRODUCT_ALL";
const SET_RELATED = "SET_RELATED";
const SET_QNA = "SET_QNA";
const ADD_QUESTION = "ADD_QUESTION";
const ADD_ANSWER = "ADD_ANSWER";
const SOON_ANSWER = "SOON_ANSWER";

//actionCreators
const setProductAll = createAction(SET_PRODUCT_ALL, (pid, product_detail) => ({ pid, product_detail }));
const setRelated = createAction(SET_RELATED, (related) => ({ related }));
const setQnA = createAction(SET_QNA, (question) => ({ question }));
const addQuestion = createAction(ADD_QUESTION, (questId, new_question) => ({ questId, new_question }));
const addAnswer = createAction(ADD_ANSWER, (qid, new_answer) => ({ qid, new_answer }));
const soonAnswer = createAction(SOON_ANSWER, (soonAnswer) => ({ soonAnswer }));

const initialState = {
  product_detail: {},
  qna_list: [],
  productId: null,
  questId: "",
  related: [],
  related_mobile: [],
  new_qna: {},
};

const _idTest = "609566ecc795947ca9a342bd";

const setProductAllAPI = (_id) => {
  return function (dispatch, getState, { history }) {
    // 추후에 product 클릭 id를 가져와야함
    // _id
    fetch(`${API}/product/detail/${_id}`, {
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
        // 데이터가 okay / result / seller로 되있다.
        // get할때 response 항상 어떻게 오는지 확인하기
        if (res.okay) {
          // 프로덕트 디테일 세팅시 필요한 api 한꺼번에 실행 (immer 활용하기 일환일까?-> 관계없는애들같기도)
          // => 로딩 액션 여러번 실행되지 않게 됨
          const all = { ...res.result, profileImg: res.seller.profileImg };
          console.log("🚩상품디테일🚩", all);
          dispatch(setProductAll(res.result._id, all));
          dispatch(bidActions.setBidAPI(_id, res.result.lowBid));
          dispatch(setQnAAPI(_id));
          dispatch(likeActions.getLikeAPI(_id));
          dispatch(setRelatedAPI(_id, res.result.smallCategory, res.result.tag));
          dispatch(mypageActions.setProfileAPI());
        } else {
          console.log("response is not ok.");
        }
      })
      .catch((error) => {
        console.log("setProductAllAPI에 문제가 있습니다.", error);
      });
  };
};

// 구버전
const bigCategoryRelatedAPI = (_id, keyword) => {
  return function (dispatch, getState, { history }) {
    // const page = getState().movie.search_page;
    fetch(`${API}/product/Category/${keyword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.result);
        if (!res.result) {
          return;
        } else {
          const filtered = res.result.filter((r) => r._id !== _id);
          dispatch(setRelated(filtered));
          // console.log(filtered);
        }
      })
      .catch((err) => console.log("bigCategoryRelatedAPI 문제가 있습니다.", err));
  };
};

// 신버전
const setRelatedAPI = (_id, smallCategory, tag) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `${API}/product/relate/`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: { smallCategory: smallCategory, tag: tag },
    })
      .then((res) => {
        if (!res.data.okay) {
          return;
        } else {
          const filtered = res.data.result.filter((r) => r._id !== _id);
          dispatch(setRelated(filtered));
          // console.log(filtered);
        }
      })
      .catch((err) => console.log("setRelatedAPI 문제가 있습니다.", err));
  };
};

const setQnAAPI = (_id) => {
  return function (dispatch, getState, { history }) {
    fetch(`${API}/product/quest/${_id}`, {
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
    dispatch(mypageActions.setProfileAPI());
    const userprofile = getState().mypage.user.profile;
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
      profileImg: userprofile,
    };
    fetch(`${API}/product/quest/${_id}`, {
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
          console.log(res);
          console.log(res.questId);
          console.log("문의글이 등록되었습니다.");
          dispatch(addQuestion(res.questId, draft));
          // 공부 포인트!
        } else {
          console.log("okay is false");
        }
      })
      .catch((error) => {
        console.log("addQuestionAPI에 문제가 있습니다.", error);
      });
  };
};

const addAnswerAPI = (_id, _answer, sellerId, updatedAt) => {
  // dispatch(mypageActions.setProfileAPI());
  return function (dispatch, getState, { history }) {
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
          dispatch(soonAnswer(draft));
        } else {
          console.log("새로고침을 하여 문의글id를 받아야하거나, 판매자가 아니거나, 답변 등록에 실패하였습니다.");
        }
      })
      .catch((error) => {
        console.log("addAnswerAPI에 문제가 있습니다.", error);
      });
  };
};

export default handleActions(
  {
    [SET_PRODUCT_ALL]: (state, action) =>
      produce(state, (draft) => {
        draft.productId = action.payload.pid;
        draft.product_detail = action.payload.product_detail;
      }),
    [SET_RELATED]: (state, action) =>
      produce(state, (draft) => {
        const _related = action.payload.related;
        const _onlyFour = _related.sort(() => Math.random() - 0.5);
        draft.related = _onlyFour.slice(0, 4);
        draft.related_mobile = _onlyFour.slice(0, 3);
      }),
    [SET_QNA]: (state, action) =>
      produce(state, (draft) => {
        draft.qna_list = action.payload.question;
      }),
    [ADD_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        // unshift: 데이터를 배열 맨 앞에 넣어줌.
        draft.qna_list.unshift(action.payload.new_question);
        console.log(action.payload.new_question);
        draft.questId = action.payload.questId;
      }),
    [ADD_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        if (!draft.qna_list) {
          return;
        }
        let idx = draft.qna_list.findIndex((e) => e._id === action.payload.qid);
        // console.log("🟡", draft.qna_list[idx]); // 이건 proxy로 나옴. 무슨 의미?
        draft.qna_list[idx] = { ...draft.qna_list[idx], ...action.payload.new_answer };
      }),
    [SOON_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        draft.new_qna = action.payload.soonAnswer;
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

  setRelated,
  setRelatedAPI,
};

export { actionCreators };
