import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { API } from "shared/Api";

// actions
const LOADING = "LOADING";
const GET_LIKE = "GET_LIKE"; //좋아요 DB 불러오기
const ADD_LIKE = "ADD_LIKE"; //좋아요 추가하기
const DELETE_LIKE = "DELETE_LIKE"; //좋아요 삭제하기

//actionCreators
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const getLike = createAction(GET_LIKE, (like) => ({ like }));
const addLike = createAction(ADD_LIKE, (like) => ({ like }));
const deleteLike = createAction(DELETE_LIKE, (productId) => ({ productId }));

const initialState = {
  is_loading: false,
  is_like: false,
  like_list: [],
  productId: "",
};

const getLikeAPI = () => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    dispatch(loading(true));
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
          dispatch(getLike(likeResult));
          console.log(likeResult);
          dispatch(loading(false));
        } else {
          console.log(res.result);
          dispatch(loading(false));
        }
      })
      .catch((error) => {
        console.log("getLikeAPI에 문제가 있습니다.", error);
      });
  };
};

const addLikeAPI = (_id) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    const access_token = localStorage.getItem("access_token");
    fetch(`${API}/product/pick/${_id}`, {
      method: "POST",
      headers: {
        access_token: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(addLike());
        dispatch(loading(false));
        window.alert("찜 완료!");
      })
      .catch((error) => {
        console.log("addLikeAPI에 문제가 있습니다.", error);
      });
  };
};

const deleteLikeAPI = (_id) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
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
          dispatch(loading(false));
          window.alert("찜 해제!");
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
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        // console.log("🟡I'm loading status: ", draft.is_loading);
      }),
    [GET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.like === []) {
          draft.is_like = false;
          draft.like_list = action.payload.like;
        } else {
          draft.is_like = true;
          draft.like_list = action.payload.like;
        }
      }),
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.is_like = true;
      }),
    [DELETE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.is_like = false;
        // let idx = draft.like_list.findIndex((l) => l.product.coffeeId === action.payload.coffeeId);
        // draft.like_list.splice(idx, 1);
        // draft.is_like = false;
      }),
  },
  initialState
);

const actionCreators = {
  getLikeAPI,
  addLikeAPI,
  deleteLikeAPI,
};

export { actionCreators };
