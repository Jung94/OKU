import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Input, Line, Button, Tag, Modal, Text } from "elements/";
import { Slider, Timer } from "components/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart, faPen as fasPen } from "@fortawesome/free-solid-svg-icons";

import { history } from "redux/configureStore";
import { actionCreators as productActions } from "redux/modules/product";
import { actionCreators as likeActions } from "redux/modules/like";
import { priceComma } from "shared/common";
import _ from "lodash";

const Product = (props) => {
  const dispatch = useDispatch();
  const [openPost, setOpen] = useState(false);

  // 페이지 로드시 기능 구현 dispatch
  useEffect(() => {
    dispatch(productActions.setProductAllAPI());
    dispatch(likeActions.getLikeAPI());
  }, []);

  const is_loading = useSelector((state) => state.product.is_loading);
  const productOK = useSelector((state) => state.product.product_detail);
  const {
    deadLine,
    createdAt,
    deliveryPrice,
    description,
    likeCount,
    likeUser,
    lowBid,
    sucBid,
    region,
    smallCategory,
    bigCategory,
    title,
    nickname,
    views,
    state,
    tag,
    img,
    _id,
  } = useSelector((state) => state.product.product_detail);
  const _is_like = useSelector((state) => state.like.is_like);
  console.log(_is_like);

  const helpPop = () => {
    alert("꺄");
  };

  const userLike = () => {
    // if (is_login) {
    if (!_is_like) {
      // 좋아요 한 적이 없으면 false이므로
      dispatch(likeActions.addLikeAPI(_id)); // 좋아요 실행
    } else {
      // 좋아요 한 적이 있으면 true
      dispatch(likeActions.deleteLikeAPI(_id)); // 좋아요 해제 실행
    }
    // } else {
    //   window.alert("로그인해주세요!");
    // }
  };

  if (is_loading) {
    return <div>나는 로딩중</div>;
  }

  if (productOK) {
    return (
      <ProductWrap>
        {/* <div onMouseOver={helpPop}></div> */}
        <Grid is_flex margin="0 0 10px auto">
          <Grid width="50%" margin="0 10px 0 0" flexGrow="2">
            <Grid margin="0 10px 10px 0" bg="#dedede">
              <Slider imgList={img} />
            </Grid>
            <Grid margin="0 10px 10px 0" bg="#dedede" padding="10px">
              <Text Title>상품정보</Text>
              <Grid is_flex padding="10px">
                <Grid flexGrow="1">
                  <Text subTitle>
                    상품상태
                    <FontAwesomeIcon icon={fasQC} className="infoSvg" />
                  </Text>
                  {state}급
                </Grid>
                <Grid flexGrow="2">
                  <Text subTitle>거래 지역</Text>
                  {region}
                </Grid>
                <Grid flexGrow="1">
                  <Text subTitle>배송 수단</Text>
                  {deliveryPrice === true ? "배송비 별도" : "무료 배송 (또는 직거래)"}
                </Grid>
              </Grid>

              <Grid is_flex column padding="10px">
                <Text subTitle>상품 설명</Text>
                <Grid textAlign="left">{description}</Grid>
              </Grid>
              <Grid is_flex>
                <Tag>{tag}</Tag>
              </Grid>
            </Grid>
            <Grid margin="0 10px 0 0" bg="#dedede" padding="10px">
              <Text Title>관련 상품</Text>
              <ImgWrap>
                <div>사진</div>
                <div>사진</div>
                <div>사진</div>
              </ImgWrap>
            </Grid>
          </Grid>
          <Grid margin="0 0 0 5px" flexGrow="1">
            <Grid is_flex margin="0 10px 10px 0" padding="10px" bg="#dedede">
              <Grid>
                <Text Title>남은 시간</Text>
                <Grid textAlign="left" justify="space-between">
                  <Timer day deadLine={deadLine} />
                  <Timer hms deadLine={deadLine} />
                  <Timer all deadLine={deadLine} />
                </Grid>
              </Grid>
            </Grid>
            <Grid is_flex column margin="0 10px 0 0" padding="10px" bg="#dedede">
              <Grid>
                <Text Title>{title}</Text>
                <BidLabel>
                  <Text subTitle>현재 입찰 가격 </Text>
                  <Text price>{lowBid && priceComma(lowBid)}원</Text>
                  <Line bottom />
                  <Text note textAlign="right">
                    상품&thinsp;00&emsp;조회수&thinsp;{views}
                  </Text>
                  <Text subTitle>
                    최소 낙찰/입찰가
                    <FontAwesomeIcon icon={fasQC} className="infoSvg" />
                  </Text>
                  <Text price>{lowBid && priceComma(lowBid)}원</Text>
                  <Line bottom />

                  <Text subTitle>
                    즉시 낙찰가
                    <FontAwesomeIcon icon={fasQC} className="infoSvg" />
                  </Text>
                  <Text price>{sucBid && priceComma(sucBid)}원</Text>
                  <Line bottom />

                  <Text note textAlign="right">
                    * 이 가격을 제안하면 즉시 구매 가능합니다.
                  </Text>
                  <Grid is_flex>
                    <Modal bid />
                  </Grid>
                  <Grid is_flex>
                    {_is_like ? (
                      <Button main _onClick={userLike}>
                        <FontAwesomeIcon icon={fasHeart} />
                        &thinsp;찜
                      </Button>
                    ) : (
                      <Button sub _onClick={userLike}>
                        <FontAwesomeIcon icon={fasHeart} />
                        &thinsp;찜
                      </Button>
                    )}
                    <Modal immediateBid sucBid={sucBid} />
                  </Grid>
                  <Line bottom />
                </BidLabel>
              </Grid>
              <Grid padding="0 0 10px 0">
                <Text Title>
                  실시간 낙찰 정보
                  <FontAwesomeIcon icon={fasQC} className="infoSvg" />
                </Text>

                {/* 입찰정보 */}
                <LiveBid margin="5%">
                  <p>교촌치킨&thinsp;님</p>
                  <Text note marginT="auto" marginB="auto">
                    2분전
                  </Text>
                  <p className="bidPrice">30,000</p>
                </LiveBid>
              </Grid>

              <Grid>
                <Text Title>판매자 정보</Text>
                <Seller>
                  <Grid is_flex margin="0 auto">
                    <Profile></Profile>
                    <div style={{ textAlign: "left" }}>
                      <Text h5 weight="600">
                        {nickname}
                      </Text>
                      <Text note>상품&thinsp;00&emsp;찜&thinsp;00</Text>
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

        <Grid is_flex column margin="0 0 10px 0" flexGrow="1">
          <Grid>
            <Text Title>
              <Grid is_flex justify="space-between">
                Q&A
              </Grid>
            </Text>
          </Grid>

          <QnAPost>
            <Profile></Profile>

            <Input width="80%" margin="0 1% 0 0"></Input>
            <Button>등록</Button>
          </QnAPost>

          <QnA>
            <Grid is_flex>
              <Profile></Profile>

              <div style={{ flexGrow: "1" }}>
                <Grid is_flex justify="space-between">
                  <Text h5 weight="600">
                    지코바
                  </Text>
                  <Text note>2분전</Text>
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
                      <p style={{ fontWeight: "bold" }}>{nickname}</p>
                      <Text note>2분전</Text>
                    </Grid>
                    <Grid is_flex textAlign="left">
                      최상급 풀박 패키지에요 놓치면 후회함
                    </Grid>
                  </div>
                </Grid>

                <QnAPost openPost>
                  <Profile></Profile>
                  <Input width="80%" margin="0 1% 0 0"></Input>
                  <Button>등록</Button>
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

// Product 컴포넌트 감싸기
const ProductWrap = styled.div`
  max-width: 1030px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  text-align: left;
  padding: 0;

  .infoSvg {
    color: whitesmoke;
    margin: auto 5px;
    font-size: 13px;
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
  div {
    width: 100px;
    height: 100px;
    background-color: white;
    margin-right: 5px;
  }
`;

// 실시간 낙찰 정보 => 디자인에 따라 낙찰 정보 확인용 component로 빼기 가능
const LiveBid = styled.div`
  margin-bottom: 1%;
  width: 100%;
  padding: 2% 3%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  box-sizing: border-box;
  // 박스 위치 확인용
  background-color: white;
  p:nth-child(1) {
    font-weight: 700;
    flex-grow: 1;
    text-align: left;
    margin: auto 0;
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
  box-sizing: border-box;
`;

// QNA
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

// 누르면 열리는 버튼
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

// 제품 타이틀 및 가격표
const BidLabel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  text-align: left;
  margin-bottom: 1%;
`;

export default Product;
