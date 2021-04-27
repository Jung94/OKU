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

const signupAPI = (id,pw,userName,email,address) => {
    return function (dispatch, getState, { history }) {
        
    const API = 'http://3.35.137.38/user/signup';
    fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: id,
            password: pw,
            name: userName,
            email: email,
            address:address
        })
    })
        .then((response) => response.json())
        .then((result) => {
        //중복체크 후 다시 중복 아이디, 이메일로 바꿨을 경우
        //대비 서버에서 한번 더 체크.
        let dupMsg = result.message;
        if (dupMsg === 'emailfalse') {
            window.alert('이메일 중복확인을 해주세요.');
        } else if (dupMsg === 'usernamefalse') {
            window.alert('아이디 중복확인을 해주세요.');
        } else {
            window.alert('회원가입이 되었습니다!');
            history.push('/login');
        }
    });
    }
};
  
const loginAPI = (id, pw) => {
    return function (dispatch, getState, { history }) {
        const API = 'http://3.35.137.38/user/login';
        fetch(API, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            userId: id,
            password: pw,
        })
        })
        // .then((res) => res.json())
        .then((result) => {
            // console.log(result);
            //성공시 토큰, 유저 정보 저장
            if (result.status === 200) {
                return result.json();
                // nickname = JSON.parse(nickname);
                // localStorage.setItem('Access-Token', token);
                // localStorage.setItem('nickname', JSON.stringify(userInfo));
                
                // localStorage.setItem('Access-Token', token);
                // localStorage.setItem('nickname', nickname);
                // dispatch(getUser({
                    
                //     user: nickname,
                    
                // }))
                // history.push('/');
            } else {
                window.alert('로그인에 실패했습니다.');
                return;
            }
        })
        .then((result) => {
            let token = result.access_token;
            let nickname = result.nickname;
            localStorage.setItem('Access-Token', token);
            localStorage.setItem('nickname', nickname);
        })
        .catch((error) => {
            console.log(error);
        });
    }
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
    signupAPI,
    loginAPI,
};
    
export { actionCreators };