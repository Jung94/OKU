import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import RelatedProduct from "components/global/RelatedProduct";
import { history } from "redux/configureStore";

import { Color } from "shared/DesignSys";

const Mystore = () => {
  const my_selling = useSelector((state) => state.mypage.my_selling);
  const my_sold = useSelector((state) => state.mypage.my_sold);
  const all_my = useSelector((state) => state.mypage.my_length);
  const my_review = [];

  const { nickname } = useSelector((state) => state.mypage.user_info);

  return (
    <Wrap>
      <Box>
        <TextAlign align="baseline">
          <Text h2 textAlign="left">
            {nickname}님의 상점
          </Text>
          <Text h4 textAlign="left">
            &ensp;&ensp;물품 수<b>{all_my}</b>
          </Text>
        </TextAlign>
        <Input text fix value={`안녕하세요. ${nickname}의 상점입니다.`} margin="10px 0 0 0" />
      </Box>

      <Box>
        <Text h2 textAlign="left">
          판매 중인 상품
        </Text>
        {my_selling && my_selling.length > 0 ? (
          <>
            <List>
              {my_selling.map((r, idx) => (
                <RelatedProduct
                  like
                  key={idx}
                  title={r.title}
                  lowBid={r.lowBid}
                  img={r.img[0]}
                  _id={r._id}
                  _onClick={() => {
                    history.push(`/product/detail/${r._id}`);
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
            판매 중인 상품이 없습니다.
          </Text>
        )}
      </Box>

      <Box>
        <Text h2 textAlign="left">
          판매 완료 상품
        </Text>
        {my_sold && my_sold.length > 0 ? (
          <>
            <List>
              {my_sold.map((r, idx) => (
                <RelatedProduct
                  like
                  key={idx}
                  title={r.title}
                  lowBid={r.lowBid}
                  img={r.img[0]}
                  _id={r._id}
                  _onClick={() => {
                    history.push(`/product/detail/${r._id}`);
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
            판매 완료된 상품이 없습니다.
          </Text>
        )}
      </Box>

      <Box>
        <Text h2 textAlign="left">
          내 상점 후기
        </Text>
        <List>
          {my_review && my_review.length > 0 ? (
            <>
              <List>
                {my_review.map((r, idx) => (
                  <Card key={idx}>
                    <img alt={r.description} src={r.img[0]} />
                  </Card>
                ))}
              </List>
              <Text subBody color={Color.Dark_4}>
                더보기
              </Text>
            </>
          ) : (
            <Text h4 color={Color.Dark_4}>
              내 상점 후기가 없습니다.
            </Text>
          )}
        </List>
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
  border-radius: 12px;
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
    border-radius: 12px;
    width: 220px;
    height: 220px;
    object-fit: cover;
    object-position: center;
  }
`;

const TextAlign = styled.div`
  align-items: ${(props) => props.align};
  display: flex;
`;

export default Mystore;
