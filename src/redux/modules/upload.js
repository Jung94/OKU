import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import "moment";
import moment from "moment";

// actions
const ADD_POST = "ADD_POST";
const UPLOAD_PROGRESS = "UPLOAD_PROGRESS";
const SET_PREVIEW = "SET_PREVIEW";

// action creators
const addPost = createAction(ADD_POST, (post) => ({ post }));
const uploadProgress = createAction(UPLOAD_PROGRESS, (progress) => ({ progress }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

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

  progress: false,
  preview_image: [],
  // insert_dt: moment().format("YY.MM.DD hh:mm"),
};

const addPostAPI = (image, title, cateBig, cateSmall, region, productState, deadline, lowbid, sucbid, delivery, productDesc, tags) => {
  return function (dispatch, getState, { history }) {
    dispatch(uploadProgress(true));
    let nickname = localStorage.getItem("nickname");
    let access_token = localStorage.getItem("access_token");
    if (!access_token) {
      alert("로그인을 먼저 해주세요!");
      return;
    }
    console.log(image);
    const formData = new FormData();

    formData.append("img", image);
    // formData.append("img", image[0]);
    // formData.append("img", image[1]);
    formData.append("nickname", nickname);
    formData.append("title", title);
    formData.append("bigCategory", cateBig);
    formData.append("smallCategory", cateSmall);
    formData.append("region", region);
    formData.append("state", productState);
    formData.append("duration", deadline);
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
        console.log("정상적으로 등록되었습니다.");
        // dispatch(uploadProgress(false));
      })
      .catch((error) => {
        console.log("addPostAPI에 문제가 있습니다.", error);
      });
  };
};

export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        // 데이터를 배열 맨 앞에 넣어줍니다.
        // draft.image_url=action.payload.image_url;
        draft.list.unshift(action.payload.post);
      }),
    [UPLOAD_PROGRESS]: (state, action) =>
      produce(state, (draft) => {
        draft.progress = action.payload.progress;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview_image = action.payload.preview;
        draft.progress = true;
      }),
  },
  initialState
);

const actionCreators = {
  addPost,
  addPostAPI,
  setPreview,
};

export { actionCreators };
