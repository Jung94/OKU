import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { API } from "shared/Api";
import "moment";
import moment from "moment";

import { actionCreators as loadingActions } from "redux/modules/loading";

// actions
const ADD_POST = "ADD_POST";
const UPLOAD_PROGRESS = "UPLOAD_PROGRESS";
const SET_PREVIEW_1 = "SET_PREVIEW_1";
const SET_PREVIEW_2 = "SET_PREVIEW_2";
const SET_PREVIEW_3 = "SET_PREVIEW_3";
const SET_PREVIEW_ALL = "SET_PREVIEW_ALL";

// action creators
const addPost = createAction(ADD_POST, (post) => ({ post }));
const uploadProgress = createAction(UPLOAD_PROGRESS, (progress) => ({ progress }));
const setPreview1 = createAction(SET_PREVIEW_1, (preview) => ({ preview }));
const setPreview2 = createAction(SET_PREVIEW_2, (preview) => ({ preview }));
const setPreview3 = createAction(SET_PREVIEW_3, (preview) => ({ preview }));
const setPreviewAll = createAction(SET_PREVIEW_ALL, (preview) => ({ preview }));

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
  preview1: [],
  preview2: [],
  preview3: [],
  previewAll: [],
  // insert_dt: moment().format("YY.MM.DD hh:mm"),
};

const addPostAPI = (image1, image2, image3, title, cateBig, cateSmall, region, productState, deadline, lowbid, sucbid, delivery, productDesc, tags) => {
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));
    dispatch(uploadProgress(true));
    let nickname = localStorage.getItem("nickname");
    let access_token = localStorage.getItem("access_token");
    if (!access_token) {
      alert("로그인을 먼저 해주세요!");
      return;
    }

    const formData = new FormData();

    if (image1) {
      formData.append("img", image1);
    }
    if (image2) {
      formData.append("img", image2);
    }
    if (image2) {
      formData.append("img", image3);
    }

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

    tags.map((t, idx) => {
      console.log(t);
      return formData.append("tag", t);
    });

    fetch(`${API}/product/`, {
      method: "POST",
      headers: {
        // "content-type": "multipart/form-data",
        access_token: `${access_token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        dispatch(uploadProgress(false));
        dispatch(setPreview1([]));
        dispatch(setPreview2([]));
        dispatch(setPreview3([]));
        if (res.msg === "상품이 등록되었습니다") {
          window.alert("상품이 정상적으로 등록되었습니다! 메인으로 이동합니다.");
          history.push("/");
        }
      })
      .catch((error) => {
        console.log("addPostAPI에 문제가 있습니다.", error);
      })
      .finally(() => {
        dispatch(loadingActions.loading(false));
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

    [SET_PREVIEW_1]: (state, action) =>
      produce(state, (draft) => {
        // draft.preview_image.push(action.payload.preview);
        draft.preview1 = action.payload.preview;
        // draft.progress = true;
      }),

    [SET_PREVIEW_2]: (state, action) =>
      produce(state, (draft) => {
        draft.preview2 = action.payload.preview;
      }),

    [SET_PREVIEW_3]: (state, action) =>
      produce(state, (draft) => {
        draft.preview3 = action.payload.preview;
      }),

    [SET_PREVIEW_ALL]: (state, action) =>
      produce(state, (draft) => {
        draft.previewAll = action.payload.preview;
      }),
  },
  initialState
);

const actionCreators = {
  addPost,
  addPostAPI,
  setPreview1,
  setPreview2,
  setPreview3,
  setPreviewAll,
};

export { actionCreators };
