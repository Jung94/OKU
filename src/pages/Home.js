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

  const _recommend_product = useSelector((state) => state.post.recommend_product);
  const _deadline_product = useSelector((state) => state.post.deadline_product);

  return (
    <div style={{ width: "100%" }}>
      <Container />
      {_recommend_product && _recommend_product.length > 0 && <Post />}
      {_deadline_product && _deadline_product.length > 0 && <DeadlineP />}
      <Card />
    </div>
  );
};

export default Home;
