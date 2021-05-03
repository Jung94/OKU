import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import "moment";
import moment from "moment";

const ADD_POST = "ADD_POST";

const addPost = createAction(ADD_POST, (post) => ({ post }));

const initialState = {
  image: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  title: "",
  cateBig: "",
  cateSmall: "",
  region: "",
  productState: "",
  deadline: "",
  lowbid: "",
  sucbid: "",
  productDesc: "",
  tags: "",
  insert_dt: moment().format("YY.MM.DD hh:mm"),
};

const addPostAPI = () => {
  return function (dispatch, getState, { history }) {
    
  }
}

export default handleActions(
  {
    [ADD_POST]: (state, action) => produce(state, (draft) => {
      // 데이터를 배열 맨 앞에 넣어줍니다.
      draft.list.unshift(action.payload.post);
    }),

  }, initialState);

const actionCreators = {
  addPostAPI,
  addPost,
};
    
export { actionCreators };