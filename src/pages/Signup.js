import React, { useRef, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { API } from "shared/Api";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { history } from "redux/configureStore";
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as headerActions } from "redux/modules/header";

import { emailCheck } from "shared/common";
import { pwMacth } from "shared/common";
import { nicknameCheck } from "shared/common";

import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";
import { Color } from "shared/DesignSys";

import MainLogo from "images/logo.png";

import { faEye as farEye } from "@fortawesome/free-regular-svg-icons";
import { faUser as farUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope as farEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash as farEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faAddressCard as farAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faUser, faLock, faEnvelope, faPhone, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";

// import DaumPostcode from 'react-daum-postcode';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return isDesktop ? children : null;
};

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  return isTablet ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

const Signup = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  useEffect(() => {
    _id.current.focus();
    dispatch(headerActions.setHeader(false));
  }, []);

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [phone, setPhone] = useState("");

  // 비밀번호 인풋 내용 state
  const [show, setShow] = useState(false); // show = 비밀번호 인풋에 작성한 비밀번호
  const [show2, setShow2] = useState(false); // show2 = 비밀번호 확인 인풋에 작성한 비밀번호

  // 비밀번호 인풋 내용 보기
  const changeEye = () => {
    setShow(show ? false : true);
  };

  // 비밀번호 확인 인풋 내용 보기
  const changeEye2 = () => {
    setShow2(show2 ? false : true);
  };

  // 주소 숨겨두기
  const address = () => {
    const postCodeStyle = {
      display: "block",
      position: "absolute",
      top: "50px",
      zIndex: "100",
      padding: "7px",
    };

    // const [postalAddress, setPostalAddress] = useState('');
    // const [address, setAddress] = useState('');
    // const [detailAddress, setDetailAddress] = useState('');
    // const postalAddressInfo = useRef();
    // const addressInfo = useRef();
    // const detailAddressInfo = useRef();
    // const [messagePostalAddress, setMessagePostalAddress] = useState('');
    // const [messageAddress, setMessageAddress] = useState('');
    // const [messageDetailAddress, setMessageDetailAddress] = useState('');
    // // 우편주소 작성 없이 포커스 아웃 되었을 때
    // const checkPostalAddress = () => {
    //   if (postalAddress === '') {
    //     setMessagePostalAddress('·우편주소를 입력해주세요.');
    //     postalAddressInfo.current.style.display = 'block';
    //     return;
    //   } else {
    //     postalAddressInfo.current.style.display = 'none';
    //   }
    // }
    // // 주소 작성 없이 포커스 아웃 되었을 때
    // const checkAddress = () => {
    //   if (address === '') {
    //     setMessageAddress('·주소를 입력해주세요.');
    //     addressInfo.current.style.display = 'block';
    //     return;
    //   } else {
    //     addressInfo.current.style.display = 'none';
    //   }
    // }
    // // 상세주소 작성 없이 포커스 아웃 되었을 때
    // const checkDetailAddress = () => {
    //   if (address === '') {
    //     setMessageDetailAddress('·상세주소를 입력해주세요.');
    //     detailAddressInfo.current.style.display = 'block';
    //     return;
    //   } else {
    //     detailAddressInfo.current.style.display = 'none';
    //   }
    // }
    // 주소 검색 한 것 받음
    // const [isZoneCode, setIsZoneCode] = useState();
    // const [isAddress, setIsAddress] = useState();
    // const [isPostOpen, setIsPostOpen] = useState(false); // 주소창 열고 닫기
    // 상세주소
    // const [isAddressPlus, setIsAddressPlus] = useState("");
    // const onChangeAddressPlus = useCallback(
    //   (e) => setIsAddressPlus(e.target.value),
    //   []
    // );
    // // 우편번호 / 주소 찾기
    // const handleComplete = (data) => {
    //   let fullAddress = data.address;
    //   let extraAddress = "";
    //   if (data.addressType === "R") {
    //     if (data.bname !== "") {
    //       extraAddress += data.bname;
    //     }
    //     if (data.buildingName !== "") {
    //       extraAddress +=
    //         extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
    //     }
    //     fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    //   }
    //   setPostalAddress(data.zonecode);
    //   setAddress(fullAddress);
    //   setIsPostOpen(false);
    // };
    // const _payment_info = {
    //   userAddress: `${postalAddress} ${address} ${detailAddress}`
    // };
  };

  const _id = useRef();
  const _pw = useRef();
  const _pwChk = useRef();
  const _nick = useRef();
  const _ph = useRef();

  const [messageEmail, setMessageEmail] = useState("");
  const [messagePw, setMessagePw] = useState("");
  const [messagePwCheck, setMessagePwCheck] = useState("");
  const [messageNickname, setMessageNickname] = useState("");
  const [messagePhone, setMessagePhone] = useState("");

  // 이용약관 동의 체크박스
  const [agree, setAgree] = useState(false);

  // 이용약관 동의
  const handleAgree = () => {
    if (!email || !pw || !pwCheck || !nickName) {
      window.alert("양식을 채워주세요!");
    } else if (agree) {
      setAgree(false);
    } else {
      setAgree(true);
    }
  };

  // 회원가입 버튼 클릭 시
  const signUp = () => {
    if (email === "") {
      _id.current.focus();
      setMessageEmail("이메일을 입력해주세요.");
    } else if (pw === "") {
      _pw.current.focus();
      setMessagePw("비밀번호를 입력해주세요.");
    } else if (pwCheck === "") {
      _pwChk.current.focus();
      setMessagePwCheck("비밀번호를 한번 더 입력해주세요.");
    } else if (nickName === "") {
      _nick.current.focus();
      setMessageNickname("닉네임을 입력해주세요.");
    } else if (!agree) {
      alert("이용약관에 동의해 주시기 바랍니다.");
    } else {
      dispatch(userActions.signupAPI(email, pw, pwCheck, nickName));
    }
  };

  // 이메일 작성 없을 경우 또는 이메일 형식에 맞지 않을 경우, 포커스 아웃 되면 동작
  const checkEm = () => {
    if (email === "") {
    } else if (!emailCheck(email)) {
      setMessageEmail("이메일 형식에 맞게 작성해 주시기 바랍니다.");
    } else if (checkEmailAPI(email)) {
    }
  };

  // 이메일 사용 가능 여부 확인. 이메일 인풋 포커스 아웃 시
  const checkEmailAPI = (email) => {
    fetch(`${API}/user/signup/email/${email}`)
      .then((res) => res.json())
      .then((res) => {
        let result = res.result;
        if (result === false) {
          setMessageEmail("이미 등록된 이메일입니다. 다시 작성해 주세요.");
        } else {
          setMessageEmail("✔ 사용 가능한 이메일입니다!");
        }
      });
  };

  // 닉네임 사용 가능 여부 확인. 이메일 인풋 포커스 아웃 시
  const checkNicknameAPI = (nickname) => {
    fetch(`${API}/user/signup/nickname/${nickname}`)
      .then((res) => res.json())
      .then((res) => {
        let result = res.result;
        if (result === false) {
          setMessageNickname("이미 존재하는 닉네임입니다.");
        } else {
          setMessageNickname("✔ 사용 가능한 닉네임입니다.");
        }
      });
  };

  // 비밀번호 작성 없이 포커스 아웃 되었을 때
  const checkPw = () => {
    if (!pw) {
      setMessagePw("");
      return;
    } else if (pw === "") {
      setMessagePw("");
      return;
    } else if (!pwMacth(pw)) {
      setMessagePw("영문 대소문자/숫자/특수문자 모두 포함(8~15자)");
      return;
    }
    setMessagePw("✔ 사용 가능한 비밀번호입니다!");
  };

  // 비밀번호 확인 작성 없을 경우 또는 앞서 작성한 비밀번호 내용과 다를 경우, 포커스 아웃 되었을 때
  const doubleCheckPw = () => {
    if (pw === "") {
      setMessagePw("비밀번호를 먼저 입력해주세요.");
    } else if (pw !== "" && !pwCheck) {
      setMessagePwCheck("");
    } else if (pw !== pwCheck) {
      setMessagePwCheck("비밀번호를 다시 확인해주세요.");
    } else if (pw === pwCheck) {
      setMessagePwCheck("✔ 비밀번호가 확인되었습니다.");
    }
  };

  // 닉네임 작성 없이 포커스 아웃 되었을 때
  const checkNickname = () => {
    if (nickName === "") {
      setMessageNickname("");
    } else if (nickName === null) {
      console.log("null?");
    } else if (nickName === false) {
      console.log("false?");
    } else if (!nicknameCheck(nickName)) {
      setMessageNickname("특수문자 제외(2~10자)");
    } else {
      checkNicknameAPI(nickName);
    }
  };

  // 전화번호 작성 없이 포커스 아웃 되었을 때 (전화번호 인증시 보충해야함)
  const checkPhone = () => {
    if (phone === "") {
      setMessagePhone("");
    } else {
    }
  };

  // 로그인 되어있을때 회원가입 페이지 접근 방지
  if (is_login) {
    history.push("/my/shopping");
  }

  // 
  const aboutus = (e) => {
    window.open("https://www.notion.so/90bbb2e5d07941a3a46370e5333c7556");
  };

  return (
    <>
      <Desktop>
        <Grid is_flex justify="flex-end" width="100%" max_width="1320px">
          {/* <Text subBody color={Color.Dark_4} margin="1rem">
            about OKU
          </Text> */}
          <Text subBody color={Color.Dark_4} onClick={aboutus}>
            about Team
          </Text>
        </Grid>
        <Grid is_flex column margin="1rem 0">
          <img
            alt="로고이미지"
            style={{ width: "25vw", maxWidth: "117.8px", cursor: "pointer", zIndex: "1", margin: "1rem" }}
            src={MainLogo}
            onClick={() => {
              history.push("/");
            }}
          />
          <Text subBody textAlign="center" color={Color.Primary} marginB="1rem">
            오쿠는 각자의 덕질 취향을 존중하는
            <br />
            "덕후들을 위한" 굿즈 경매 사이트입니다.
            <br />
            덕질 생활을 더욱 편리하고 행복하게 즐기세요!
          </Text>
        </Grid>
      </Desktop>

      <Mobile>
        <Grid is_flex column margin="35px 0 0 0">
          <img
            alt="로고이미지"
            style={{ width: "25vw", maxWidth: "117.8px", cursor: "pointer", marginBottom: "1rem" }}
            src={MainLogo}
            onClick={() => {
              history.push("/");
            }}
          />
          <Text subBody textAlign="center" color={Color.Primary} marginB="5px">
            오쿠는 각자의 덕질 취향을 존중하는
            <br />
            "덕후들을 위한" 굿즈 경매 사이트입니다.
            <br />
            덕질 생활을 더욱 편리하고 행복하게 즐기세요!
          </Text>
        </Grid>
      </Mobile>

      <Wrap>
        <Box>
          <Text h4 marginB="0.25rem">
            아이디
          </Text>
          <SignupBox>
            {/* <FontAwesomeIcon icon={farEnvelope} color={Color.Light_3} /> */}
            <SignupInput
              type="text"
              placeholder="EMAIL"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onFocus={() => {
                setMessageEmail("");
              }}
              onBlur={checkEm}
              ref={_id}
            />
          </SignupBox>
          <Text subBody color={Color.Primary} marginB="1rem">
            {messageEmail}
          </Text>

          <Text h4 marginB="0.25rem">
            비밀번호
          </Text>
          <SignupBox>
            {/* <FontAwesomeIcon icon={faLock} color={Color.Light_3} /> */}
            <PwdInput
              type={show ? "text" : "password"}
              placeholder="PASSWORD"
              onChange={(e) => {
                setPw(e.target.value);
              }}
              onBlur={checkPw}
              ref={_pw}
            />
            <IconEyeSpan onClick={changeEye}>{show ? <FontAwesomeIcon icon={farEyeSlash} /> : <FontAwesomeIcon icon={farEye} />}</IconEyeSpan>
          </SignupBox>
          <Text subBody color={Color.Primary} marginB="1rem">
            {messagePw}
          </Text>

          <Text h4 marginB="0.25rem">
            비밀번호 확인
          </Text>
          <SignupBox>
            {/* <FontAwesomeIcon icon={faLock} color={Color.Light_3} /> */}
            <PwdInput
              type={show2 ? "text" : "password"}
              placeholder="PASSWORD CHECK"
              onChange={(e) => {
                setPwCheck(e.target.value);
              }}
              onFocus={doubleCheckPw}
              onBlur={doubleCheckPw}
              ref={_pwChk}
            />
            <IconEyeSpan onClick={changeEye2}>{show2 ? <FontAwesomeIcon icon={farEyeSlash} /> : <FontAwesomeIcon icon={farEye} />}</IconEyeSpan>
          </SignupBox>
          <Text subBody color={Color.Primary} marginB="1rem">
            {messagePwCheck}
          </Text>

          <Text h4 marginB="0.25rem">
            닉네임
          </Text>
          <SignupBox>
            {/* <FontAwesomeIcon icon={farUser} color={Color.Light_3} /> */}
            <SignupInput
              type="text"
              placeholder="NICKNAME"
              onChange={(e) => {
                setNickName(e.target.value);
              }}
              onBlur={checkNickname}
              ref={_nick}
            />
          </SignupBox>
          <Text subBody color={Color.Primary} marginB="1rem">
            {messageNickname}
          </Text>

          {/* <Text h4 marginB="0.25rem">
            전화번호
          </Text>
          <SignupBox>
            <FontAwesomeIcon icon={faPhone} color={Color.Light_3} />
            <SignupInput
              type="text"
              placeholder="PHONE NUMBER"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              onBlur={checkPhone}
              ref={_ph}
            />
          </SignupBox>
          <Text subBody color={Color.Primary} marginB="1rem">
            {messagePhone}
          </Text> */}

          {/* <SignupBox>
        <IconSpan>
          <FontAwesomeIcon icon={farAddressCard} />
        </IconSpan>
        <SignupInput postal type="text" placeholder="우편번호" value={postalAddress} onChange={(e) => { setPostalAddress(e.target.value) }} onBlur={checkPostalAddress}></SignupInput>
        <PostalBtn text="주소 찾기" onClick={() => {setIsPostOpen(true);}}>주소 찾기</PostalBtn>
      </SignupBox>
      <InfoUl ref={postalAddressInfo}>
        <li>{messagePostalAddress}</li>
      </InfoUl>

      <SignupBox>
        <IconSpan>
          <FontAwesomeIcon icon={faAddressCard} />
        </IconSpan>
        <SignupInput type="text" placeholder="주소" value={address} onChange={(e) => { setAddress(e.target.value) }} onBlur={checkAddress}></SignupInput>
      </SignupBox>
      <InfoUl ref={addressInfo}>
        <li>{messageAddress}</li>
      </InfoUl>

      <SignupBox>
        <IconSpan>
          <FontAwesomeIcon icon={faAddressCard} />
        </IconSpan>
        <SignupInput type="text" placeholder="상세주소" onChange={(e) => { setDetailAddress(e.target.value) }} onBlur={checkDetailAddress}></SignupInput>
      </SignupBox>
      <InfoUl ref={detailAddressInfo}>
        <li>{messageDetailAddress}</li>
      </InfoUl> */}

          <Grid is_flex column>
            <Input check checked={agree} _onClick={handleAgree} desc="회원가입시 OKU 이용약관에 동의해 주시기 바랍니다." />
          </Grid>
          {agree ? (
            <Button noflex _onClick={signUp} width="100%" margin="1rem 0" height="50px">
              회원가입
            </Button>
          ) : (
            <Button noflex disabled width="100%" margin="1rem 0" height="50px">
              회원가입
            </Button>
          )}
          <Text subBody textAlign="center" color={Color.Dark_4}>
            이미 OKU 회원이시라면?
          </Text>
          <Text subBody weight="700" textAlign="center" color={Color.Primary} marginT="5px" marginB="1rem" onClick={() => history.push("/login")}>
            로그인하러 가기
          </Text>
          {/* {isPostOpen && 
        <Modal>
          <ModalSection>
            <DaumPostcode onComplete={handleComplete} />
          </ModalSection>
          <ModalBack onClick={() => setIsPostOpen(false)}>
          </ModalBack>
        </Modal>
      } */}
        </Box>
      </Wrap>
    </>
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

  min-height: 580px;
  margin-bottom: 60px;
  /* height: 95vh; */
  box-sizing: border-box;
`;

const InfoUl = styled.ul`
  display: none;
  width: 250px;
  list-style-type: none;
  font-size: 12px;
  color: #ee3a57;
  position: relative;
  top: -6px;
  left: 6px;
  font-weight: 400;
`;

const SignupBox = styled.div`
  border: 1px solid ${Color.Light_3};
  border-radius: 12px;
  width: 100%;
  height: 45px;
  max-height: 45px;
  margin: 0.25rem 0;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  align-items: center;
  transition: border 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:focus-within {
    border: 1px solid ${Color.Primary};
    box-shadow: 0 0 0 3px ${Color.Primary}33;
  }
  svg {
    width: 26px;
    align-items: center;
    color: ${Color.Light_3};
    margin-right: 10px;
  }
`;

const SignupInput = styled.input`
  height: 100%;
  border: none;
  background-color: transparent;
  box-sizing: border-box;
  letter-spacing: 0.5px;
  overflow: hidden;
  color: #000;
  font-size: 16px;
  width: 90%;
  outline: none;
  padding-left: 10px;
  padding-right: 10px;
  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
    font-size: 12px;
    user-select: none;
  }
