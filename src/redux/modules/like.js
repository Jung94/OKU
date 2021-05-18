import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { API } from "shared/Api";

import { actionCreators as loadingActions } from "redux/modules/loading";

// actions
const GET_LIKE = "GET_LIKE"; //좋아요 있는지 확인하기
const ADD_LIKE = "ADD_LIKE"; //좋아요 추가하기
const DELETE_LIKE = "DELETE_LIKE"; //좋아요 삭제하기
const GET_MY_LIKE_LIST = "GET_MY_LIKE_LIST"; // 마이페이지 좋아요 리스트 가져오기

//actionCreators
const getLike = createAction(GET_LIKE, (id, likelist) => ({ id, likelist }));
const addLike = createAction(ADD_LIKE, (id, likelist) => ({ id, likelist }));
const deleteLike = createAction(DELETE_LIKE, (id, likelist) => ({ id, likelist }));
const getMyLikeList = createAction(GET_MY_LIKE_LIST, (likelist) => ({ likelist }));

const initialState = {
  is_like: false,
  like_list: [],
  productId: 0,
  my_like_list: [],
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
          const likeResult = res.result.filter((r, idx) => {
            return (
              res.result.findIndex((_r, _idx) => {
                return r.productId === _r.productId;
              }) === idx
            );
          });
          dispatch(getLike(_id, likeResult));
        } else {
        }
      })
      .catch((error) => {
        console.log("getLikeAPI에 문제가 있습니다.", error);
      });
  };
};

const addLikeAPI = (_id) => {
  return function (dispatch, getState, { history }) {
    const _like_list = getState().like.like_list;
    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/product/pick/${_id}`, {
      method: "POST",
      headers: {
        access_token: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(addLike(_id, _like_list));
        // 디테일 페이지 확인용
      })
      .catch((error) => {
        console.log("addLikeAPI에 문제가 있습니다.", error);
      });
  };
};

const deleteLikeAPI = (_id) => {
  return function (dispatch, getState, { history }) {
    const _like_list = getState().like.like_list;
    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/user/pick/${_id}`, {
      method: "DELETE",
      headers: {
        access_token: access_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) {
          dispatch(deleteLike(_id, _like_list));
          // 디테일 페이지 확인용
        } else {
          console.log("result.ok is NOT ok.");
        }
      })
      .catch((error) => {
        console.log("deleteLikeAPI에 문제가 있습니다.", error);
      });
  };
};

// 마이페이지용
const getMyLikeListAPI = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));
    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/user/pick`, {
      method: "GET",
      headers: {
        access_token: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("zxcqweqwewqedf", res);
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
          if (likeResult.length <= 10) {
            dispatch(getMyLikeList(likeResult));
          } else {
            dispatch(getMyLikeList(likeResult.slice(0, 10)));
          }
        } else {
          // 아무것도 없을 때도 디스패치..!
          dispatch(getMyLikeList([]));
        }
      })
      .catch((error) => {
        console.log("getMyLikeListAPI에 문제가 있습니다.", error);
      })
      .finally(() => {
        dispatch(loadingActions.loading(false));
      });
  };
};

export default handleActions(
  {
    [GET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        // 찜 리스트
        draft.like_list = action.payload.likelist;
        // console.log(draft.like_list); // api랑 직접적으로 연결된거임.. 다른 한다리 건넌 draft는 proxy로 뜬다..
        // 디테일 페이지 찜 되어 있는지 아닌지 확인용
        let checkLike = action.payload.likelist;
        draft.is_like = checkLike.some((c) => c.productId === action.payload.id);
      }),
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.like_list = action.payload.likelist; // 관리중인 좋아요 리스트 가져오고
        draft.like_list.push({ productId: action.payload.id }); // 좋아요한 아이디를 넣어준다
        // 디테일 페이지 좋아요 유무
        draft.is_like = true;
      }),
    [DELETE_LIKE]: (state, action, getState) =>
      produce(state, (draft) => {
        draft.like_list = action.payload.likelist; // 관리중인 좋아요 리스트 가져오고
        draft.like_list.pop((r) => r.productId === action.payload.id);
        // 디테일 페이지 좋아요 유무
        draft.is_like = false;
      }),

    // 마이페이지용
    [GET_MY_LIKE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.my_like_list = action.payload.likelist;
      }),
  },
  initialState
);

const actionCreators = {
  getLike,
  getLikeAPI,
  addLikeAPI,
  deleteLike,
  deleteLikeAPI,
  getMyLikeList,
  getMyLikeListAPI,
};

export { actionCreators };
