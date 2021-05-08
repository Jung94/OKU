import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { KAKAO_JS_ID } from 'shared/common';
import { history } from 'redux/configureStore';
import { actionCreators as userActions } from 'redux/modules/user';

import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import KaKaoLogin from 'react-kakao-login';

const Login = (props) => {

    const dispatch = useDispatch();

    const [email, setEmail] = React.useState('');
    const [pw, setPw] = React.useState('');
    const [kakao_email, setKakao_email] = React.useState('');

    // 로그인
    const login = () => {
        
        if (!email || !pw) {
            alert('이메일과 비밀번호를 입력해주세요');
            return;
        }
        
        dispatch(userActions.loginAPI(email, pw));
    }

    // 카카오 로그인
    const kakaoLoginSuccessHandler = (res) => {
        
        const kakao_email_agreement = res.profile.kakao_account.email_needs_agreement;
        // 이메일 동의 여부
        if (kakao_email_agreement) {
            setKakao_email(res.profile.kakao_account.email);
        }

        const kakao_access_token = res.response.access_token;
        const kakao_refresh_token = res.response.refresh_token;
        const kakao_nickname = res.profile.kakao_account.profile.nickname;

        console.log(kakao_email);
        console.log(kakao_access_token);
        console.log(kakao_refresh_token);
        console.log(kakao_nickname);
        // 카카오 로그인 후 받아온 정보들(토큰, 이메일, 닉네임) 서버에 전달
        // dispatch(
        //     userActions.loginByKakao({
        //         kakao_token: kakao_access_token,
        //         // kakao_refresh_token: kakao_refresh_token,
        //         kakao_email: kakao_email,
        //         kakao_nickname: kakao_nickname,
        //     })
        // );
    };

    return (
        <Wrap>
            <Title>로그인</Title>
            <Desc>
                0부터 9까지 OKU의 다양한 상품을 구경하세요!
            </Desc>
        
            <LoginBox>
                <IconSpan>
                    <FontAwesomeIcon icon={faUser} />
                </IconSpan>
                <LoginInput type="text" placeholder="아이디" onChange={(e) => { setEmail(e.target.value) }} onKeyPress={(e) => {
                    if(window.event.keyCode === 13) {
                    login();
                    } 
                }} ></LoginInput>
            </LoginBox>
        
            <LoginBox>
                <IconSpan>
                    <FontAwesomeIcon icon={faLock} />
                </IconSpan>
                <LoginInput type="password" placeholder="비밀번호" onChange={(e) => { setPw(e.target.value) }} onKeyPress={(e) => {
                    if(window.event.keyCode === 13) {
                        login();
                    } 
                }}></LoginInput>
            </LoginBox>

            <Check>
                <Auto>
                    <AutoLogin type="checkbox" id="a1" />
                    <label for="a1">자동 로그인</label>
                </Auto>
                
                <CheckIdPw>
                    <a>아이디</a>
                    <CheckBar>|</CheckBar>
                    <a>비밀번호</a>
                    <span>찾기</span>
                </CheckIdPw>
            </Check>
        
            <LoginButton onClick={login} >로그인</LoginButton>
        
            <SignupBox>
                <span>아직 OKU 회원이 아니신가요?</span>
                <SignupLink onClick={() => history.push('/signup')} >회원가입하러 가기</SignupLink>
            </SignupBox>

            <SocialBox>
                {/* <Naver/> */}
                <KaKaoLogin token={KAKAO_JS_ID} 
                    render={(props) => (
                        <KakaoButton onClick={props.onClick}></KakaoButton>
                    )}
                    onSuccess={kakaoLoginSuccessHandler}
                />
                {/* <Google/> */}
            </SocialBox>
            
        </Wrap>
    );
}

const SocialBox = styled.div`
    // border: 1px solid rgba(204, 204, 204, 0.5);
    width: 100%;
    height: 100px;
    margin: 16px 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    gap: 10px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
`;

