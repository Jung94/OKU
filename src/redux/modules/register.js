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
  // insert_dt: moment().format("YY.MM.DD hh:mm"),
};

const addPostAPI = (image, title, cateBig, cateSmall, region, productState, deadline, lowbid, sucbid, delivery, productDesc, tags) => {
  return function (dispatch, getState, { history }) {
    let nickname = localStorage.getItem("nickname");
    let access_token = localStorage.getItem("access_token");
    if (!access_token) {
      alert("로그인을 먼저 해주세요!");
      return;
    }

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("img", image);
    formData.append("title", title);
    formData.append("bigCategory", cateBig);
    formData.append("smallCategory", cateSmall);
    formData.append("region", region);
    formData.append("state", productState);
    formData.append("deadline", deadline);
    formData.append("lowbid", lowbid);
    formData.append("sucbid", sucbid);
    formData.append("deliveryprice", delivery);
    formData.append("description", productDesc);
    formData.append("tag", tags);

    // if(!cid) {
    //   alert('잘못된 접근입니다.');
    //   return;
    // }

    const API = "http://3.35.137.38/product";
    fetch(API, {
      method: "POST",
      headers: {
        access_token: `${access_token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });

    // history.push('/');
  };
};

export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        // 데이터를 배열 맨 앞에 넣어줍니다.
        draft.list.unshift(action.payload.post);
      }),
  },
  initialState
);

const actionCreators = {
  addPostAPI,
  addPost,
};

export { actionCreators };
