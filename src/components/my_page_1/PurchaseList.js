import React from "react";
import styled from "styled-components";

import { Text } from "elements/";
import { Color } from "shared/DesignSys";

const PurchaseList = () => {
  return (
    <Wrap>
      <Text h1 textAlign="left">
        구매 목록
      </Text>

      <Box>
        <Blank>
          <Text subBody color={Color.Dark_4}>
            구매 목록이 없습니다!
          </Text>
        </Blank>
        {/*  <Item>
          <Left>
            <Img>이미지</Img>
          </Left>
          <Right>
            <Top>
              <Title>이거 꼭 사세요</Title>
            </Top>
            <Bottom>
              <Bid>1,000원</Bid>
              <Date>1일 전</Date>
            </Bottom>
          </Right>
        </Item>
        <Item>
          <Left>
            <Img>이미지</Img>
          </Left>
          <Right>
            <Top>
              <Title>글제목</Title>
            </Top>
            <Bottom>
              <Bid>입찰가</Bid>
              <Date>2일 전</Date>
            </Bottom>
          </Right>
        </Item>
        <Item>
          <Left>
            <Img>이미지</Img>
          </Left>
          <Right>
            <Top>
              <Title>귀여운 인형</Title>
            </Top>
            <Bottom>
              <Bid>14,000원</Bid>
              <Date>2일 전</Date>
            </Bottom>
          </Right>
        </Item>
        <Item>
          <Left>
            <Img>이미지</Img>
          </Left>
          <Right>
            <Top>
              <Title>글제목</Title>
            </Top>
            <Bottom>
              <Bid>입찰가</Bid>
              <Date>2일 전</Date>
            </Bottom>
          </Right>
        </Item>
        <Item>
          <Left>
            <Img>이미지</Img>
          </Left>
          <Right>
            <Top>
              <Title>글제목</Title>
            </Top>
            <Bottom>
              <Bid>입찰가</Bid>
              <Date>8일 전</Date>
            </Bottom>
          </Right>
        </Item>
        <Item>
          <Left>
            <Img>이미지</Img>
          </Left>
          <Right>
            <Top>
              <Title>글제목</Title>
            </Top>
            <Bottom>
              <Bid>입찰가</Bid>
              <Date>10일 전</Date>
            </Bottom>
          </Right>
        </Item> */}
      </Box>
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 1030px;
  width: 100%;
  min-height: 180px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  margin-top: 129px;
`;

const Blank = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  width: 100%;
  min-height: 180px;
  padding: 30px 40px 30px 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  flex-direction: column;
  background-color: ${Color.Light_1};
  border-radius: 12px;
`;

const Item = styled.div`
  width: 440px;
  height: 100px;
  background: #ffffff;
  display: flex;
  border-radius: 8px;
`;
const Left = styled.div``;
const Right = styled.div``;
const Top = styled.div`
  margin: 15px 0 11px 15px;
  text-align: left;
`;
const Bottom = styled.div`
  display: flex;
  margin: 11px 0 0 15px;
  justify-content: space-between;
  width: 315px;
`;
const Img = styled.div`
  text-align: left;
  width: 75px;
  height: 74px;
  background: #f8f8f8;
  margin: 10px 10px;
  border-radius: 9px;
`;

const Title = styled.div`
  width: 119px;
  font-weight: bold;
`;
const Bid = styled.div`
  font-weight: bold;
`;
const Date = styled.div`
  color: #a2a2a2;
`;

export default PurchaseList;
