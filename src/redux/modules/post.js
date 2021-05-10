import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// actions
//  메인 상품 리스트
const SET_POPULAR = "SET_POPULAR";
const SET_RECENT = "SET_RECENT";
const SET_DEADLINE = "SET_DEADLINE";
const SET_RECOMMEND = "SET_RECOMMEND";

// 메인 카테고리
const SET_MAINCATEGORY = "SET_MAINCATEGORY";
const SET_MAINKEYWORD = "SET_MAINKEYWORD";
// 카테고리 키워드저장
const SET_SUBCATEGORY = "SET_SUBCATEGORY";
const SET_SUBKEYWORD = "SET_SUBKEYWORD";


// actionCreator
// 메인 상품 리스트
const setPopularProducts = createAction(SET_POPULAR, (popular) => ({ popular }));
const setRecentProducts = createAction(SET_RECENT, (recent) => ({ recent }));
const setDeadlineProducts = createAction(SET_DEADLINE, (deadline) => ({ deadline }));
const setRecommendProducts = createAction(SET_RECOMMEND, (recommend) => ({ recommend }));

// 메인카테고리
const setProductMainCategory = createAction(SET_MAINCATEGORY, (mainCategory) => ({ mainCategory }));
const setMainKeyword = createAction(SET_MAINKEYWORD, (mainKeyword) => ({ mainKeyword }));
const setProductSubCategory = createAction(SET_SUBCATEGORY, (subCategory) => ({ subCategory }));
const setSubKeyword = createAction(SET_SUBKEYWORD, (subKeyword) => ({ subKeyword }));

//initialState
const initialState = {
  popular_product: [],
  recent_product: [],
  deadline_product: [],
  recommned_product: [],

  main_category: [],
  sub_category: [],
  mainKeyword : '',
  subCategory : '',
};

// axios
// 실시간 인기상품
const PopularProduct_API = "http://3.35.137.38/product/popularlist";

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
const RecentProduct_API = "http://3.35.137.38/product/recentlist?608c316e1a69364cd388967a";

const getRecentProductsAPI = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get(RecentProduct_API)
      .then((resp) => {
        if (resp.data.productList) {
          // 스토어에 보내주기
          dispatch(setRecentProducts(resp.data.productList[0]));
          console.log(resp.data.productList[0][0].img[0]);
        } else {
          window.alert("실시간 등록 상품 데이터가 없습니다");
        }
      })
      .catch((e) => console.error(e));
  };
};

// 마감임박상품
const DeadlineProduct_API = "http://3.35.137.38/product/deadline";

const getDeadlineProductAPI = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get(DeadlineProduct_API)
      .then((resp) => {
        if (resp.data.result === "empty") {
        }
        else if (resp.data.result) {
          dispatch(setDeadlineProducts(resp.data.result));
        } else {
          window.alert("마감 임박 상품 데이터가 없습니다");
        }
      })
      .catch((e) => console.log(e));
  };
};

// MD 추천상품
const RecommendProduct_API = "http://3.35.137.38/product/recommend";

const getRecommendProductAPI = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get(RecommendProduct_API)
      .then((resp) => {
        if (resp.data.result === "false"){
        }
        else if (resp.data.result) {
          dispatch(setRecommendProducts(resp.data.result));
        } else {
          window.alert("MD추천상품 데이터가 없습니다");
        }
      })
      .catch((e) => console.log(e));
  };
};

// 대분류
const getProductMainCategotAPI = (mainCategory) => {
  const ProductMainCategory_API = `http://3.35.137.38/product/Category/${mainCategory}`;
  return function (dispatch, getState, { history }) {
    dispatch(setMainKeyword(mainCategory))
    axios
      .get(ProductMainCategory_API)
      .then((resp) => {
        dispatch(setProductMainCategory(resp.data.result));
      })
      .catch((e) => {console.log(e);
    window.alert("카테고리 데이터가 없습니다")});
  };
};

// 중분류
const getProductSubCategotAPI = (mainCategory ,subCategory) => {
  const ProductSubCategory_API = `http://3.35.137.38/product/Category/${mainCategory}/${subCategory}`;
  return function (dispatch, getState, { history }) {
    dispatch(setSubKeyword(subCategory))
    axios
      .get(ProductSubCategory_API)
      .then((resp) => {
        dispatch(setProductSubCategory(resp.data.result));
      })
      .catch((e) => {console.log(e)
    window.alert("카테고리 데이터가 없습니다")});
  };
};

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
        draft.sain_category = action.payload.subCategory;
      }),
  },
  initialState
);
// 리듀서 적기 디스패치, 유즈스테이트 하기
const actionCreators = {
  getPopularProductsAPI,
  getRecentProductsAPI,
  getDeadlineProductAPI,
  getRecommendProductAPI,

  getProductMainCategotAPI,
  getProductSubCategotAPI,
};

export { actionCreators };
