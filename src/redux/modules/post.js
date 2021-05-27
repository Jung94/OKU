import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { API } from "shared/Api";

import { actionCreators as loadingActions } from "redux/modules/loading";

// actions
//  메인 상품 리스트
const SET_POPULAR = "SET_POPULAR";
const SET_RECENT = "SET_RECENT";
const SET_RECENT_PAGE = "SET_RECENT_PAGE"; //infinity scroll page
const SET_DEADLINE = "SET_DEADLINE";
const SET_RECOMMEND = "SET_RECOMMEND";

// 모든상품
const SET_ALL = "SET_ALL";

// 메인 카테고리
const SET_MAINCATEGORY = "SET_MAINCATEGORY";
const SET_MAINKEYWORD = "SET_MAINKEYWORD";
const CLEAR_CATEGORY = "CLEAR_CATEGORY";
// 카테고리 키워드저장
const SET_SUBCATEGORY = "SET_SUBCATEGORY";
const SET_SUBKEYWORD = "SET_SUBKEYWORD";

// actionCreator
// 메인 상품 리스트
const setPopularProducts = createAction(SET_POPULAR, (popular) => ({ popular }));
const setRecentProducts = createAction(SET_RECENT, (recent) => ({ recent }));
const setDeadlineProducts = createAction(SET_DEADLINE, (deadline) => ({ deadline }));
const setRecommendProducts = createAction(SET_RECOMMEND, (recommend) => ({ recommend }));

const setAllProducts = createAction(SET_ALL, (all) => ({ all }));

// 메인카테고리
const setProductMainCategory = createAction(SET_MAINCATEGORY, (mainCategory) => ({ mainCategory }));
const setMainKeyword = createAction(SET_MAINKEYWORD, (mainKeyword) => ({ mainKeyword }));
const setProductSubCategory = createAction(SET_SUBCATEGORY, (subCategory) => ({ subCategory }));
const setSubKeyword = createAction(SET_SUBKEYWORD, (subKeyword) => ({ subKeyword }));
const clearCategory = createAction(CLEAR_CATEGORY, () => ({}));

//initialState
const initialState = {
  popular_product: [],
  recent_product: [],
  lastId: false,
  setRecentPage: 0,
  deadline_product: [],
  recommned_product: [],
  all_product: [],

  main_category: [],
  sub_category: [],
  mainKeyword: "",
  subKeyword: "",
};

// axios
// 실시간 인기상품
const PopularProduct_API = `${API}/product/popularlist`;

const getPopularProductsAPI = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));

    axios
      .get(PopularProduct_API)
      .then((resp) => {
        if (resp.data.okay) {
          // 스토어에 보내주기
          dispatch(setPopularProducts(resp.data.result));
        } else {
          window.alert("실시간 인기상품 데이터가 없습니다");
        }
      })
      .catch((e) => console.error(e))
      .finally(() => dispatch(loadingActions.loading(false)));
  };
};

// 실시간 등록상품
const getRecentProductsAPI = () => {
  const RecentProduct_API = `${API}/product/recentlist?608c316e1a69364cd388967a`;

  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));
    axios
      .get(RecentProduct_API)
      .then((resp) => {
        dispatch(setRecentProducts(resp.data.productList[0]));
        // console.log(resp);
      })
      .catch((e) => console.error(e))
      .finally(() => dispatch(loadingActions.loading(false)));
  };
};

// 실시간 등록상품 인피니티스크롤
// const getRecentPage = (_id) => {
//   const RecentPage_API = `http://3.35.137.38/product/recentlist?lastId=${_id}`;

//   return function (dispatch, getState, { history }) {
//     // const page = getState().post.recent_page
//     axios
//       .get(RecentPage_API)
//       .then((resp) => {
//         dispatch(setRecentPage(resp));
//       })
//       .catch((e) => console.error(e));
//   };
// };

// 모든 아이템
const AllProducts_API = `${API}/product/all`;

const getAllProductAPI = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));
    axios
      .get(AllProducts_API)
      .then((resp) => {
        dispatch(setAllProducts(resp.data.result));
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(loadingActions.loading(false)));
  };
};

// 마감임박상품
const DeadlineProduct_API = `${API}/product/deadline`;

