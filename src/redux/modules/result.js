import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { API } from "shared/Api";

import { actionCreators as loadingActions } from "redux/modules/loading";

const SET_PRODUCT_SEARCH = "SET_PRODUCT_SEARCH"; // 검색 페이지
const SET_SEARCH_PAGE = "SET_SEARCH_PAGE"; // 검색 페이지 - 무한 스크롤
const CLEAR_SEARCH_PAGE = "CLEAR_SEARCH_PAGE"; // 새롭게 검색할때 초기화
const SET_KEYWORD = "SET_KEYWORD"; // 검색어 설정

const setProductSearch = createAction(SET_PRODUCT_SEARCH, (products) => ({ products })); // 검색 페이지
const setSearchPage = createAction(SET_SEARCH_PAGE, (page) => ({ page })); // 검색 페이지 - 무한 스크롤
const clearSearchPage = createAction(CLEAR_SEARCH_PAGE, () => ({})); // 새롭게 검색할때 초기화
const setKeyword = createAction(SET_KEYWORD, (keyword) => ({ keyword })); // 검색어 설정

const initialState = {
  search: [],
  search_page: 0,
  keyword: "",
};

const getProductSearch = (keyword) => {
  return function (dispatch, getState, { history }) {
    dispatch(loadingActions.loading(true));
    dispatch(clearSearchPage()); // 전에 검색한 결과 내용 모두 지우기
    dispatch(setKeyword(keyword));

    // const page = getState().movie.search_page;

    fetch(`${API}/product/search?term=${keyword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // if(!data.last) {
        //     dispatch(setSearchPage(page + 1));
        // } else {
        //     dispatch(setSearchPage(0));
        // }
        const products = res.result;

        dispatch(setProductSearch(products));
      })
      .catch((err) => console.log(err, "getProductSearch"))
      .finally(() => {
        dispatch(loadingActions.loading(false));
      });
  };
};

export default handleActions(
  {
    [SET_PRODUCT_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.search = action.payload.products;
      }),

    [CLEAR_SEARCH_PAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.search = [];
        // draft.search_page = 0;
      }),

    [SET_KEYWORD]: (state, action) =>
      produce(state, (draft) => {
        draft.keyword = action.payload.keyword;
      }),
  },
  initialState
);

const actionCreators = {
  // getProductScroll,
  getProductSearch,
  setSearchPage,
  clearSearchPage,
  setKeyword,
};

export { actionCreators };
