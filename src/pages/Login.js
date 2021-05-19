import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
// import { KAKAO_JS_ID } from "shared/common";
import { history } from "redux/configureStore";
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as headerActions } from "redux/modules/header";

import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import { Color } from "shared/DesignSys";

import { faEye as farEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash as farEyeSlash } from "@fortawesome/free-regular-svg-icons";

import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const login_msg = useSelector((state) => state.user.login_msg);

  // 저장된 아이디 세팅
  let saved_id = window.localStorage.getItem("saved_id");
  const [email, setEmail] = useState(saved_id ? saved_id : "");
  const [pw, setPw] = useState("");

  useEffect(() => {
    dispatch(headerActions.setHeader(true));
    _id.current.focus();
  }, []);

  const _id = useRef();
  const _pw = useRef();

  // 로그인 체크박스
  const [autoLogin, setAuto] = useState(false); // 자동 로그인
  const [saveId, setId] = useState(false); // 아이디 저장

  // 회원가입 warning 메시지
  const [warning, setWarning] = useState({ _id_wrng: false, _pw_wrng: false, _wrng: false });
  const { _id_wrng, _pw_wrng, _wrng } = warning;

  // 로그인 화면 에러 처리 UX
  const login = () => {
    setWarning({ _id_wrng: false, _pw_wrng: false }); // 로그인 시도를 여러번 할 수 있으므로
    if (!email && !pw) {
      setWarning({ _id_wrng: true, _pw_wrng: true });
      _id.current.focus();
    } else if (!email) {
      setWarning({ _id_wrng: true });
      _id.current.focus();
    } else if (!pw) {
      setWarning({ _pw_wrng: true });
      _pw.current.focus();
    } else {
      dispatch(userActions.loginAPI(email, pw, autoLogin, saveId));
      if (login_msg) {
        _id.current.focus();
        setWarning({ _wrng: true });
      }
    }
  };

  // 비밀번호 인풋 내용 state
  const [show, setShow] = useState(false); // show = 비밀번호 인풋에 작성한 비밀번호

  // 비밀번호 인풋 내용 보기
  const changeEye = () => {
    setShow(show ? false : true);
  };

  // 카카오 로그인
  const kakaoLoginClickHandler = (res) => {
    const kakao_access_token = res.response.access_token;
    const kakao_refresh_token = res.response.refresh_token;
    const kakao_nickname = res.profile.kakao_account.profile.nickname;
    const kakao_email = res.profile.kakao_account.email;

    // console.log(kakao_access_token);
    // console.log(kakao_refresh_token);
    // console.log(kakao_nickname);
    // console.log(kakao_email);

    // 카카오 로그인 후 받아온 정보들(토큰, 이메일, 닉네임) 서버에 전달
    dispatch(
      userActions.loginByKakao({
        kakao_token: kakao_access_token,
        // kakao_refresh_token: kakao_refresh_token,
        // kakao_email: kakao_email,
        // kakao_nickname: kakao_nickname,
      })
    );
  };

  // 로그인 되어있을때 로그인 페이지 접근 방지
  if (is_login) {
    history.push("/my/shopping");
  }

  return (
    <Wrap>
      <Box>
        <Text h2 textAlign="center" marginB="1rem">
          로그인
        </Text>
        <Text subBody textAlign="center" color={Color.Primary} marginB="1rem">
          0부터 9까지 뭐든 It's OK!
          <br />
          로그인을 통해 더욱 편리하게 OKU의 다양한 상품을 구경하세요.
        </Text>
        <LoginBox>
          {/* <FontAwesomeIcon icon={faUser} color={Color.Light_3} /> */}
          <LoginInput
            value={email}
            type="text"
            placeholder="EMAIL"
            id="loginInput"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyPress={(e) => {
              if (window.event.keyCode === 13) {
                login();
              }
            }}
            ref={_id}
          />
        </LoginBox>
        {_id_wrng && (
          <Text subBody color={Color.Primary} marginB="1rem">
            ID를 다시 확인해주세요!
          </Text>
        )}
        <LoginBox>
          {/* <FontAwesomeIcon icon={faLock} color={Color.Light_3} /> */}
          <LoginInput
            type={show ? "text" : "password"}
            placeholder="PASSWORD"
            onChange={(e) => {
              setPw(e.target.value);
            }}
            onKeyPress={(e) => {
              if (window.event.keyCode === 13) {
                login();
              }
            }}
            ref={_pw}
          />
          <IconEyeSpan onClick={changeEye}>{show ? <FontAwesomeIcon icon={farEyeSlash} /> : <FontAwesomeIcon icon={farEye} />}</IconEyeSpan>
        </LoginBox>
        {_pw_wrng && (
          <Text subBody color={Color.Primary} marginB="1rem">
            비밀번호를 다시 확인해주세요!
          </Text>
        )}
        {_wrng && (
          <Text subBody color={Color.Primary} marginB="1rem">
            존재하지 않는 아이디이거나, 잘못된 비밀번호입니다.
          </Text>
        )}

        <Check>
          {/* <Input
          check
          checked={autoLogin}
          _onClick={() => {
            if (autoLogin) {
              setAuto(false);
            } else {
              setAuto(true);
            }
          }}
          desc="자동 로그인"
        /> */}
          <Input
            check
            checked={saveId}
            _onClick={() => {
              if (saveId) {
                setId(false);
              } else {
                setId(true);
              }
            }}
            desc="아이디 저장"
          />

          {/* <CheckIdPw>
          <a>아이디</a>
          <CheckBar>|</CheckBar>
          <a>비밀번호</a>
          <span>찾기</span>
        </CheckIdPw> */}
        </Check>
        <Button noflex _onClick={login} width="100%" margin="1rem 0" height="50px">
          로그인
        </Button>
        <SocialBox>
          {/* <Naver/> */}
          <KakaoBtn
            href="http://13.124.55.186/user/kakao"
            // token={KAKAO_JS_ID} render={(props) => <KakaoBtn onClick={props.onClick}></KakaoBtn>} onSuccess={kakaoLoginClickHandler} getProfile={true}
          >
          </KakaoBtn>
          {/* <Google/> */}
        </SocialBox>
        <Text subBody textAlign="center" marginT="1rem" color={Color.Dark_4}>
          아직 OKU 회원이 아니신가요?
        </Text>
        <Text subBody weight="700" textAlign="center" color={Color.Primary} marginT="0.5rem" onClick={() => history.push("/signup")}>
          회원가입하러 가기
        </Text>
      </Box>
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 100%;
  width: 350px;

  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  min-height: 600px;
  height: 95vh;
  box-sizing: border-box;
`;

const SocialBox = styled.div`
  // border: 1px solid rgba(204, 204, 204, 0.5);
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
`;

// const KakaoBtn = styled.a`
//   height: 50px;
//   width: 47%;
//   border-radius: 27.5px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 14px;
//   font-weight: bold;
//   background-color: rgb(254, 229, 0);
//   border: 0;
//   cursor: pointer;
//   color: #000;
//   & div {
//     width: 22px;
//     margin-right: 12px;
//     background-size: cover;
//     background-image: url('kakao_login_large_wide.png');
//   }
//   &:hover {
//     color: #000;
//   }
// `;

const KakaoBtn = styled.a`
  cursor: pointer;
  width: 100%;
  height: 50px;
  background-color: #fee500;
  border-radius: 16px;
  background-image: url("kakao_login_large_wide.png");
  background-size: 100%;
  background-position: center;
  box-sizing: border-box;

  border: 1px solid #fee50000;

  transition: border 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275), background-size 1000ms cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    box-shadow: 0 0px 4px 0 rgba(0, 0, 0, 0.2);
    border: 1px solid #fee500;
    box-shadow: 0 0 0 3px #fee50033;
    background-size: 100%;
  }
`;

// const Kakao = styled.div`
//     background: url("https://m.gelatofactory.co.kr/web/upload/img/m/ico-kakao.png") no-repeat center;
//     background-size: cover;
//     background-position: center;
//     border-radius: 30px;
//     width: 32px;
//     height: 32px;
//     cursor: pointer;
// `;

const Check = styled.div`
  width: 100%;
  margin: 6px 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  color: rgba(0, 0, 0, 0.5);
`;

const CheckIdPw = styled.div`
  width: 120px;
  display: flex;
  justify-content: flex-end;

  & > a {
    margin: 1px 0 0;
    cursor: pointer;
  }

  & > span {
    margin: 1px 0 0 2px;
  }
`;

const CheckBar = styled.p`
  margin: 0 4px;
`;

const LoginBox = styled.div`
  border-bottom: 2px solid ${Color.Light_3};
  width: 100%;
  height: 46px;
  margin: 10px 0;
  padding: 8px 0;
  box-sizing: border-box;
  overflow: hidden;
  //   &:hover {
  //     transition: 0.3s;
  //     border-bottom: 1px solid #ff5974;
  //   }
  &:focus-within {
    transition: border-bottom 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-bottom: 2px solid ${Color.Primary};
  }
  svg {
    width: 26px;
    /* float: left; */
    align-items: center;
    color: ${Color.Light_3};
    margin-right: 10px;
  }
`;

const LoginInput = styled.input`
  border: none;
  background-color: transparent;
  box-sizing: border-box;
  letter-spacing: 0.5px;
  overflow: hidden;
  color: #000;
  font-size: 14px;
  width: 90%;
  outline: none;

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
    font-size: 12px;
    user-select: none;
  }
`;

const IconEyeSpan = styled.span`
  width: 26px;
  float: right;
  text-align: center;
  padding: 3px 0 0;
  font-size: 14px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.4);
`;

export default Login;
