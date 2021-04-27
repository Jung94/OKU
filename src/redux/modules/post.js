// import { createAction, handleActions } from "redux-actions";
// import { produce, produceWithPatches } from "immer";
// import axios from "axios";

// // actions
// const SET_POST = "SET_POST";

// // actionCreator 
// const setProducts = createActions(SET_POST, (data) => ({data}));

// //initialstate
// const initialstate = {

// }

// // axios 
// // const Product_API = "http://3.35.137.38/"

// const getProductsAPI = () => {
//   return function (dispatch, getState, { history }) {
//     axios
//       .get(products_API)
//       .then((resp) => {
//         dispatch(setProducts(resp.data));
//       })
//       .catch((e) => console.error(e));
//   };
// };

// // Reducer
// export default handleActions(
//     {
//         [SET_POST]: (state, action) => produce(state, (draft) => {
//             draft.uid = action.payload.uid;
//             draft.user = action.payload.user;
//             draft.is_login = true;
//         }),
//     }, initialState);

// const actionCreators = {
// };
    
// export { actionCreators };

