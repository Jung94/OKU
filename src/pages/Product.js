import React from "react";
import styled from "styled-components";
import { Grid, Line } from "elements/";

const Product = (props) => {
  return (
    <Grid is_flex column textAlign="center" bg="#fff" padding="0">
      <Grid is_flex width="100%" margin="0 0 10px 0">
        <Grid width="50%" margin="0 5px 0 0">
          <Grid height="400px" margin="0 10px 10px 0" bg="#dedede">
            제품사진
          </Grid>
          <Grid margin="0 10px 10px 0" bg="#dedede" padding="10px">
            <DTitle>상품정보</DTitle>
            <Grid padding="10px">주루룩</Grid>
          </Grid>
          <Grid margin="0 10px 0 0" bg="#dedede" padding="10px">
            <DTitle>관련 상품</DTitle>
            <ImgWrap>
              <div>사진</div>
              <div>사진</div>
              <div>사진</div>
            </ImgWrap>
          </Grid>
        </Grid>
        <Grid width="50%" margin="0 0 0 5px">
          <Grid is_flex margin="0 10px 10px 0" padding="10px" bg="#dedede">
            <h3>남은시간</h3>
            <Grid justify="space-between">00일 00:00:00</Grid>
          </Grid>
          <Grid is_flex column margin="0 10px 0 0" padding="10px" bg="#dedede">
            <Grid>
              <DTitle big>제품명</DTitle>
              <Grid margin="0 0 5% 0" bg="#dedede">
                제품명/ 실시간 낙찰정보 / 판매자
              </Grid>
            </Grid>
            <Grid>
              <DTitle>현재 입찰 가격</DTitle>
              <DTitle>실시간 낙찰 정보</DTitle>
              <LiveBid margin="5%">
                <p>니코니코니&thinsp;님</p>
                <p className="bidPrice">30,000</p>
                <p className="timeStamp">2분전</p>
              </LiveBid>
              <LiveBid margin="5%">
                <p>니코니&thinsp;님</p>
                <p className="bidPrice">30,000</p>
                <p className="timeStamp">1시간전</p>
              </LiveBid>
              더보기
            </Grid>
            <Grid>
              <DTitle>판매자 정보</DTitle>
              <Seller>
                <Grid is_flex margin="0 auto">
                  <div className="profile"></div>
                  <div style={{ textAlign: "left" }}>
                    <h3>경민띠</h3>
                    <h6>상품&thinsp;00&emsp;찜&thinsp;00</h6>
                  </div>
                </Grid>
                <Line bottom margin="0 0 10px 0" />
                상점으로 이동하기&ensp;>
              </Seller>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid is_flex column height="150px" margin="0 0 10px 0">
        <DTitle>상품 문의</DTitle>
        문의들
      </Grid>
    </Grid>
  );
};

const ImgWrap = styled.div`
  box-sizing: border-box;
  overflow: auto;
  display: flexbox;
  padding: 10px;
  min-height: min-content;
  div {
    width: 140px;
    height: 140px;
    background-color: white;
    margin-right: 5px;
  }
`;

const DTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: red;
  text-align: left;
  font-weight: 700;
  margin-bottom: 1%;
  ${(props) => (props.big ? "font-size:1.8rem;" : "font-size: 1.2rem;")}
`;

// 실시간 낙찰 정보
const LiveBid = styled.div`
  margin-bottom: 1%;
  width: 100%;
  padding: 3%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  //확인용
  background-color: white;
  p:nth-child(1) {
    font-weight: 700;
    width: 30%;
    text-align: left;
    padding: auto;
    background-color: red;
  }
  .bidPrice {
    width: 50%;
    font-size: 25px;
    font-weight: 700;
    text-align: left;
    background-color: red;
  }
  .timeStamp {
    width: 15%;
    text-align: right;
    font-size: 12px;
    font-weight: 500;
    background-color: red;
  }
`;

const Seller = styled.div`
  width: 100%;
  background-color: white;
  padding: 3%;
  display: flex;
  flex-direction: column;

  .profile {
    width: 60px;
    height: 60px;
    margin: 2%;
    background-color: red;
    border-radius: 10rem;
  }
`;

export default Product;
