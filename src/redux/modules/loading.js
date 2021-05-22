import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// loading 모듈을 따로 만드는 이유?
// api 호출시 loading액션을 매번 작성해야하는 비효율
// is_loading initialState에서 지정해주어야함
// dispatch(loadingActions.loading(true));
//
// .finally(() => {
// dispatch(loadingActions.loading(false));
// });

// actions
const LOADING = "LOADING";

//actionCreators
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  is_loading: false,
};

// const loading = () => {
//   return function (dispatch, getState, { history }) {
//     _loading(true);
//   };
// };

export default handleActions(
  {
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  loading,
};

export { actionCreators };
