import React from "react";
import styled from "styled-components";
import { Grid, Input, Line, Button, Tag } from "elements/";
import { Slider } from "components/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as farQC } from "@fortawesome/free-regular-svg-icons";
import { faQuestionCircle as fasQC, faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";

const Product = (props) => {
  return (
    <Grid is_flex column textAlign="center" bg="#fff" padding="0">
      <Slider />
      <Grid is_flex width="100%" height="100%" margin="0 0 10px auto">
        <Grid width="50%" margin="0 5px 0 0">
          <Grid margin="0 10px 10px 0" bg="#dedede">
            제품사진
          </Grid>
          <Grid margin="0 10px 10px 0" bg="#dedede" padding="10px">
            <DTitle>상품정보</DTitle>
            <Grid is_flex padding="10px">
              <Grid flexGrow="2">
                <DTitle sm>
                  상품상태
                  <FontAwesomeIcon icon={fasQC} />
                </DTitle>
                A급
              </Grid>
              <Grid flexGrow="5">
                <DTitle sm>거래 지역</DTitle>
                서울역 3번 출구
              </Grid>
              <Grid flexGrow="2">
                <DTitle sm>배송비</DTitle>0
              </Grid>
            </Grid>

            <Grid is_flex padding="10px">
              <DTitle sm>상품 설명</DTitle>
              상품 설명~~~~~~~~~~~~~~
            </Grid>
            <Grid is_flex>
              <Tag>피규어</Tag>
              <Tag>귀멸의 칼날</Tag>
              <Tag>직거래</Tag>
            </Grid>
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
            <DTitle>
              <Grid width="45%">남은시간</Grid>
              <Grid justify="space-between">00일 00:00:00</Grid>
            </DTitle>
          </Grid>
          <Grid is_flex column margin="0 10px 0 0" padding="10px" bg="#dedede">
            <Grid>
              <DTitle big>제품명</DTitle>
              <BidLabel>
                <DTitle sm>현재 입찰 가격 </DTitle>
                <Grid is_flex justify="space-between">
                  <h2>000,000,000원</h2>
                  <FontAwesomeIcon icon={fasHeart} style={{ margin: "0 1%", "&:hover": { color: "#F112FF" } }} />
                </Grid>
                <Line bottom />
                <h6>상품&thinsp;00&emsp;찜&thinsp;00</h6>
                <DTitle sm>
                  최소 낙찰/입찰가
                  <FontAwesomeIcon icon={fasQC} />
                </DTitle>
                <Input adornment="원" plcholder="채워줭"></Input>
                <DTitle sm>
                  즉시 낙찰가
                  <FontAwesomeIcon icon={fasQC} />
                </DTitle>
                <Input adornment="원" plcholder="입력해"></Input>
                <h6>* 이 가격을 제안하면 즉시 구매 가능합니다.</h6>
                <div style={{ textAlign: "center" }}>
                  <Button>즉시 낙찰하기</Button>&emsp;
                  <Button>입찰표 작성하기</Button>
                </div>
                <Line bottom />
              </BidLabel>
            </Grid>
            <Grid padding="0 0 10px 0">
              <DTitle>
                실시간 낙찰 정보
                <FontAwesomeIcon icon={fasQC} />
              </DTitle>
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
              <DTitle sm column>
                더보기
              </DTitle>
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
                <DTitle sm column>
                  상점으로 이동하기&ensp;>
                </DTitle>
              </Seller>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid is_flex column height="1500px" margin="0 0 10px 0">
        <DTitle>상품 문의</DTitle>
        <Grid is_flex column bg="#dedede">
          <Grid is_flex textAlign="center" margin="0 auto">
            <Input width="75%" plcholder="입력해" />
            <Button margin="0 0 0 10px">등록</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

// 관련 상품
const ImgWrap = styled.div`
  box-sizing: border-box;
  overflow: auto;
  display: flexbox;
  padding: 10px;
  min-height: min-content;
  div {
    width: 100px;
    height: 100px;
    background-color: white;
    margin-right: 5px;
  }
`;

const DTitle = styled.div`
  ${(props) => (props.flexGrow ? `flex-grow:${props.flexGrow};` : props.flexGrow ? `width:${props.width};` : "width: 100%;")}
  ${(props) => (props.column ? "flex-direction: column;" : "flex-direction: row;")}
  display: flex;

  ${(props) =>
    props.big ? "font-size:1.8rem; border-bottom: 2px solid grey;" : props.sm ? "font-size: 0.75rem;  color: #9a9a9a;  margin-top: 1%;" : "font-size: 1.2rem; border-bottom: 2px solid grey;"}
  font-weight: 700;

  margin-bottom: 1%;

  & > svg {
    color: whitesmoke;
    margin: auto 10px;
    font-size: 0.75rem;
    transition: color 100ms ease-in-out, transform 100ms ease-in-out;
    :hover {
      color: #dedede;
      transform: scale(1.2) rotate(20deg);
    }
  }
`;

// 실시간 낙찰 정보
const LiveBid = styled.div`
  margin-bottom: 1%;
  width: 100%;
  padding: 2% 3%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  //확인용
  background-color: white;
  p:nth-child(1) {
    font-weight: 700;
    width: 30%;
    text-align: left;
    margin: auto 0;
  }
  .bidPrice {
    width: 50%;
    font-size: 25px;
    font-weight: 700;
    text-align: left;
    margin: auto 0;
  }
  .timeStamp {
    width: 15%;
    text-align: right;
    font-size: 12px;
    font-weight: 500;
    margin: auto 0;
  }
`;

// 판매자 카드 => 유저 카드로 재활용?
const Seller = styled.div`
  width: 100%;
  background-color: white;
  padding: 3%;
  display: flex;
  flex-direction: column;
  // 프로필 사진
  .profile {
    width: 60px;
    height: 60px;
    margin: 2%;
    background-color: #f112ff;
    border-radius: 10rem;
  }
`;

const BidLabel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  text-align: left;
  margin-bottom: 1%;
  h6 {
    color: #9a9a9a;
    text-align: right;
  }
`;

export default Product;
