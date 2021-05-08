import React, { useRef, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { history } from 'redux/configureStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from 'redux/modules/user';
import { emailCheck } from 'shared/common';

import { faEye as farEye } from '@fortawesome/free-regular-svg-icons'
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons'
import { faEnvelope as farEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faEyeSlash as farEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faAddressCard as farAddressCard } from '@fortawesome/free-regular-svg-icons'
import { faUser, faLock, faEnvelope, faPhone, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import DaumPostcode from 'react-daum-postcode';

const Signup = (props) => {

  const dispatch = useDispatch();

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "50px",
    zIndex: "100",
    padding: "7px"
  };

  const [show, setShow] = React.useState(false);  // show = 비밀번호 인풋에 작성한 비밀번호
  const [show2, setShow2] = React.useState(false);  // show2 = 비밀번호 확인 인풋에 작성한 비밀번호

  // 비밀번호 인풋 내용 보기
  const changeEye = () => {
      setShow(show? false : true);
  };

  // 비밀번호 확인 인풋 내용 보기
  const changeEye2 = () => {
      setShow2(show2? false : true);
  };

  const [email, setEmail] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [pwCheck, setPwCheck] = React.useState('');
  const [nickName, setNickName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  
  // const [postalAddress, setPostalAddress] = React.useState('');
  // const [address, setAddress] = React.useState('');
  // const [detailAddress, setDetailAddress] = React.useState('');

  // 회원가입 버튼 클릭 시
  const signUp = () => {
    if (email === "" || pw === "" || pwCheck === "" || nickName === "" || phone === "") {
      alert('입력되지 않은 항목이 있습니다.');
      return;
    }
    
    if (pw !== pwCheck) {
      alert('비밀번호를 확인해주세요.');
      return;
    }

    dispatch(userActions.signupAPI(email, pw, pwCheck, nickName, phone));
  }

  // 이메일 사용 가능 여부 확인. 이메일 인풋 포커스 아웃 시
  const checkEmailAPI = (email) => {
    
    const API = `http://3.35.137.38/user/signup/email/${email}`;
    fetch(API)
    .then((res) => res.json())
    .then((res) => {
      let result = res.result;
      if (result === false) {
        emailInfo.current.style.color = '#ee3a57';
        setMessageEmail('·이미 등록된 이메일입니다. 다시 작성해 주십시오!');

      } else {
        setMessageEmail('·사용이 가능한 이메일입니다.');
        emailInfo.current.style.color = '#06afd6';
      }
    });
  }

  // 닉네임 사용 가능 여부 확인. 이메일 인풋 포커스 아웃 시
  const checkNicknameAPI = (nickname) => {

    const API = `http://3.35.137.38/user/signup/nickname/${nickname}`;
    fetch(API)
    .then((res) => res.json())
    .then((res) => {
      let result = res.result;
      if (result === false) {
        nicknameInfo.current.style.color = '#ee3a57';
        setMessageNickname('·이미 등록된 닉네임입니다. 다시 작성해 주십시오!');

      } else {
        setMessageNickname('·사용이 가능한 닉네임입니다.');
        nicknameInfo.current.style.color = '#06afd6';
      }
    });
  }
  
  const emailInfo = useRef();
  const pwInfo = useRef();
  const pwCheckInfo = useRef();
  const nicknameInfo = useRef();
  const phoneInfo = useRef();
  
  // const postalAddressInfo = useRef();
  // const addressInfo = useRef();
  // const detailAddressInfo = useRef();
  
  const [messageEmail, setMessageEmail] = React.useState('');
  const [messagePw, setMessagePw] = React.useState('');
  const [messagePwCheck, setMessagePwCheck] = React.useState('');
  const [messageNickname, setMessageNickname] = React.useState('');
  const [messagePhone, setMessagePhone] = React.useState('');
  
  // const [messagePostalAddress, setMessagePostalAddress] = React.useState('');
  // const [messageAddress, setMessageAddress] = React.useState('');
  // const [messageDetailAddress, setMessageDetailAddress] = React.useState('');

  // 이메일 작성 없을 경우 또는 이메일 형식에 맞지 않을 경우, 포커스 아웃 되면 동작
  const checkEm = () => {
    if (email === '') {
      setMessageEmail('·이메일을 입력해주세요.');
      emailInfo.current.style.color = '#ee3a57';
      emailInfo.current.style.display = 'block';
      return;
    } else {
      emailInfo.current.style.display = 'none';
    }

    if (!emailCheck(email)) {
      setMessageEmail('·이메일 형식을 지켜주세요!');
      emailInfo.current.style.color = '#ee3a57';
      emailInfo.current.style.display = 'block';
      return;
    } else {
      emailInfo.current.style.display = 'none';
    }
    emailInfo.current.style.display = 'block';
    checkEmailAPI(email);
  }

  // 비밀번호 작성 없이 포커스 아웃 되었을 때
  const checkPw = () => {
    if (pw === '') {
      setMessagePw('·비밀번호를 입력해주세요.');
      pwInfo.current.style.display = 'block';
      return;
    } else {
      pwInfo.current.style.display = 'none';
    }
  }

  // 비밀번호 확인 작성 없을 경우 또는 앞서 작성한 비밀번호 내용과 다를 경우, 포커스 아웃 되었을 때
  const doubleCheckPw = () => {
    if (pwCheck === '') {
      setMessagePwCheck('·한 번 더 비밀번호를 입력해주세요.');
      pwCheckInfo.current.style.display = 'block';
      return;
    } else {
      pwCheckInfo.current.style.display = 'none';
    }

    if (pw !== pwCheck) {
      setMessagePwCheck('·동일한 비밀번호를 입력해주세요.');
      pwCheckInfo.current.style.display = 'block';
      return;
    } else {
      pwCheckInfo.current.style.display = 'none';
    }
  }

  // 닉네임 작성 없이 포커스 아웃 되었을 때
  const checkNickname = () => {
    if (nickName === '') {
      setMessageNickname('·닉네임을 입력해주세요.');
      nicknameInfo.current.style.display = 'block';
      return;
    } else {
      nicknameInfo.current.style.display = 'none';
    }
    nicknameInfo.current.style.display = 'block';
    checkNicknameAPI(nickName);
  }

  // 전화번호 작성 없이 포커스 아웃 되었을 때
  const checkPhone = () => {
    if (phone === '') {
      setMessagePhone('·전화번호를 입력해주세요.');
      phoneInfo.current.style.display = 'block';
      return;
    } else {
      phoneInfo.current.style.display = 'none';
    }
  }

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
  
  

  return (
    <Wrap>
      <Title>회원가입</Title>

      <SignupBox>
        <IconSpan style={{margin: "2px 0 0"}}>
          <FontAwesomeIcon icon={farEnvelope} />
        </IconSpan>
        <SignupInput type="text" placeholder="이메일" onChange={(e) => { setEmail(e.target.value) }} onBlur={checkEm}></SignupInput>
      </SignupBox>
      <InfoUl ref={emailInfo}>
        <li>{messageEmail}</li>
      </InfoUl>

      <SignupBox>
        <IconSpan>
          <FontAwesomeIcon icon={faLock} />
        </IconSpan>
        <PwdInput type={show? "text" : "password"} placeholder="비밀번호" onChange={(e) => { setPw(e.target.value) }} onBlur={checkPw}>
        </PwdInput>
        <IconEyeSpan onClick={changeEye}>

          {show? <FontAwesomeIcon icon={farEyeSlash} /> : <FontAwesomeIcon icon={farEye} />}
        </IconEyeSpan>
      </SignupBox>
      <InfoUl ref={pwInfo}>
        <li>{messagePw}</li>
      </InfoUl>

      <SignupBox>
        <IconSpan>
          <FontAwesomeIcon icon={faLock} />
        </IconSpan>
        <PwdInput type={show2? "text" : "password"} placeholder="비밀번호 확인" onChange={(e) => { setPwCheck(e.target.value) }} onBlur={doubleCheckPw}>
        </PwdInput>
        <IconEyeSpan onClick={changeEye2}>
          
          {show2? <FontAwesomeIcon icon={farEyeSlash} /> : <FontAwesomeIcon icon={farEye} />}
        </IconEyeSpan>
      </SignupBox>
      <InfoUl ref={pwCheckInfo}>
        <li>{messagePwCheck}</li>
      </InfoUl>

      <SignupBox>
        <IconSpan>
          <FontAwesomeIcon icon={farUser} />
        </IconSpan>
        <SignupInput type="text" placeholder="닉네임" onChange={(e) => { setNickName(e.target.value) }} onBlur={checkNickname}></SignupInput>
      </SignupBox>
      <InfoUl ref={nicknameInfo}>
        <li>{messageNickname}</li>
      </InfoUl> 

      <SignupBox>
        <IconSpan>
          <FontAwesomeIcon icon={faPhone} />
        </IconSpan>
        <SignupInput type="text" placeholder="전화번호" onChange={(e) => { setPhone(e.target.value) }} onBlur={checkPhone}></SignupInput>
      </SignupBox>
      <InfoUl ref={phoneInfo}>
        <li>{messagePhone}</li>
      </InfoUl> 

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
      
      <SignupButton onClick={signUp} >회원가입</SignupButton>

      <LoginBox>
        <LoginLink onClick={() => history.push('/login')} >로그인</LoginLink>
      </LoginBox>

      {/* {isPostOpen && 
        <Modal>
          <ModalSection>
            <DaumPostcode onComplete={handleComplete} />
          </ModalSection>
          <ModalBack onClick={() => setIsPostOpen(false)}>
          </ModalBack>
        </Modal>
      } */}
      
    </Wrap>
  );
}

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

const Wrap = styled.div`
  width: 280px;
  margin: 192px auto 0;
  padding: 50px 0;
  box-sizing: border-box;
`;

const Title = styled.h3`
  font-weight: 500;
  font-size: 21px;
  width: 100%;
  text-align: center;
  margin: 0 0 30px;
`;

const SignupBox = styled.div`
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  width: 100%;
  height: 46px;
  margin: 0 0 15px;
  padding: 8px 0;
  box-sizing: border-box;
  overflow: hidden;

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

const SignupInput = styled.input`
  border: none;
  background-color: transparent;
  box-sizing: border-box;
  letter-spacing: -.05em;
  letter-spacing: 0.5px;
  overflow: hidden;
  color: #000;
  font-size: 14px;
  outline: none;

  ${(props) => props.postal ? "width: 50%;" : "width: 80%;"}
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-size: 0.8rem;
  }
`;

const PwdInput = styled.input`
  border: none;
  background-color: transparent;
  box-sizing: border-box;
  letter-spacing: -.05em;
  letter-spacing: 0.5px;
  overflow: hidden;
  color: #000;
  font-size: 14px;
  width: 76%;
  outline: none;

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-size: 0.8rem;
  }
`;

const SignupButton = styled.button`
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

const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 18px 0 0;
`;

const LoginLink = styled.a`
  display: inline-block;
  text-align: center;
  width: 36px;
  cursor: pointer;
  font-size: 12.5px;
  color: rgba(204, 204, 204, 0.8);
  border-bottom: 1px solid rgba(204, 204, 204, 0.8);
  &:hover {
      transition: 0.2s;
    color: rgba(204, 204, 204);
  }
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

