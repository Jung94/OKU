import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Input, Line, Button, Tag, Modal, Text } from "elements/";
import { Slider, Timer } from "components/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart, faPen as fasPen } from "@fortawesome/free-solid-svg-icons";

import { actionCreators as productActions } from "redux/modules/product";
import { priceComma } from "shared/common";

const Product = (props) => {
  const dispatch = useDispatch();
  const [openPost, setOpen] = useState(false);

  // 페이지 로드시 기능 구현 dispatch
  useEffect(() => {
    dispatch(productActions.setProductAllAPI());
  }, []);

  const is_loading = useSelector((state) => state.product.is_loading);
  const productDetail = useSelector((state) => state.product.product_detail);

  if (is_loading) {
    return <div>나는 로딩중</div>;
  }

  if (productDetail !== {}) {
    console.log("✅ Product컴포넌트에서 productDetail : ", productDetail);
    return (
      <ProductWrap>
        <Grid is_flex height="100%" margin="0 0 10px auto">
          <Grid width="50%" margin="0 5px 0 0">
            <Grid margin="0 10px 10px 0" bg="#dedede">
              <Slider imgList={productDetail.img} />
            </Grid>
            <Grid margin="0 10px 10px 0" bg="#dedede" padding="10px">
              <Text title>상품정보</Text>
              <Grid is_flex padding="10px">
                <Grid flexGrow="1">
                  <Text subTitle>
                    상품상태
                    <FontAwesomeIcon icon={fasQC} />
                  </Text>
                  {productDetail.state}급
                </Grid>
                <Grid flexGrow="2">
                  <Text subTitle>거래 지역</Text>
                  {productDetail.region}
                </Grid>
                <Grid flexGrow="1">
                  <Text subTitle>배송 수단</Text>
                  {productDetail.deliveryPrice === true ? "배송비 별도" : "무료 배송 (또는 직거래)"}
                </Grid>
              </Grid>

              <Grid is_flex column padding="10px">
                <Text subTitle>상품 설명</Text>
                <Grid textAlign="left">{productDetail.description}</Grid>
              </Grid>
              <Grid is_flex>
                <Tag>{productDetail.tag}</Tag>
              </Grid>
            </Grid>
            <Grid margin="0 10px 0 0" bg="#dedede" padding="10px">
              <Text title>관련 상품</Text>
              <ImgWrap>
                <div>사진</div>
                <div>사진</div>
                <div>사진</div>
              </ImgWrap>
            </Grid>
          </Grid>
          <Grid width="50%" margin="0 0 0 5px">
            <Grid is_flex margin="0 10px 10px 0" padding="10px" bg="#dedede">
              <Grid>
                <Text title>남은 시간</Text>
                <Grid textAlign="left" justify="space-between">
                  <Timer day />
                  <Timer hms />
                  <Timer all />
                </Grid>
              </Grid>
            </Grid>
            <Grid is_flex column margin="0 10px 0 0" padding="10px" bg="#dedede">
              <Grid>
                <Text title>{productDetail.title}</Text>
                <BidLabel>
                  <Text subTitle>현재 입찰 가격 </Text>
                  <Text price>{productDetail.lowBid && priceComma(productDetail.lowBid)}원</Text>
                  <Line bottom />
                  <h6>상품&thinsp;00&emsp;조회수&thinsp;{productDetail.views}</h6>
                  <Text subTitle>
                    최소 낙찰/입찰가
                    <FontAwesomeIcon icon={fasQC} />
                  </Text>
                  <Text price>{productDetail.lowBid && priceComma(productDetail.lowBid)}원</Text>

                  <Text note>
                    즉시 낙찰가
                    <FontAwesomeIcon icon={fasQC} />
                  </Text>
                  <Text price>{productDetail.sucBid && priceComma(productDetail.sucBid)}원</Text>

                  <h6>* 이 가격을 제안하면 즉시 구매 가능합니다.</h6>
                  <Grid is_flex>
                    <Button primaryNoBorder>
                      <FontAwesomeIcon icon={fasHeart} style={{ margin: "0 1%", "&:hover": { color: "#F112FF" } }} />
                      &thinsp;찜
                    </Button>
                    <Modal bid />
                    <Modal immediateBid sucBid={productDetail.sucBid} />
                  </Grid>
                  <Line bottom />
                </BidLabel>
              </Grid>
              <Grid padding="0 0 10px 0">
                <Text title>
                  실시간 낙찰 정보
                  <FontAwesomeIcon icon={fasQC} />
                </Text>

                {/* 입찰정보 */}
                <LiveBid margin="5%">
                  <p>교촌치킨&thinsp;님</p>
                  <p className="timeStamp">2분전</p>
                  <p className="bidPrice">30,000</p>
                </LiveBid>
              </Grid>
              <Grid>
                <Text title>판매자 정보</Text>
                <Seller>
                  <Grid is_flex margin="0 auto">
                    <Profile></Profile>
                    <div style={{ textAlign: "left" }}>
                      <h3>{productDetail.nickname}</h3>
                      <h6>상품&thinsp;00&emsp;찜&thinsp;00</h6>
                    </div>
                  </Grid>
                  <Line bottom margin="0 0 10px 0" />
                  <Text note textAlign="center">
                    상점으로 이동하기&ensp;>
                  </Text>
                </Seller>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid is_flex column margin="0 0 10px 0">
          <Grid>
            <Text title>
              <Grid is_flex justify="space-between">
                Q&A
              </Grid>
            </Text>
          </Grid>

          <QnAPost>
            <Profile></Profile>

            <Input width="80%" margin="0 1% 0 0"></Input>
            <Button primaryNoBorder>등록</Button>
          </QnAPost>

          <QnA>
            <Grid is_flex>
              <Profile></Profile>

              <div style={{ flexGrow: "1" }}>
                <Grid is_flex justify="space-between">
                  <p style={{ fontWeight: "bold" }}>지코바</p>
                  <h6 style={{ fontWeight: "bold", textAlign: "right" }}>2분전</h6>
                </Grid>
                <Grid is_flex textAlign="left">
                  나는 문의입니다 이 상품은 포장 상태가 양호한가요 저는 풀박스 패키지를 선호합니다 어쩌구...
                </Grid>
              </div>
            </Grid>
            <OpenPostBtn
              onClick={() => {
                if (openPost === false) {
                  setOpen(true);
                } else {
                  setOpen(false);
                }
              }}
            >
              <FontAwesomeIcon icon={fasPen} style={{ color: "grey", cursor: "pointer" }} />
              답글
            </OpenPostBtn>
            <Line bottom />
            {openPost && (
              <QnA openPost>
                <Grid is_flex>
                  <Profile></Profile>
                  <div style={{ flexGrow: "1" }}>
                    <Grid is_flex justify="space-between">
                      <p style={{ fontWeight: "bold" }}>{productDetail.nickname}</p>
                      <h6 style={{ fontWeight: "bold", textAlign: "right" }}>2분전</h6>
                    </Grid>
                    <Grid is_flex textAlign="left">
                      최상급 풀박 패키지에요 놓치면 후회함
                    </Grid>
                  </div>
                </Grid>

                <QnAPost openPost>
                  <Profile></Profile>
                  <Input width="80%" margin="0 1% 0 0"></Input>
                  <Button primaryNoBorder>등록</Button>
                </QnAPost>

                <Line bottom />
              </QnA>
            )}
          </QnA>
        </Grid>
      </ProductWrap>
    );
  }
};

const ProductWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  text-align: left;
  padding: 0;
  svg {
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
    flex-grow: 1;
    text-align: left;
    margin: auto 0;
  }
  .timeStamp {
    flex-grow: 1;
    text-align: right;
    font-size: 12px;
    font-weight: 500;
    margin: auto 0;
    color: #808080;
  }
  .bidPrice {
    flex-grow: 20;
    font-size: 20px;
    font-weight: 700;
    text-align: right;
    margin: auto 0;
  }
`;

// 프로필 사진
const Profile = styled.div`
  min-width: 40px;
  height: 40px;
  margin: 2%;
  background-color: #f112ff;
  border-radius: 10rem;
`;

// 판매자 카드 => 유저 카드로 재활용?
const Seller = styled.div`
  width: 100%;
  background-color: white;
  padding: 3%;
  display: flex;
  flex-direction: column;
  // 프로필 사진
`;

// QNA 카드
const QnA = styled.div`
  ${(props) => (props.openPost ? "background-color: #efefef;" : "padding: 1%;")}
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

// 문의하기 버튼
const QnAPost = styled.div`
  ${(props) => (props.openPost ? "padding-bottom: 1%;" : "padding: 1%;")}
  width: 100%;
  display: flex;
`;

// 삭제하기
const OpenPostBtn = styled.div`
  color: grey;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid grey;
  width: 80px;
  padding: 5px 5px 5px 0;
  margin: auto 0 1% auto;
  svg {
    color: whitesmoke;
    margin: auto 10px;
    font-size: 0.75rem;
    transition: color 100ms ease-in-out, transform 100ms ease-in-out;
  }
  :hover {
    svg {
      color: #dedede;
      transform: scale(1.2) rotate(20deg);
    }
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

const Price = styled.div`
  font-size: 25px;
  font-weight: 700;
  text-align: right;
`;

export default Product;
