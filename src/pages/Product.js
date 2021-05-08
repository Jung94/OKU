import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Grid, Input, Line, Button, Tag, Modal, Text } from "elements/";
import { Slider, Timer, QnA } from "components/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";

import { history } from "redux/configureStore";
import { actionCreators as productActions } from "redux/modules/product";
import { actionCreators as bidActions } from "redux/modules/bid";
import { actionCreators as likeActions } from "redux/modules/like";
import { priceComma } from "shared/common";
import Loading from "shared/Loading";

import moment from "moment";
import "moment/locale/ko";

import { Color } from "shared/DesignSys";

const Product = (props) => {
  const dispatch = useDispatch();
  // onSale 처리 해야함

  const is_loading = useSelector((state) => state.product.is_loading);
  const productOK = useSelector((state) => state.product.product_detail);
  const {
    deadLine,
    createAt,
    deliveryPrice,
    description,
    lowBid,
    sucBid,
    region,
    sellerunique,
    smallCategory,
    bigCategory,
    onSale,
    title,
    nickname,
    views,
    state,
    tag,
    img,
    _id,
  } = useSelector((state) => state.product.product_detail);
  console.log("🟣 : ", productOK);
  const _is_like = useSelector((state) => state.like.is_like);

  const _qna_list = useSelector((state) => state.product.qna_list);

  const _bid_list = useSelector((state) => state.bid.bid_list);
  console.log("입찰 리스트: ", _bid_list);

  const [_contents, setReview] = useState("");
  const onChangeContents = useCallback((e) => setReview(e.target.value), []);

  const addQuestion = () => {
    dispatch(productActions.addQuestionAPI(_id, _contents, sellerunique, nickname, Date.now()));
  };

  useEffect(() => {
    dispatch(productActions.setProductAllAPI());
    dispatch(likeActions.getLikeAPI());
    // QnA컴포넌트에서 useEffect실행하면 무한루프에 빠진다 -> 공부포인트
    dispatch(productActions.setQnAAPI());
    dispatch(bidActions.setBidAPI());
  }, [productOK._id, _bid_list.bid]);

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
    return <Loading></Loading>;
  }

  if (productOK) {
    return (
      <ProductWrap>
        {/* <div onMouseOver={helpPop}></div> */}
        <Grid dp_flex margin="0 0 20px 0">
          <Grid width="66%" margin="0 10px 0 0">
            <Slider imgList={img} />
          </Grid>

          <Grid width="33%" margin="0 0 0 10px">
            <Grid textAlign="center" justify="space-between" margin="0 0 30px 0">
              <Text h2>
                <Timer all {...productOK} purple />
              </Text>
              <Timer timeProgress deadLine={deadLine} createAt={createAt} />
            </Grid>

            <Grid height="100px" margin="0 0 10px 0">
              <Text h2>{title}</Text>
            </Grid>
            <BidLabel>
              <Text h4 textAlign="right">
                현재 입찰 가격
              </Text>
              <Text price textAlign="right">
                {_bid_list.bid ? priceComma(_bid_list.bid) : priceComma(lowBid)}
                <Text won>원</Text>
              </Text>
              <Line bottom margin="5px 0" />
              <Grid height="30px">
                <Text subBody textAlign="right" color={Color.Dark_4} lineHeight="220%">
                  조회수&thinsp;{views}
                </Text>
              </Grid>
              <Text h4 lineHeight="220%">
                최소 낙찰/입찰가
                <FontAwesomeIcon icon={fasQC} className="infoSvg" />
              </Text>
              <Input output num value={lowBid && priceComma(lowBid)} adornment="원" />
              <Grid height="10px"></Grid>

              <Text h4 lineHeight="220%">
                즉시 낙찰가
                <FontAwesomeIcon icon={fasQC} className="infoSvg" />
              </Text>
              <Input output num value={sucBid && priceComma(sucBid)} adornment="원" />
              <Grid height="50px">
                <Text subBody textAlign="right" color={Color.Dark_4} lineHeight="220%">
                  * 이 가격을 제안하면 즉시 구매 가능합니다.
                </Text>
              </Grid>
              <Grid is_flex>
                <Modal bid {...productOK} />
              </Grid>
              <Grid is_flex>
                {_is_like ? (
                  <Button main _onClick={userLike} margin="0 5px 0 0">
                    <FontAwesomeIcon icon={fasHeart} />
                    &thinsp;찜
                  </Button>
                ) : (
                  <Button sub _onClick={userLike} margin="0 5px 0 0">
                    <FontAwesomeIcon icon={fasHeart} />
                    &thinsp;찜
                  </Button>
                )}
                <Modal immediateBid {...productOK} />
              </Grid>
            </BidLabel>
          </Grid>
        </Grid>

        <Grid dp_flex margin="0 0 10px 0">
          <Grid column width="66%" margin="0 10px 0 0">
            <Text h3 color={Color.Primary}>
              상품정보
            </Text>
            <Grid is_flex padding="10px">
              <Grid flexGrow="2" margin="0 3% 0 0">
                <Text h4 textAlign="left">
                  카테고리
                  <FontAwesomeIcon icon={fasQC} className="infoSvg" />
                </Text>
                <Input output value={`${bigCategory} > ${smallCategory}`} />
              </Grid>
              <Grid flexGrow="1" margin="0 3% 0 0">
                <Text h4 textAlign="left">
                  상품상태
                  <FontAwesomeIcon icon={fasQC} className="infoSvg" />
                </Text>
                <Input output value={state} adornment="급" />
              </Grid>
              <Grid flexGrow="2" margin="0 3% 0 0">
                <Text h4 textAlign="left">
                  거래 지역
                </Text>
                <Input output value={region} />
              </Grid>
              <Grid flexGrow="1">
                <Text h4 textAlign="left">
                  배송 수단
                </Text>
                <Input output value={deliveryPrice === true ? "배송비 별도" : "무료 배송 (또는 직거래)"} />
              </Grid>
            </Grid>

            <Grid is_flex padding="10px">
              <Grid flexGrow="1">
                <Text h4 textAlign="left">
                  상품 설명
                </Text>
                {description}
              </Grid>
            </Grid>

            <Grid is_flex>
              <Tag>{tag}</Tag>
            </Grid>

            <Text h3>관련 상품</Text>
            <ImgWrap>
              <div>사진</div>
              <div>사진</div>
              <div>사진</div>
            </ImgWrap>
          </Grid>

          <Grid column width="33%" margin="0 0 0 10px">
            <Text h3 color={Color.Primary}>
              실시간 입찰 정보
              <FontAwesomeIcon icon={fasQC} className="infoSvg" />
            </Text>

            {/* 실시간 입찰 정보 */}
            {_bid_list.map((b, idx) => (
              <LiveBid key={idx} margin="5%">
                <p>{b.nickName}&thinsp;님</p>
                <Text subBody marginT="auto" marginB="auto">
                  {moment(b.createAt).fromNow()}
                </Text>
                <p className="bidPrice">{b.bid}</p>
              </LiveBid>
            ))}

            <Text h4 textAlign="left">
              판매자 정보
            </Text>
            <Seller>
              <Grid is_flex margin="0 auto">
                <Profile></Profile>
                <div style={{ textAlign: "left" }}>
                  <Text h3 weight="600">
                    {nickname}
                  </Text>
                  <Text subBody>상품&thinsp;00&emsp;찜&thinsp;00</Text>
                </div>
              </Grid>
              <Line bottom margin="0 0 10px 0" />
              <Text subBody textAlign="center">
                상점으로 이동하기&ensp;>
              </Text>
            </Seller>
            <Grid height="100%"></Grid>
          </Grid>
        </Grid>

        <Grid is_flex column margin="0 0 10px 0">
          {/* qna제목 */}
          <Grid>
            <Text h3>
              <Grid is_flex justify="space-between">
                Q&A
              </Grid>
            </Text>
          </Grid>
          {/* qna등록 */}
          <QnAPost>
            <Profile></Profile>
            <Input width="80%" margin="0 1% 0 0" _onChange={onChangeContents}></Input>
            <Button _onClick={addQuestion}>등록</Button>
          </QnAPost>
          {_qna_list.map((q, idx) => (
            <QnA key={idx} {...q} />
          ))}
        </Grid>
      </ProductWrap>
    );
  }
};

// Product 컴포넌트 감싸기
const ProductWrap = styled.div`
  max-width: 1030px;
  margin: 0 auto;
  margin-top: 160px;
  display: flex;
  flex-direction: column;
  padding: 0;

  margin-bottom: 100px;

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

// 제품 타이틀 및 가격표
const BidLabel = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  background-color: white;
  text-align: left;
  margin-bottom: 1%;
`;

// 문의하기
const QnAPost = styled.div`
  ${(props) => (props.openPost ? "padding-bottom: 1%;" : "padding: 1%;")}
  width: 100%;
  display: flex;
`;

const WrapRatio = styled.div`
  display: flex;
`;

export default Product;
