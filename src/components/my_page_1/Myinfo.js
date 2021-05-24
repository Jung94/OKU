import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { actionCreators as mypageActions } from "redux/modules/mypage";
import { actionCreators as likeActions } from "redux/modules/like";

import { Color } from "shared/DesignSys";

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

const Myinfo = () => {
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("access_token");
  const _user = useSelector((state) => state.mypage.user);
  const userInfo = useSelector((state) => state.mypage.user_info);

  useEffect(() => {
    if (access_token) {
      dispatch(mypageActions.setProfileAPI());
      dispatch(mypageActions.setInfoAPI());
      dispatch(mypageActions.setMystoreAPI());
      dispatch(likeActions.getMyLikeListAPI());
    }
  }, []);
  const [Modifyhowing, setModifyShowing] = useState(false);

  const ModifyShowing = () => setModifyShowing(!Modifyhowing);

  if (!Modifyhowing) {
    return (
      <Wrap>
        <Head>
          <Text h2 weight="500" textAlign="left">
            회원정보
          </Text>
          {/* <Modify onClick={ModifyShowing}>수정하기</Modify> */}
        </Head>
        <Box>
          <Info>
            <Title>닉네임</Title>
            <Blank disabled placeholder={`${userInfo.nickname}`} />
          </Info>
          <Info>
            <Title>이메일</Title>
            <Blank disabled placeholder={`${userInfo?.email ? userInfo.email : "-"}`} />
          </Info>
          {/* <Info>
              <Title>비밀번호</Title>
              <Blank disabled type="password" />
            </Info> */}
          {/* <Info>
            <Title>전화번호</Title>
            <Blank disabled placeholder={`${userInfo.number}`} />
          </Info> */}
        </Box>
      </Wrap>
    );
  } else {
    return (
      <Wrap>
        <Head>
          <Text h1 textAlign="left">
            회원정보
          </Text>
          {/* <Modify onClick={ModifyShowing}>완료하기</Modify> */}
        </Head>
        <Box>
          <Info>
            <Title>닉네임</Title>
            <Blank placeholder={`${userInfo.nickname}`} />
          </Info>
          <Info>
            <Title>이메일</Title>
            <Blank disabled placeholder={"서비스 준비중."} />
          </Info>
          {/* <Info>
              <Title>비밀번호</Title>
              <Blank disabled placeholder={"서비스 준비중."} />
            </Info>
            <Info>
              <Title>비밀번호확인</Title>
              <Blank disabled placeholder={"서비스 준비중."} />
            </Info> */}
          {/* <Info>
            <Title>전화번호</Title>
            <Blank disabled placeholder={"서비스 준비중."} />
          </Info> */}
        </Box>
      </Wrap>
    );
  }
};

const H2 = "20px";
const Body = "14px";
const Sub = "12px";

const Wrap = styled.div`
  max-width: 1030px;
  width: 100%;
  margin-top: 25px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 10px;

  @media only screen and (max-width: 767px) {
    div:nth-child(1) {
      font-size: ${H2};
    }
  }
`;

const Modify = styled.div`
  cursor: pointer;
  font-size: ${Sub};
`;

const Box = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 15px;
  gap: 10px;

  background: ${Color.Light_1};
  border-radius: 12px;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16);
`;

const Info = styled.div`
  align-items: center;
  display: flex;

  height: 45px;
  width: 100%;
`;

const Title = styled.p`
  max-width: 120px;
  width: 30%;
  height: 45px;
  display: flex;
  align-items: center;
  margin: auto 0;

  text-align: left;
  font-size: ${Body};
`;

const Blank = styled.input`
  width: 100%;
  height: 45px;
  padding: 10px;
  align-items: center;

  text-align: left;
  font-size: ${Body};

  border-radius: 12px;

  border: 0;
  outline: none;

  background-color: white;
`;

export default Myinfo;
