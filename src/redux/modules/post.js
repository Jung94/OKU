import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// actions
//  이름만 먹여주기
const SET_POPULAR = "SET_POPULAR";
const SET_RECENT = "SET_RECENT";
const SET_DEADLINE = "SET_DEADLINE";

// actionCreator
// 우리만의 DB
// 리듀서 실행하기 위한 이름
const setPopularProducts = createAction(SET_POPULAR, (popular) => ({ popular }));
const setRecentProducts = createAction(SET_RECENT, (recent) => ({ recent }));
const setDeadlineProducts = createAction(SET_DEADLINE, (deadline) => ({ deadline}));


//initialState
// 스토어라고 생각
const initialState = {
  popular_product: [],
  recent_product : [],
  deadline_product : [],
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
          console.log(resp.data.result);
        } else {
          console.log("실시간 인기상품 데이터가 없습니다");
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
          console.log(resp)
        } else {
          console.log("데이터가 존재하지않습니다");
        }
      })
      .catch((e) => console.error(e));
  };
};

// 마감임박상품
const DeadlineProduct_API = "http://3.35.137.38/product/deadlinelist";

const getDeadlineProductAPI = () => {
  return function (dispatch, getState, {history}) {
    axios 
      .get(DeadlineProduct_API)
      .then((resp)=>{
        dispatch(setDeadlineProducts(resp));
          console.log(resp);
      })
      .catch((e) => console.log(e));
      window.alert("오류입니다");
  }
} 



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
        console.log(draft.recent_product)
      }),
      [SET_DEADLINE]: (state, action) =>
      produce(state, (draft) => {
        // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
        draft.deadline_product = action.payload.deadline;
        console.log(draft.deadline_product)
      }),
  },
  initialState
);
// 리듀서 적기 디스패치, 유즈스테이트 하기
const actionCreators = {
  getPopularProductsAPI,
  getRecentProductsAPI,
  getDeadlineProductAPI
};

export { actionCreators };
