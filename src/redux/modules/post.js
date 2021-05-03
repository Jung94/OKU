import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// actions
//  이름만 먹여주기
const SET_POPULAR = "SET_POPULAR";
const SET_RECENT = "SET_RECENT";

// actionCreator
// 우리만의 DB
// 리듀서 실행하기 위한 이름
const setPopularProducts = createAction(SET_POPULAR, (popular) => ({ popular }));
const setRecentProducts = createAction(SET_RECENT, (recent) => ({ recent }));

//initialState
// 스토어라고 생각
const initialState = {
  popular_product: [],
  recent_product : [],
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
          console.log("데이터가 존재하지않습니다");
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
          dispatch(setRecentProducts(resp.data.productList));
          console.log(resp.data.productList);
          console.log(resp)
        } else {
          console.log("데이터가 존재하지않습니다");
        }
      })
      .catch((e) => console.error(e));
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
        console.log(draft.recent_product)
      }),
  },
  initialState
);

const actionCreators = {
  getPopularProductsAPI,
  getRecentProductsAPI
};

export { actionCreators };
