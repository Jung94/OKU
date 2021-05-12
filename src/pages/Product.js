import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";
import { Slider, Timer, QnA } from "components/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";

import { actionCreators as productActions } from "redux/modules/product";
import { actionCreators as likeActions } from "redux/modules/like";
import RelatedProduct from "components/global/RelatedProduct";
import { actionCreators as bidActions } from "redux/modules/bid";
import { priceComma } from "shared/common";
import Loading from "shared/Loading";

import moment from "moment";
import "moment/locale/ko";

import { Color } from "shared/DesignSys";

const Product = (props) => {
  const dispatch = useDispatch();
  const _id = props.match.params.id;
  const history = props.history;

  const is_loading = useSelector((state) => state.product.is_loading);
  const productOK = useSelector((state) => state.product.product_detail);
  var {
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
    // _id,
  } = useSelector((state) => state.product.product_detail);

  const _is_like = useSelector((state) => state.like.is_like);
  const _qna_list = useSelector((state) => state.product.qna_list);
  const _related_list = useSelector((state) => state.product.related);
  // console.log("🟣: ", _related_list);
  const _bid_list = useSelector((state) => state.bid.bid_list);
  // console.log("🟣: ", _bid_list);
  const _current = useSelector((state) => state.bid.current);
  // console.log("🟣입찰 리스트: ", _bid_list[0]);

  const [_contents, setReview] = useState("");
  const onChangeContents = useCallback((e) => setReview(e.target.value), []);

  const addQuestion = () => {
    dispatch(productActions.addQuestionAPI(_id, _contents, sellerunique, nickname, Date.now()));
  };

  useEffect(() => {
    dispatch(productActions.setProductAllAPI(_id));
  }, [productOK.onSale, _id]);

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
    return <Loading />;
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
              <Timer timeProgress {...productOK} />
            </Grid>

            <Grid height="100px" margin="0 0 10px 0" overflow="hidden" wordBreak="break-all">
              <Text h2 bold>
                {title}
              </Text>
            </Grid>
            <BidLabel>
              <Text h4 textAlign="right" marginB="2px">
                현재 입찰 가격
              </Text>
              <Text price textAlign="right">
                {_current ? priceComma(_current) : lowBid && priceComma(lowBid)}
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

        <Grid dp_flex margin="0 0 20px 0">
          <Grid width="66%" margin="0 10px 0 0">
            <Text h3 color={Color.Primary} marginB="10px">
              상품정보
            </Text>
            <Grid is_flex justify="space-around" padding="10px">
              <Grid flexShrink="1" margin="0 10px 0 0">
                <Text h4 textAlign="left" marginB="5%">
                  카테고리
                  <FontAwesomeIcon icon={fasQC} className="infoSvg" />
                </Text>
                <Input output info value={`${bigCategory} > ${smallCategory}`} />
              </Grid>
              <Grid flexShrink="3" margin="0 10px 0 0">
                <Text h4 textAlign="left" marginB="5%">
                  상품상태
                  <FontAwesomeIcon icon={fasQC} className="infoSvg" />
                </Text>
                <Input output info value={state && state.split("급")[0]} adornment="급" />
              </Grid>
              <Grid flexShrink="1" margin="0 10px 0 0">
                <Text h4 textAlign="left" marginB="5%">
                  거래 지역
                </Text>
                <Input output info value={region} />
              </Grid>
              <Grid flexShrink="3" margin="0 10px 0 0">
                <Text h4 textAlign="left" marginB="5%">
                  배송 수단
                </Text>
                <Input output info value={deliveryPrice === true ? "배송비 별도" : "무료 배송"} />
              </Grid>
            </Grid>
            <Line bottom margin="10px 0" />
            <Grid is_flex padding="10px">
              <Desc>{description}</Desc>
            </Grid>

            <Grid is_flex>{tag && tag.map((t, idx) => <Tag key={idx}>{t}</Tag>)}</Grid>
          </Grid>

          <Grid width="33%" margin="0 0 0 10px">
            <Text h3 color={Color.Primary} marginB="10px">
              실시간 입찰 정보
              <FontAwesomeIcon icon={fasQC} className="infoSvg" />
            </Text>

            {/* 실시간 입찰 정보 */}
            {_bid_list && _bid_list.length > 0 ? (
              _bid_list.map((b, idx) => (
                <LiveBid key={idx} margin="5%">
                  <Text h4 flexGrow="1">
                    {b.nickName}
                  </Text>
                  <Text h4 textAlign="right" flexGrow="6" margin="0 2% 0 0">
                    {priceComma(b.bid)}&thinsp;원
                  </Text>
                  <Text subBody width="34px" textAlign="right" marginT="auto" marginB="auto" color={Color.Dark_4} flexGrow="1">
                    {moment(b.createAt).fromNow()}
                  </Text>
                </LiveBid>
              ))
            ) : (
              <Blank>
                입찰 정보가 없습니다.
                <br />이 상품의 첫 입찰자가 되어주세요!
              </Blank>
            )}
          </Grid>
        </Grid>

        <Grid dp_flex margin="0 0 20px 0">
          <Grid width="66%" margin="0 10px 0 0">
            <Text h3 color={Color.Primary} marginB="10px">
              관련 상품
            </Text>
            <Grid is_flex>
              {_related_list.map((r, idx) => {
                // console.log(r);
                return (
                  <RelatedProduct
                    key={idx}
                    img={r.img[0]}
                    title={r.title}
                    lowBid={r.lowBid}
                    _onClick={() => {
                      history.push(`/product/detail/${r._id}`);
                    }}
                  />
                );
              })}
            </Grid>
          </Grid>

          <Grid width="33%" margin="0 0 0 0px">
            <Text h3 color={Color.Primary} marginB="10px">
              판매자 정보
            </Text>
            <Seller>
              <Grid is_flex margin="0 0 2% 0">
                <Profile></Profile>
                <div style={{ textAlign: "left", marginLeft: "3%" }}>
                  <Text h4 marginB="5%" marginT="5%">
                    {nickname}
                  </Text>
                </div>
              </Grid>
              <Button width="100%">상점으로 이동하기&ensp;></Button>
            </Seller>
          </Grid>
        </Grid>

        <Grid is_flex column margin="0 0 10px 0">
          <Grid>
            <Text h3 color={Color.Primary} marginB="10px">
              Q&A
            </Text>
          </Grid>
          <Grid margin="0 0 10px 0">
            <Input text width="100%" margin="0 0 10px 0" plcholder="문의 내용을 입력해주세요." adornment="0 / 100" _onChange={onChangeContents} fnc={addQuestion} btn="등록하기"></Input>
            {_qna_list.map((q, idx) => (
              <QnA key={idx} {...q} />
            ))}
          </Grid>
        </Grid>
      </ProductWrap>
    );
  }
};

// Product 컴포넌트 감싸기
const ProductWrap = styled.div`
  max-width: 1030px;
  margin: 0 auto;
  margin-top: 190px;
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

// 실시간 낙찰 정보 => 디자인에 따라 낙찰 정보 확인용 component로 빼기 가능
const LiveBid = styled.div`
  margin-bottom: 3%;
  width: 100%;
  padding: 2% 5%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 50px;
  box-sizing: border-box;
  align-items: center;
  background-color: ${Color.Light_3};
  border-radius: 16px;
`;

// 판매자 카드 => 유저 카드로 재활용?
const Seller = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  border: 0.5px solid ${Color.Light_3};
  border-radius: 16px;
  padding: 3%;
  height: 10rem;
  flex-direction: column;
  & > button {
    height: 50px;
  }
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

// 상품설명
const Desc = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;

// 상품설명
const Blank = styled.div`
  display: flex;
  align-items: center;
  vertical-align: middle;
  text-align: center;
  justify-content: space-evenly;
  color: ${Color.Light_4};
  margin: auto;
  height: 80%;
  user-select: none;
`;

export default Product;
