import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { API } from "shared/Api";

// actions
//  메인 상품 리스트
const SET_POPULAR = "SET_POPULAR";
const SET_RECENT = "SET_RECENT";
const SET_RECENT_PAGE = "SET_RECENT_PAGE"; //infinity scroll page
const SET_DEADLINE = "SET_DEADLINE";
const SET_RECOMMEND = "SET_RECOMMEND";

// 메인 카테고리
const SET_MAINCATEGORY = "SET_MAINCATEGORY";
const SET_MAINKEYWORD = "SET_MAINKEYWORD";
const CLEAR_CATEGORY = "CLEAR_CATEGORY";
// 카테고리 키워드저장
const SET_SUBCATEGORY = "SET_SUBCATEGORY";
const SET_SUBKEYWORD = "SET_SUBKEYWORD";

// 알림
const SET_ALERT = "SET_ALERT";

// actionCreator
// 메인 상품 리스트
const setPopularProducts = createAction(SET_POPULAR, (popular) => ({ popular }));
const setRecentProducts = createAction(SET_RECENT, (recent) => ({ recent }));
const setRecentPage = createAction(SET_RECENT_PAGE, (page) => ({ page }));
const setDeadlineProducts = createAction(SET_DEADLINE, (deadline) => ({ deadline }));
const setRecommendProducts = createAction(SET_RECOMMEND, (recommend) => ({ recommend }));

// 메인카테고리
const setProductMainCategory = createAction(SET_MAINCATEGORY, (mainCategory) => ({ mainCategory }));
const setMainKeyword = createAction(SET_MAINKEYWORD, (mainKeyword) => ({ mainKeyword }));
const setProductSubCategory = createAction(SET_SUBCATEGORY, (subCategory) => ({ subCategory }));
const setSubKeyword = createAction(SET_SUBKEYWORD, (subKeyword) => ({ subKeyword }));
const clearCategory = createAction(CLEAR_CATEGORY, () => ({}));

// 알림
const setAlert = createAction(SET_ALERT, (alert) => ({ alert }));

//initialState
const initialState = {
  popular_product: [],
  recent_product: [],
  lastId: false,
  setRecentPage: 0,
  deadline_product: [],
  recommned_product: [],

  main_category: [],
  sub_category: [],
  mainKeyword: "",
  subKeyword: "",

  all_alert: [],
};

// axios
// 실시간 인기상품
const PopularProduct_API = `${API}/product/popularlist`;

const getPopularProductsAPI = () => {
  return function (dispatch, getState, { history }) {
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
      .catch((e) => console.error(e));
  };
};

// 실시간 등록상품
const getRecentProductsAPI = () => {
  const RecentProduct_API = `${API}/product/recentlist?608c316e1a69364cd388967a`;

  return function (dispatch, getState, { history }) {
    axios
      .get(RecentProduct_API)
      .then((resp) => {
        dispatch(setRecentProducts(resp.data.productList[0]));
        console.log(resp);
      })
      .catch((e) => console.error(e));
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

// 마감임박상품
const DeadlineProduct_API = `${API}/product/deadline`;

const getDeadlineProductAPI = () => {
  return function (dispatch, getState, { history }) {
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
      .catch((e) => console.log(e));
  };
};

// MD 추천상품
const RecommendProduct_API = `${API}/product/recommend`;

const getRecommendProductAPI = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get(RecommendProduct_API)
      .then((resp) => {
        if (resp.data.result === "false") {
        } else if (resp.data.result) {
          dispatch(setRecommendProducts(resp.data.result));
        }
      })
      .catch((e) => console.log(e));
  };
};

// 대분류
const getProductMainCategotAPI = (mainKeyword) => {
  const ProductMainCategory_API = `${API}/product/Category/${mainKeyword}`;
  return function (dispatch, getState, { history }) {
    dispatch(clearCategory());
    dispatch(setMainKeyword(mainKeyword));
    axios
      .get(ProductMainCategory_API)
      .then((resp) => {
        dispatch(setProductMainCategory(resp.data.result));
        console.log("대분류", resp);
      })
      .catch((e) => {
        console.log(e);
        window.alert("카테고리 데이터가 없습니다");
      });
  };
};

// 중분류
const getProductSubCategotAPI = (mainKeyword, subKeyword) => {
  const ProductSubCategory_API = `${API}/product/Category/${mainKeyword}/${subKeyword}`;
  return function (dispatch, getState, { history }) {
    dispatch(clearCategory());
    dispatch(setSubKeyword(subKeyword));
    axios
      .get(ProductSubCategory_API)
      .then((resp) => {
        dispatch(setProductSubCategory(resp.data.result));
        console.log("중분류", resp);
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

// 알림
const _API = `${API}/bid/alert`;
const getAlertAPI = () => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    fetch(_API, {
      method: "GET",
      headers: {
        access_token: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
      //   if (res.notCheck === "true"){
      //   dispatch(setAlert(res.notCheck));
      //   console.log("미확인",res.notCheck);
      //   // unstructureObj.sort(function (a, b) {
      //   //   return a.createAt > b.createAt ? -1 : a.createAt < b.createAt ? 1 : 0;
      //   // }
      // } else if (res.alreadyCheck === "true") {
        dispatch(setAlert(res.alreadyCheck));
        dispatch(setAlert(res.notCheck));
        console.log("확인",res);
      // }
      })
      .catch((error) => {
        console.log("알림 문제", error);
      });
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
    [SET_ALERT]: (state, action) =>
      produce(state, (draft) => {
        // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
        draft.all_alert = action.payload.alert;
      }),
  },

  initialState
);
// 리듀서 적기 디스패치, 유즈스테이트 하기
const actionCreators = {
  getPopularProductsAPI,
  getRecentProductsAPI,

  // getRecentPage,
  getDeadlineProductAPI,
  getRecommendProductAPI,

  clearCategory,
  getProductMainCategotAPI,
  getProductSubCategotAPI,
  getAlertAPI,
};

export { actionCreators };
