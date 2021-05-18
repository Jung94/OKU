import React from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Text } from "elements/";


import RelatedProduct from "components/global/RelatedProduct";
import { history } from "redux/configureStore";

import { Color } from "shared/DesignSys";

const Myshop = (props) => {
  const dispatch = useDispatch();


  const my_like_list = useSelector((state) => state.like.my_like_list);
  // console.log(my_like_list);

  const my_buying_list = [];
  const my_chatting_list = [];

  return (
    <Wrap>
      <Box>
        <Text h2 textAlign="left">
          찜 목록
        </Text>
        {my_like_list && my_like_list.length > 0 ? (
          <>
            <List>
              {my_like_list.map((r, idx) => (
                <RelatedProduct
                  like
                  key={idx}
                  _id={r.productId}
                  img={r.productImage}
                  _onClick={() => {
                    history.push(`/product/detail/${r.productId}`);
                  }}
                />
              ))}
            </List>
          </>
        ) : (
          <Text h4 color={Color.Dark_4}>
            찜한 상품이 없습니다.
          </Text>
        )}
      </Box>

      <Box>
        <Text h2 textAlign="left">
          구매 목록
        </Text>
        {my_buying_list && my_buying_list.length > 0 ? (
          <>
            <List>
              {my_buying_list.map((r, idx) => (
                <RelatedProduct
                  like
                  key={idx}
                  _id={r.productId}
                  img={r.productImage}
                  _onClick={() => {
                    history.push(`/product/detail/${r.productId}`);
                  }}
                />
              ))}
            </List>
            <Text subBody color={Color.Dark_4}>
              더보기
            </Text>
          </>
        ) : (
          <Text h4 color={Color.Dark_4}>
            구매한 상품이 없습니다.
          </Text>
        )}
      </Box>

      <Box>
        <Text h2 textAlign="left">
          대화 목록
        </Text>
        {my_chatting_list && my_chatting_list.length > 0 ? (
          <>
            <List>
              {my_chatting_list.map((r, idx) => (
                <Card key={idx}>
                  <img alt={r.productId} src={r.productImage} />
                </Card>
              ))}
            </List>
            <Text subBody color={Color.Dark_4}>
              더보기
            </Text>
          </>
        ) : (
          <Text h4 color={Color.Dark_4}>
            대화 기록이 없습니다.
          </Text>
        )}
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
  gap: 10px;

  div {
    margin: 20px auto 40px auto;
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
