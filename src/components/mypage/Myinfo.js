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
      <Text h4>
        {email}
        <br />
        {nickname}
        <br />
        {number}
      </Text>
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

export default Myinfo;
