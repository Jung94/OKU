import React, { useEffect } from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Container from "components/Container";
import Post from "components/Post";
import DeadlineP from "components/DeadlineP";
import Card from "components/Card";

import { actionCreators as headerActions } from "redux/modules/header";

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(headerActions.setHeader(true));
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Container />
      <Post />
      <DeadlineP />
      <Card />
    </div>
  );
};

export default Home;