// const Naver = styled.div`
//     background: url("https://clova-phinf.pstatic.net/MjAxODAzMjlfOTIg/MDAxNTIyMjg3MzM3OTAy.WkiZikYhauL1hnpLWmCUBJvKjr6xnkmzP99rZPFXVwgg.mNH66A47eL0Mf8G34mPlwBFKP0nZBf2ZJn5D4Rvs8Vwg.PNG/image.png") no-repeat center;
//     background-size: cover;
//     background-position: center;
//     border-radius: 30px;
//     width: 32px;
//     height: 32px;
//     cursor: pointer;
// `;

const KakaoButton = styled.div`
    cursor: pointer;
    width: 100%;
    height: 45px;
    background-color: #FEE500;
    color: #000000;
    border-radius: 12px;
    background-image: url('kakao_login_large_wide.png');
    background-size: cover;
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

// const Google = styled.div`
//     background: url("https://littledeep.com/wp-content/uploads/2020/09/google-icon-styl.png") no-repeat center;
//     background-size: cover;
//     background-position: center;
//     border-radius: 30px;
//     width: 32px;
//     height: 32px;
//     cursor: pointer;
// `;

const Check = styled.div`
    // border: 1px solid rgba(204, 204, 204, 0.5);
    width: 100%;
    margin: 6px 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
`;

const Auto = styled.div`
    width: 100px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-first;
    align-items: center;
    gap: 6px;

    & > label {
        margin: 0 0 2px;
        cursor: pointer;
    }
`;

const AutoLogin = styled.input`
    cursor: pointer;
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
    
const Wrap = styled.div`
    width: 280px;
    height: 100%;
    margin: 142px auto 0;
    padding: 100px 0;
    box-sizing: border-box;
`;

const Title = styled.h3`
    font-weight: 500;
    font-size: 21px;
    width: 100%;
    text-align: center;
    margin: 0 0 16px;
`;

const Desc = styled.h3`
    font-weight: 400;
    font-size: 13px;
    width: 100%;
    text-align: center;
    margin: 0 0 30px;
    color: #06afd6;
`;

const LoginBox = styled.div`
    border-bottom: 1px solid rgba(204, 204, 204, 0.5);
    width: 100%;
    height: 46px;
    margin: 10px 0 0;
    padding: 8px 0;
    box-sizing: border-box;
    overflow: hidden;
//   &:hover {
//     transition: 0.3s;
//     border-bottom: 1px solid #ff5974;
//   }
    &:focus-within {
    transition: 0.3s;
    border-bottom: 1px solid #06afd6;
    }
`;

const IconSpan = styled.span`
    width: 26px;
    float: left;
    text-align: center;
    padding: 0 8px 0 0;
    color: rgba(204, 204, 204);
`;

const LoginInput = styled.input`
    border: none;
    background-color: transparent;
    box-sizing: border-box;
    letter-spacing: -.05em;
    letter-spacing: 0.5px;
    overflow: hidden;
    color: #000;
    font-size: 14px;
    width: 80%;
    outline: none;

    &::placeholder {
        color: rgba(0, 0, 0, 0.3);
        font-size: 0.8rem;
    }
`;

const LoginButton = styled.button`
    border: 0;
    border-radius: 30px;
    background-color: #06afd6;
    color: #fff;
    width: 100%;
    height: 50px;
    margin: 15px 0 0 0;
    padding: 0 0 1.5px 0;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    outline: none;

    &:hover {
        transition: 0.2s;
        background-color: transparent;
        border: 1px solid #06afd6;
        color: #06afd6;
    }
`; 

const SignupBox = styled.div`
    font-weight: 300;
    display: flex;
    justify-content: center;
    margin: 8px 0 0;
    & > span {
        font-size: 12.5px;
        color: rgba(0, 0, 0, 0.5);
        margin: 0 6px 0 0;
    }
`;

const SignupLink = styled.a`
    display: inline-block;
    text-align: center;
    // width: 46px;
    cursor: pointer;
    font-size: 12.5px;
    color: rgba(0, 0, 0, 0.5);
    // border-bottom: 1px solid rgba(204, 204, 204, 0.8);
    &:hover {
        transition: 0.2s;
        color: rgba(0, 0, 0, 1);
    }
`;

export default Login;