import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import { useSelector, useDispatch } from "react-redux";

import { actionCreators as mypageActions } from "redux/modules/mypage";
import { actionCreators as likeActions } from "redux/modules/like";

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
      <Grid>
        <Head>
          <Text h2 textAlign="left">
            회원정보
          </Text>
          <Modify onClick={ModifyShowing}>수정하기</Modify>
        </Head>
        <InfoBox>
          <InnerBox>
            <Info>
              <Title>닉네임</Title>
              <Blank disabled placeholder={`${userInfo.nickname}`}></Blank>
            </Info>
            <Info>
              <Title>아이디</Title>
              <Blank disabled placeholder={`${userInfo.email}`}></Blank>
            </Info>
            <Info>
              <Title>비밀번호</Title>
              <Blank disabled type="password"></Blank>
            </Info>
            <Info>
              <Title>전화번호</Title>
              <Blank disabled placeholder={`${userInfo.number}`} />
            </Info>
          </InnerBox>
        </InfoBox>
      </Grid>
    );
  } else {
    return (
      <Grid>
        <Head>
          <Text h2 textAlign="left">
            회원정보
          </Text>
          <Modify onClick={ModifyShowing}>완료하기</Modify>
        </Head>
        <InfoBox>
          <InnerBox>
            <Info>
              <Title>닉네임</Title>
              <Blank placeholder={`현재 닉네임 : ${userInfo.nickname}`}></Blank>
            </Info>
            <Info>
              <Title>아이디</Title>
              <Blank placeholder={`현재 아이디 : ${userInfo.email}`}></Blank>
            </Info>
            <Info>
              <Title>비밀번호</Title>
              <Blank placeholder={"새로운 비밀번호를 입력해주세요."}></Blank>
            </Info>
            <Info>
              <Title>비밀번호확인</Title>
              <Blank placeholder={"한번 더 입력해주세요."}></Blank>
            </Info>
            <Info>
              <Title>전화번호</Title>
              <Blank placeholder={`현재 전화번호 : ${userInfo.number}`} />
            </Info>
          </InnerBox>
        </InfoBox>
      </Grid>
    );
  }
};

const Grid = styled.div``;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1030px;
  margin: 25px auto 19px;
`;

const Modify = styled.div`
  font-size: 16px;
  margin: 20px;
  cursor: pointer;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1030px;
  background: #f8f8f8;
  border-radius: 16px;
  box-sizing: border-box;
  height: 326px;
`;

const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  height: 80%;
  width: 90%;
`;

const Info = styled.div`
  display: flex;
  max-width: 1030px;
  height: 50px;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 16px;
  height: 50px;
  padding: 12.5px;
`;

const Blank = styled.input`
  border: 1px solid #eee;
  border-radius: 8px;
  width: 806px;
  height: 50px;
  font-size: 16px;
  outline: none;
`;

export default Myinfo;