const getDeadlineProductAPI = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));
    axios
      .get(DeadlineProduct_API)
      .then((resp) => {
        if (resp.data.result === "empty") {
        } else if (resp.data.result) {
          dispatch(setDeadlineProducts(resp.data.result));
        } else {
          window.alert("마감 임박 상품 데이터가 없습니다");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(loadingActions.loading(false)));
  };
};

// MD 추천상품
const RecommendProduct_API = `${API}/product/recommend`;

const getRecommendProductAPI = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));
    axios
      .get(RecommendProduct_API)
      .then((resp) => {
        if (resp.data.result === "false") {
        } else if (resp.data.result) {
          dispatch(setRecommendProducts(resp.data.result));
        }
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(loadingActions.loading(false)));
  };
};

// 대분류
const getProductMainCategotAPI = (mainKeyword) => {
  const ProductMainCategory_API = `${API}/product/Category/${mainKeyword}`;
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));
    dispatch(clearCategory());
    dispatch(setMainKeyword(mainKeyword));
    axios
      .get(ProductMainCategory_API)
      .then((resp) => {
        dispatch(setProductMainCategory(resp.data.result));
        // console.log("대분류", resp);
      })
      .catch((e) => {
        console.log(e);
        window.alert("카테고리 데이터가 없습니다");
      })
      .finally(() => dispatch(loadingActions.loading(false)));
  };
};

// 중분류
const getProductSubCategotAPI = (mainKeyword, subKeyword) => {
  const ProductSubCategory_API = `${API}/product/Category/${mainKeyword}/${subKeyword}`;
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));
    dispatch(clearCategory());
    dispatch(setSubKeyword(subKeyword));
    axios
      .get(ProductSubCategory_API)
      .then((resp) => {
        dispatch(setProductSubCategory(resp.data.result));
        // console.log("중분류", resp);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => dispatch(loadingActions.loading(false)));
  };
};

// const Alert_API = "http://3.35.137.38/bid/alert";
// const getAlertAPI = () => {
//   return function (dispatch, getState, { history }) {
//     axios
//     .get(Alert_API)
//       .then((resp) => {
//         dispatch(setAlert(resp.data));
//       })
//       .catch((e) => console.log(e));
//   };
// };

// Reducer 를 실행하기위해 액션크리에이터
export default handleActions(
  {
    [SET_POPULAR]: (state, action) =>
      produce(state, (draft) => {
        // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
        draft.popular_product = action.payload.popular;
      }),
    [SET_RECENT]: (state, action) =>
      produce(state, (draft) => {
        // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
        draft.recent_product = action.payload.recent;
      }),
    [SET_ALL]: (state, action) =>
      produce(state, (draft) => {
        // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
        draft.all_product = action.payload.all;
      }),
    [SET_RECENT_PAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.recent_page = action.payload.page;
      }),
    [SET_DEADLINE]: (state, action) =>
      produce(state, (draft) => {
        // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
        draft.deadline_product = action.payload.deadline;
      }),
    [SET_RECOMMEND]: (state, action) =>
      produce(state, (draft) => {
        // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
        draft.recommend_product = action.payload.recommend;
      }),
    [SET_MAINCATEGORY]: (state, action) =>
      produce(state, (draft) => {
        // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
        draft.main_category = action.payload.mainCategory;
      }),
    [SET_SUBCATEGORY]: (state, action) =>
      produce(state, (draft) => {
        // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
        draft.sub_category = action.payload.subCategory;
      }),
    [CLEAR_CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
        draft.sub_category = [];
      }),
    [SET_MAINKEYWORD]: (state, action) =>
      produce(state, (draft) => {
        // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
        draft.mainKeyword = action.payload.mainKeyword;
      }),
    [SET_SUBKEYWORD]: (state, action) =>
      produce(state, (draft) => {
        // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
        draft.subKeyword = action.payload.subKeyword;
      }),
  },

  initialState
);

// 리듀서 적기 디스패치, 유즈스테이트 하기
const actionCreators = {
  getPopularProductsAPI,
  getRecentProductsAPI,
  getAllProductAPI,
  getDeadlineProductAPI,
  getRecommendProductAPI,

  clearCategory,
  getProductMainCategotAPI,
  getProductSubCategotAPI,
};

export { actionCreators };
