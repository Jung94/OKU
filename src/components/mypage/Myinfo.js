import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import { actionCreators as myActions } from "redux/modules/mypage";

import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";
import { Color } from "shared/DesignSys";

const Myinfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 여기서 컴포넌트 useEffect 실행하고, 자식 컴포넌트에서 useEffect실행하면 무한루프에 빠진다 -> 공부포인트
  }, []);

  return <Grid></Grid>;
};

export default Myinfo;
