import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";
const LOGIN_CHECK = 'LOGIN_CHECK';

const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const loginCheck = createAction(LOGIN_CHECK, (token) => ({ token }));

const initialState = {
    uid: null,
    user: null,
    is_login: false,
};

const signupAPI = (id, pw, pwCheck, userName, nickName, phone, email, address, detailAddress) => {
    return function (dispatch, getState, { history }) {
        
    const API = 'http://3.35.137.38/user/signup';
    fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: id,
            password: pw,
            password2: pwCheck,
            username: userName,
            nickname: nickName,
            number: phone,
            email: email,
            address:address,
            detailAddress: detailAddress
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
        .then((res) => res.json())
        .then((result) => {
            //성공시 토큰, 유저 정보 저장
            if (result.access_token) {
                let token = result.access_token;
                let nickname = result.nickname;
                localStorage.setItem('Access-Token', token);
                localStorage.setItem('nickname', nickname);
                window.alert('로그인을 완료하였습니다!');
                dispatch(setUser({
                    user: nickname,
                  }));
                history.push('/');
            } else if (result.msg === 'password False' || 'userId False') {
                window.alert('아이디와 비밀번호가 일치하지 않습니다.');
            } 
        })
        .catch((error) => {
            console.log(error);
        });
    }
};

const isLogin = () => {
    return function (dispatch, getState, { history }) {
      const token = localStorage.getItem('Access-Token');
      const nickname = localStorage.getItem('nickname');
  
      if (!token || !nickname) {
        return;
      }
      dispatch(setUser({
        user: nickname,
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