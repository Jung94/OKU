import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import { actionCreators as myActions } from "redux/modules/mypage";

import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";
import { Color } from "shared/DesignSys";

const Myinfo = () => {
  const dispatch = useDispatch();
  const { email, nickname, number } = useSelector((state) => state.mypage.user_info);

  return (
    <Wrap>
      <Box>
        <Text h2 textAlign="left">
          {nickname}님, 오늘도 <Hspan>즐거운 덕질하세요!</Hspan>
        </Text>
        <List>
          <Grid is_flex>
            <Grid width="15%"> 닉네임</Grid>
            <Grid>
              <Input value={nickname}></Input>
            </Grid>
          </Grid>
          <Grid is_flex>
            <Grid width="15%"> 이메일</Grid>
            <Grid>
              <Input value={email}></Input>
            </Grid>
          </Grid>

          <Grid is_flex>
            <Grid width="15%"> 전화번호</Grid>
            <Grid>
              <Input value={number}></Input>
            </Grid>
          </Grid>
        </List>
      </Box>
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 1030px;
  width: 100%;
  min-height: 180px;
  display: flex;
  gap: 50px;
  flex-direction: column;
`;

const Box = styled.div`
  width: 100%;
  min-height: 180px;
  padding: 30px 40px 30px 30px;
  display: flex;
  flex-direction: column;
  background-color: ${Color.Light_1};
  border-radius: 16px;
  & button {
    align-items: center;
    margin: 20px auto 0;
    padding: 0 30px;
    width: 14rem;
  }
`;

const List = styled.div`
  width: 100%;
  margin-top: 10px;
  div {
    margin: 2px auto;
    text-align: center;
  }
`;

const Hspan = styled.span`
  color: ${Color.Primary};
`;

export default Myinfo;
