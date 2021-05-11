import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

const Mystore = () => {
  const my_selling = useSelector((state) => state.mypage.my_selling);
  const my_sold = useSelector((state) => state.mypage.my_sold);
  const my_review = [];

  return (
    <Wrap>
      <Text h3 textAlign="left">
        판매 중인 상품
      </Text>
      <StoreBox>
        {my_selling &&
          my_selling.map((s, idx) => (
            <Card key={idx}>
              <img alt={s.description} src={s.img[0]} />
              <p>{s.title}</p>
            </Card>
          ))}
      </StoreBox>
      <Text h3 textAlign="left">
        판매 완료 상품
      </Text>
      <StoreBox>
        {my_sold &&
          my_sold.map((s, idx) => (
            <Card key={idx}>
              <img alt={s.description} src={s.img[0]} />
              <p>{s.title}</p>
            </Card>
          ))}
      </StoreBox>
      <Text h3 textAlign="left">
        내 상점 후기
      </Text>

      <ReviewBox>
        {my_review &&
          my_review.map((r, idx) => (
            <Review key={idx}>
              <img alt={r.description} src={r.img[0]} />
              <p>{r.title}</p>
            </Review>
          ))}
      </ReviewBox>
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

const StoreBox = styled.div`
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

const ReviewBox = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  gap: 50px;
  width: 100%;
`;

const Review = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 100%;
  background: #fff;
`;

export default Mystore;
