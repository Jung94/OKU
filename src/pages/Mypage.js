import React from "react";
import styled from "styled-components";
import { Grid, Input, Line, Button, Tag, Modal, Text } from "elements/";

const Mypage = (props) => {
  return (
    <MypageWrap>
      <Profile></Profile>
      <Text title textAlign="center">
        홍길동
      </Text>
      <Grid is_flex>
        <Button primaryNoBorder>마이 쇼핑</Button>
        <Button primaryNoBorder>내 상점</Button>
        <Button primaryNoBorder>알림</Button>
        <Button primaryNoBorder>회원 정보</Button>
      </Grid>
      <Grid is_flex column bg="#eee" padding="1%" margin="5% 0 0 0">
        <Text title>찜 목록</Text>
        <Grid is_flex justify="space-between">
          <Thumnail></Thumnail>
          <Thumnail></Thumnail>
          <Thumnail></Thumnail>
          <Thumnail></Thumnail>
        </Grid>
      </Grid>
      <Grid is_flex column bg="#eee" padding="1%" margin="5% 0 0 0">
        <Text title>구매 목록</Text>
        <Grid is_flex justify="space-between">
          <Thumnail></Thumnail>
          <Thumnail></Thumnail>
          <Thumnail></Thumnail>
          <Thumnail></Thumnail>
        </Grid>
      </Grid>
      <Grid is_flex column bg="#eee" padding="1%" margin="5% 0 0 0">
        <Text title>대화 목록</Text>
        <Grid is_flex justify="space-between">
          <Thumnail></Thumnail>
          <Thumnail></Thumnail>
          <Thumnail></Thumnail>
          <Thumnail></Thumnail>
        </Grid>
      </Grid>
    </MypageWrap>
  );
};

const MypageWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`;

const Profile = styled.div`
  min-width: 150px;
  height: 150px;
  margin: 2%;
  background-color: #f112ff;
  border-radius: 50%;
`;

const Thumnail = styled.div`
  flex-wrap: wrap;
  width: 10rem;
  height: 10rem;
  margin: 1%;
  background-color: #fff;
`;

export default Mypage;
