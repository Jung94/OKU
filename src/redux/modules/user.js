import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';

import { setLocal, deleteLocal } from 'shared/Local';

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";
const LOGIN_CHECK = 'LOGIN_CHECK';

const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const setUser = createAction(SET_USER, (user, uid) => ({ user, uid }));
const loginCheck = createAction(LOGIN_CHECK, (token) => ({ token }));

const initialState = {
    uid: null,
    user: null,
    is_login: false,
};

const signupAPI = (email, pw, pwCheck, nickName, phone) => {
    return function (dispatch, getState, { history }) {
        
    const API = 'http://3.35.137.38/user/signup';
    fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: pw,
            password2: pwCheck,
            nickname: nickName,
            number: phone,
        })
    })
        .then((res) => res.json())
        .then((result) => {
        //중복체크 후 다시 중복 아이디, 이메일로 바꿨을 경우
        //대비 서버에서 한번 더 체크.
        let dupMsg = result.msg.dupMsg;
        if (dupMsg === 'idFalse') {
            window.alert('아이디 중복확인을 해주세요.');
        } else if (dupMsg === 'pwFalse') {
            window.alert('동일한 비밀번호를 입력해주세요.');
        } else if (dupMsg === 'nicknameFalse') {
            window.alert('닉네임 중복확인을 해주세요.');
        } else if (dupMsg === 'emailFalse') {
            window.alert('이메일 중복확인을 해주세요.');
        } else if (dupMsg === true){
            window.alert('회원가입이 완료되었습니다!');
            history.push('/login');
        }
    });
    }
};

//일반 로그인
const loginAPI = (email, pw) => {
    return function (dispatch, getState, { history }) {
        const API = 'http://3.35.137.38/user/login';
        fetch(API, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: pw,
            })
        })
        .then((res) => res.json())
        .then((result) => {
            // console.log(result.access_token);
            //성공시 토큰, 유저 정보 저장
            if (result.access_token) {
                let token = result.access_token;
                let user = result.nickname;
                let uid = result.userId;
                localStorage.setItem('access_token', token);
                localStorage.setItem('nickname', user);
                localStorage.setItem('uid', uid);
                window.alert('로그인을 완료하였습니다!');
                dispatch(setUser(user, uid));
                history.push('/');
                } else if (result.msg === 'password False' || 'email False') {
                    window.alert('이메일과 비밀번호가 일치하지 않습니다.');
                } 
        })
        .catch((error) => {
            console.log(error);
        });
    }
};

// 카카오 로그인
// const loginByKakao = (data) => async (dispatch, getState, { history }) => {
//     try {
//       // 카카오 로그인으로 받아온 토큰으로 서버에서 jwt 토근을 받아옴
//       const res = await userAPI.loginByKakao(data);
  
//       const token = res.data.token;
//       const username = res.data.username;
//       const userId = res.data.userid;
  
//       // 받아온정보 쿠키저장
//       setLocal('access_token', token);
//       setLocal('nickname', username);
//       setLocal('userId', userId);
  
//       // 헤더에 토큰 저장
//       axios.defaults.headers.common['token'] = `${token}`;
  
//       // 토큰으로 유저정보 받아옴
//       dispatch(fetchUserProfile(1));
//     } catch (error) {
//       console.error(error);
//       dispatch(setLoginError(error.response.data.errorMessage));
//     }
// };

const isLogin = () => {
    return function (dispatch, getState, { history }) {
        const token = localStorage.getItem('access_token');
        const nickname = localStorage.getItem('nickname');
        const uid = localStorage.getItem('uid');

        if (!token || !nickname) {
            return;
        }
        dispatch(setUser({
            user: nickname,
            uid: uid,
        }));
}
}

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

        [SET_USER]: (state, action) => produce(state, (draft) => {
            draft.user = action.payload.user;
            draft.uid = action.payload.uid;
            draft.is_login = true;
        }),

        // [LOGIN_CHECK]: (state, action) => produce(state, (draft) => {
        //     localStorage.getItem("Access-Token");
        //     localStorage.getItem("nickname");
        //     draft.is_login = action.payload.token;
        // }),

    }, initialState);

const actionCreators = {
    signupAPI,
    loginAPI,
    loginCheck,
    isLogin,
};
    
export { actionCreators };