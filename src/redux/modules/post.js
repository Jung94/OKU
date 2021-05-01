import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// actions
//  이름만 먹여주기
const SET_POPULAR = "SET_POPULAR";

// actionCreator
// 우리만의 DB
// 리듀서 실행하기 위한 이름
const setProducts = createAction(SET_POPULAR, (answer) => ({ answer }));

//initialState
// 스토어라고 생각
const initialState = {
  product: [],
};

// axios
const Product_API = "http://3.35.137.38/product/popularlist";

const getProductsAPI = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get(Product_API)
      .then((resp) => {
        if (resp.data.okay) {
          // 스토어에 보내주기
          dispatch(setProducts(resp.data.result));
          console.log(resp.data.result);
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
        draft.product = action.payload.answer;
      }),
  },
  initialState
);

const actionCreators = {
  getProductsAPI,
};

export { actionCreators };
