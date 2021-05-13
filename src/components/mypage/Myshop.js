import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import { Color } from "shared/DesignSys";

const Myshop = (props) => {
  const my_like_list = useSelector((state) => state.like.my_like_list);
  // console.log(my_like_list);

  const my_buying_list = [];

  return (
    <Wrap>
      <Box>
        <Text h2 textAlign="left">
          찜 목록
        </Text>
        <List>
          {my_like_list && my_like_list.length > 0 ? (
            my_like_list.map((l, idx) => (
              <Card key={idx}>
                <img alt={l.productId} src={l.productImage} />
                {/* <p>{l.title}</p> */}
              </Card>
            ))
          ) : (
            <Text h4 color={Color.Dark_4}>
              찜한 상품이 없습니다.
            </Text>
          )}
        </List>
        <Button sub>더보기</Button>
      </Box>
      <Box>
        <Text h2 textAlign="left">
          구매 목록
        </Text>
        <List>
          {my_buying_list && my_buying_list.length > 0 ? (
            my_buying_list.map((l, idx) => (
              <Card key={idx}>
                <img alt={l.productId} src={l.productImage} />
              </Card>
            ))
          ) : (
            <Text h4 color={Color.Dark_4}>
              구매한 상품이 없습니다.
            </Text>
          )}
        </List>
        <Button sub>더보기</Button>
      </Box>
      <Box>
        <Text h2 textAlign="left">
          대화 목록
        </Text>
        <List>
          {my_buying_list && my_buying_list.length > 0 ? (
            my_buying_list.map((l, idx) => (
              <Card key={idx}>
                <img alt={l.productId} src={l.productImage} />
              </Card>
            ))
          ) : (
            <Text h4 color={Color.Dark_4}>
              대화 대상이 없습니다.
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

export default Myshop;
