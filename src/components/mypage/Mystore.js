import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import { Color } from "shared/DesignSys";

const Mystore = () => {
  const my_selling = useSelector((state) => state.mypage.my_selling);
  const my_sold = useSelector((state) => state.mypage.my_sold);
  const my_review = [];

  return (
    <Wrap>
      <Box>
        <Text h2 textAlign="left">
          판매 중인 상품
        </Text>
        <List>
          {my_selling && my_selling.length > 0 ? (
            my_selling.map((s, idx) => (
              <Card key={idx}>
                <img alt={s.description} src={s.img[0]} />
                <p>{s.title}</p>
              </Card>
            ))
          ) : (
            <Text h4 color={Color.Dark_4}>
              판매 중인 상품이 없습니다.
            </Text>
          )}
        </List>
        <Button sub>더보기</Button>
      </Box>

      <Box>
        <Text h2 textAlign="left">
          판매 완료 상품
        </Text>
        <List>
          {my_sold && my_sold.length > 0 ? (
            my_sold.map((s, idx) => (
              <Card key={idx}>
                <img alt={s.description} src={s.img[0]} />
                {/* <p>{s.title}</p> */}
              </Card>
            ))
          ) : (
            <Text h4 color={Color.Dark_4}>
              판매 완료된 상품이 없습니다.
            </Text>
          )}
        </List>
        <Button sub>더보기</Button>
      </Box>

      <Box>
        <Text h2 textAlign="left">
          내 상점 후기
        </Text>
        <List>
          {my_review && my_review.length > 0 ? (
            my_review.map((r, idx) => (
              <Card key={idx}>
                <img alt={r.description} src={r.img[0]} />
                {/* <p>{r.title}</p> */}
              </Card>
            ))
          ) : (
            <Text h4 color={Color.Dark_4}>
              내 상점 후기가 없습니다.
            </Text>
          )}
        </List>
        <Button sub>더보기</Button>
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
  display: flex;
  justify-content: space-between;
  width: 100%;

  div {
    margin: 20px auto;
    text-align: center;
  }
`;

const Card = styled.div`
  width: 220px;
  height: 220px;
  img {
    border-radius: 16px;
    width: 220px;
    height: 220px;
    object-fit: cover;
    object-position: center;
  }
`;

export default Mystore;
