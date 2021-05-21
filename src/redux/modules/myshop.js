import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { API } from "shared/Api";
import axios from "axios";


// actions 
// 내상점
// 내상점소개
const SET_SHOPDESC = "SET_MARKETDESC"
// 소개수정
const EDIT_SHOPDESC = "EDIT_SHOPDESC"
// 판매중인 물건
const SET_MYPRODUCT = "SET_MYPRODUCT"




// actionCreator
const setShopDesc = createAction(SET_SHOPDESC, ( shop_desc ) => ({ shop_desc }));
const setMyProducts = createAction(SET_MYPRODUCT, ( selling_Product ) => ({ selling_Product }));
const editShopDesc = createAction(EDIT_SHOPDESC, ( edit_desc ) => ({ edit_desc }));



// initialState
const initialState = {
    desc_shop : [],
    shop_desc : "",
    myproduct : [], 
}

// 내상점소개
const Dsec_API = `${API}/user/marketdesc`;

const getShopDescAPI = () => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        fetch(Dsec_API, {
            method: "GET",
            headers: {
                access_token: access_token,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            })
            .then((res) => res.json())
            .then((res) => {
                dispatch(setShopDesc(res.marketdesc));
            })
            .catch((error) => {
                console.log("내 상점 소개", error);
            });
        };
    };

// 상점소개수정
const editShopDescAPI = (shop_desc) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");

        fetch(`${API}/user/marketdesc`, {
            method: "PUT",
            headers: {
            access_token: `${access_token}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify({"content" : shop_desc}),
        })
            .then((res) => res.json())
            .then((res) => {
                dispatch(editShopDesc(shop_desc));
        })
            .catch((error) => {
            console.log("editShopDescAPI에 문제가 있습니다.", error);
            })  
        };
    };


// 실시간 등록상품
const MyProduct_API = `${API}/user/myproduct`;

const getMyProductAPI = () => {
    const access_token = localStorage.getItem("access_token");
    return function (dispatch, getState, { history }) {
        fetch(MyProduct_API, {
            method: "GET",
            headers: {
                access_token: access_token,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            })
            .then((res) => res.json())
            .then((res) => {
                dispatch(setMyProducts(res.result));
            })
            .catch((error) => {
                console.log("실시간등록상품", error);
            });
        };
    };

// Reducer 를 실행하기위해 액션크리에이터
export default handleActions(
    {
        [SET_SHOPDESC]: (state, action) =>
            produce(state, (draft) => {
          // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
            draft.desc_shop = action.payload.shop_desc;
            draft.shop_desc = action.payload.shop_desc.marketdesc;
        }),
        [EDIT_SHOPDESC]: (state, action) =>
        produce(state, (draft) => {
      // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
        draft.shop_desc = action.payload.edit_desc;
        }),
        [SET_MYPRODUCT]: (state, action) =>
        produce(state, (draft) => {
      // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
        draft.Product_selling = action.payload.selling_Product;
    }),

    },

    initialState
);

  // 리듀서 적기 디스패치, 유즈스테이트 하기
const actionCreators = {
    getShopDescAPI,
    getMyProductAPI,
    editShopDescAPI
};

export { actionCreators };