`;

const PwdInput = styled.input`
  height: 100%;
  border: none;
  background-color: transparent;
  box-sizing: border-box;
  letter-spacing: 0.5px;
  overflow: hidden;
  color: #000;
  font-size: 14px;
  width: 80%;
  outline: none;
  padding-left: 10px;
  padding-right: 10px;
  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
    font-size: 12px;
    user-select: none;
  }
`;

const IconSpan = styled.span`
  width: 26px;
  float: left;
  text-align: center;
  padding: 0 8px 0 0;
  color: rgba(0, 0, 0, 0.45);
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

// const Modal = styled.div`
//   display: flex;
//   align-items: center;
//   animation: modal-bg-show 0.3s;
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   z-index: 90;
//   background-color: rgba(0, 0, 0, 0.6);
// `;

// const ModalSection = styled.section`
//   width: 90%;
//   max-width: 450px;
//   margin: 0 auto;
//   border-radius: 0.3rem;
//   background-color: #fff;
//   /* 팝업이 열릴때 스르륵 열리는 효과 */
//   animation: modal-show 0.3s;
//   overflow: hidden;
//   z-index: 99;
// `;

// const ModalBack = styled.div`
//   display: flex;
//   align-items: center;
//   animation: modal-bg-show 0.3s;
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   z-index: 96;
//   background-color: transparent;
// `;

// const PostalBtn = styled.button`
//   width: 70px;
//   height: 24px;
//   float: right;
//   color: rgba(0, 0, 0, 0.4);
//   font-weight: 400;
//   text-align: center;
//   padding: 0 0 1px;
//   margin: 1px 0 0;
//   font-size: 12px;
//   cursor: pointer;
//   border: 1px solid rgba(0, 0, 0, 0.3);
//   border-radius: 3px;
//   background-color: transparent;

//   &:hover {
//     color: #fff;
//     border: none;
//     font-weight: 500;
//     background-color: #06afd6;
//   }
// `;

export default Signup;
