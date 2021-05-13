import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { API } from "shared/Api";

import { actionCreators as loadingActions } from "redux/modules/loading";

// actions
const GET_LIKE = "GET_LIKE"; //좋아요 있는지 확인하기
const ADD_LIKE = "ADD_LIKE"; //좋아요 추가하기
const DELETE_LIKE = "DELETE_LIKE"; //좋아요 삭제하기
const GET_MY_LIKE_LIST = "GET_MY_LIKE_LIST"; // 마이페이지 좋아요 리스트 가져오기
const GET_LIKE_LIST = "GET_LIKE_LIST"; // 모든 좋아요 리스트

//actionCreators
const getLike = createAction(GET_LIKE, (likeOrNot) => ({ likeOrNot }));
const addLike = createAction(ADD_LIKE, (id, likelist) => ({ id, likelist }));
const deleteLike = createAction(DELETE_LIKE, (productId) => ({ productId }));
const getMyLikeList = createAction(GET_MY_LIKE_LIST, (like_list) => ({ like_list }));
const getLikeList = createAction(GET_LIKE_LIST, (like_list) => ({ like_list }));

const initialState = {
  is_loading: false,
  is_like: false,
  my_like_list: [],
  like_list: [],
  productId: 0,
};

const getLikeAPI = (_id) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/user/pick`, {
      method: "GET",
      headers: {
        access_token: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.okay && res.result.length > 0) {
          // 유저 한명당 좋아요 개수 제한 없는 상태
          // 배열 그대로 받으면 좋아요가 여러개임
          // 중복 productId 제거하기
          // console.log(_id);
          const likeResult = res.result.filter((r, idx) => {
            return (
              res.result.findIndex((_r, _idx) => {
                return r.productId === _r.productId;
              }) === idx
            );
          });
          const checkLike = (r) => {
            if (r.productId === _id) {
              return true;
            }
          };
          const likeOrNot = likeResult.some(checkLike);
          dispatch(getLike(likeOrNot));
        } else {
        }
      })
      .catch((error) => {
        console.log("getLikeAPI에 문제가 있습니다.", error);
      });
  };
};

const getMyLikeListAPI = () => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/user/pick`, {
      method: "GET",
      headers: {
        access_token: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.okay && res.result.length > 0) {
          // 유저 한명당 좋아요 개수 제한 없는 상태
          // 배열 그대로 받으면 좋아요가 여러개임
          // 중복 productId 제거하기
          const likeResult = res.result.filter((r, idx) => {
            return (
              res.result.findIndex((_r, _idx) => {
                return r.productId === _r.productId;
              }) === idx
            );
          });
          // 4개만 받아오기
          dispatch(getLikeList(likeResult));
          if (likeResult.length === 0) {
            dispatch(getMyLikeList([]));
          } else if (likeResult.length < 5) {
            dispatch(getMyLikeList(likeResult));
          } else {
            dispatch(getMyLikeList(likeResult.slice(0, 4)));
          }
        } else {
        }
      })
      .catch((error) => {
        console.log("getMyLikeListAPI에 문제가 있습니다.", error);
      });
  };
};

const addLikeAPI = (_id) => {
  return function (dispatch, getState, { history }) {
    // dispatch(loadingActions.loading(true));
    let likelist = getState().like.like_list;
    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/product/pick/${_id}`, {
      method: "POST",
      headers: {
        access_token: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(addLike(_id, likelist));
        dispatch(loadingActions.loading(false));
      })
      .catch((error) => {
        console.log("addLikeAPI에 문제가 있습니다.", error);
      });
  };
};

const deleteLikeAPI = (_id) => {
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));
    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/user/pick/${_id}`, {
      method: "DELETE",
      headers: {
        access_token: access_token,
      },
      body: {
        productId: _id,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) {
          dispatch(deleteLike(_id));
          dispatch(loadingActions.loading(false));
        } else {
          console.log("result.ok is NOT ok.");
        }
      })
      .catch((error) => {
        console.log("deleteLikeAPI에 문제가 있습니다.", error);
      });
  };
};

export default handleActions(
  {
    [GET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.is_like = action.payload.likeOrNot;
      }),
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.is_like = true;
        console.log(action.payload.id);
        console.log(action.payload.likelist);
        // draft.my_like_list.push({ productId: action.payload.id });
        // console.log(draft.my_like_list);
        // console.log(action.payload.id);
      }),
    [DELETE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.is_like = false;
        draft.my_like_list.filter((r) => r.productId !== action.payload.id);
      }),
    [GET_MY_LIKE_LIST]: (state, action) =>
      produce(state, (draft) => {
        if (!action.payload.like_list) {
          return;
        }
        draft.my_like_list = action.payload.like_list;
      }),
    [GET_LIKE_LIST]: (state, action) =>
      produce(state, (draft) => {
        if (!action.payload.like_list) {
          return;
        }
        draft.like_list = action.payload.like_list;
        console.log(draft.like_list);
      }),
  },
  initialState
);

const actionCreators = {
  getLike,
  getLikeAPI,
  addLikeAPI,
  deleteLikeAPI,
  getMyLikeList,
  getMyLikeListAPI,
};

export { actionCreators };
