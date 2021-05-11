import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

const Myshop = (props) => {
  const _like_list = useSelector((state) => state.like.like_list);
  console.log(_like_list);
  return (
    <Wrap>
      <Text h3 textAlign="left">
        찜 목록
      </Text>
      <LikeBox>
        {_like_list &&
          _like_list.map((l, idx) => (
            <Card key={idx}>
              <img alt={l.productId} src={l.productImage} />
              {/* <p>{l.title}</p> */}
            </Card>
          ))}
      </LikeBox>
      <Text h3 textAlign="left">
        구매 목록
      </Text>
      <LikeBox></LikeBox>
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

const LikeBox = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  gap: 50px;
  width: 100%;
`;

const Card = styled.div`
  width: 220px;
  height: 220px;
  img {
    border-radius: 16px;
    width: 220px;
    height: 220px;
    object-fit: contain;
  }
`;

export default Myshop;
