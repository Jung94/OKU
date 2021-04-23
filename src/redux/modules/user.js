import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

const initialState = {
    uid: null,
    user: null,
    is_login: false,
};

export default handleActions(
    {
        [LOG_IN]: (state, action) => produce(state, (draft) => {
            draft.uid = action.payload.uid;
            draft.user = action.payload.user;
            draft.is_login = true;
        }),

        [LOG_OUT]: (state, action) => produce(state, (draft) => {
            draft.uid = null;
            draft.user = null;
            draft.is_login = false;
        }),

        [GET_USER]: (state, action) => produce(state, (draft) => {}),

    }, initialState);

const actionCreators = {
    logIn,
    getUser,
    logOut,
};
    
export { actionCreators };