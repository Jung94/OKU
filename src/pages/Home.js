import React, { useEffect } from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Container from "components/Container";
import Post from "components/Post";
import DeadlineP from "components/DeadlineP";
import Card from "components/Card";

import { useMediaQuery } from "react-responsive";

import { actionCreators as headerActions } from "redux/modules/header";

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(headerActions.setHeader(true));
  }, []);

  return (
    <Wrap>
      <Container />
      <Post />
      <DeadlineP />
      <Card />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
`;

export default Home;
