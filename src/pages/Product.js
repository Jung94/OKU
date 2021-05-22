import React, { useRef, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";
import { Slider, Timer, QnA } from "components/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

import { useMediaQuery } from "react-responsive";

import { actionCreators as headerActions } from "redux/modules/header";
import { actionCreators as productActions } from "redux/modules/product";
import { actionCreators as loadingActions } from "redux/modules/loading";
import { actionCreators as likeActions } from "redux/modules/like";
import RelatedProduct from "components/global/RelatedProduct";
import { actionCreators as bidActions } from "redux/modules/bid";
import { input_priceComma } from "shared/common";
import Loading from "shared/Loading";

import moment from "moment";
import "moment/locale/ko";

import { Color } from "shared/DesignSys";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return isDesktop ? children : null;
};

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  return isTablet ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

const Product = (props) => {
  moment.locale("ko");
  const dispatch = useDispatch();

  const _id = props.match.params.id;
  const history = props.history;

  const is_loading = useSelector((state) => state.loading.is_loading);

  const is_login = localStorage.getItem("access_token");

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
    profileImg,
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
  // console.log(productOK);
  const _is_like = useSelector((state) => state.like.is_like);
  const _qna_list = useSelector((state) => state.product.qna_list);
  const _related_list = useSelector((state) => state.product.related);
  const _related_mobile = useSelector((state) => state.product.related_mobile);
  const _bid_list = useSelector((state) => state.bid.bid_list);
  const _current = useSelector((state) => state.bid.current);

  const new_qna = useSelector((state) => state.product.new_qna);

  const [_contents, setReview] = useState("");
  const onChangeContents = useCallback((e) => setReview(e.target.value), []);

  const addQuestion = () => {
    dispatch(productActions.addQuestionAPI(_id, _contents, sellerunique, nickname, Date.now()));
    setReview("");
    setQCnt("");
  };

  useEffect(() => {
    dispatch(headerActions.setHeader(true));
    dispatch(productActions.setProductAllAPI(_id));
    dispatch(bidActions.setBidAPI(_id, lowBid));
  }, [_id, new_qna]);

  const startpoint = useRef();

  const userLike = (_id) => {
    if (is_login) {
      if (_is_like) {
        dispatch(likeActions.deleteLikeAPI(_id)); // 좋아요 해제 실행
      } else {
        dispatch(likeActions.addLikeAPI(_id)); // 좋아요 실행
      }
    } else {
      window.alert("로그인이 필요한 서비스입니다.");
    }
  };

  const [QCnt, setQCnt] = useState(""); // QnA

  if (productOK) {
    return (
      <>
        <Desktop>
          <ProductWrap ref={startpoint}>
            {/* <div onMouseOver={helpPop}></div> */}
            {/* 💎 1단 : 상품사진 & 입찰표 */}
            <Grid end_flex margin="0 0 30px 0" height="600px">
              {/* 상품사진 */}
              <SliderWrap>
                <Slider imgList={img} />
              </SliderWrap>
              {/* 입찰표 */}
              <Grid width="40%" margin="0 0 0 20px">
                {/* 타이머 */}
                <Grid textAlign="center" justify="space-between" margin="0 0 30px 0">
                  <Text h1>
                    <Timer all {...productOK} purple />
                  </Text>
                  <Timer timeProgress {...productOK} />
                </Grid>
                {/* 제목 */}
                <Grid height="100px" margin="0 0 10px 0" overflow="hidden" wordBreak="break-all">
                  <Text h1>{title}</Text>
                </Grid>
                {/* 입찰표 */}
                <BidLabel>
                  <Text h4 textAlign="right" marginB="2px">
                    현재 입찰 가격
                  </Text>
                  <Text price textAlign="right">
                    {_current ? input_priceComma(_current) : lowBid && input_priceComma(lowBid)}
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
                  <Input output num value={lowBid && input_priceComma(lowBid)} adornment="원" />
                  <Grid height="10px" />

                  <Text h4 lineHeight="220%">
                    즉시 낙찰가
                    <FontAwesomeIcon icon={fasQC} className="infoSvg" />
                  </Text>
                  <Input output num value={sucBid && input_priceComma(sucBid)} adornment="원" />
                  <Grid height="40px">
                    <Text subBody textAlign="right" color={Color.Dark_4} lineHeight="220%">
                      * 이 가격을 제안하면 즉시 구매 가능합니다.
                    </Text>
                  </Grid>
                  <Grid is_flex>
                    <Modal bid {...productOK} />
                  </Grid>
                  <Grid is_flex margin="10px 10px 0 0">
                    {is_login ? (
                      _is_like ? (
                        <Button main _onClick={() => userLike(_id)} margin="0 10px 0 0">
                          <FontAwesomeIcon icon={fasHeart} />
                          &thinsp;찜
                        </Button>
                      ) : (
                        <Button sub _onClick={() => userLike(_id)} margin="0 10px 0 0">
                          <FontAwesomeIcon icon={farHeart} />
                          &thinsp;찜
                        </Button>
                      )
                    ) : (
                      <Button sub disabled _onClick={() => userLike(_id)} margin="0 10px 0 0">
                        <FontAwesomeIcon icon={farHeart} />
                        &thinsp;찜
                      </Button>
                    )}
                    <Modal immediateBid {...productOK} />
                  </Grid>
                </BidLabel>
              </Grid>
            </Grid>

            {/* 💎 2단 : 상품정보 & 실시간 입찰 정보 */}
            <Grid dp_flex margin="0 0 30px 0">
              {/* 💎 상품정보 */}
              <Grid width="750px" margin="0 10px 0 0">
                <Text h3 color={Color.Primary} >
                  상품정보
                </Text>
                <Grid display= "grid" align="center" grids="3fr 1fr 3fr 1.3fr" padding="10px 20px 10px 10px">
                  <Grid margin="0 10px 0 0" width="">
                    <Text h4 textAlign="left" marginB="10px">
                      카테고리
                      <FontAwesomeIcon icon={fasQC} className="infoSvg" />
                    </Text>
                    <Input output center value={`${bigCategory} > ${smallCategory}`} />
                  </Grid>
                  <Grid margin="0 10px 0 0" width="">
                    <Text h4 textAlign="left" marginB="10px">
                      상품상태
                      <FontAwesomeIcon icon={fasQC} className="infoSvg" />
                    </Text>
                    <Input output center value={state && state.split("급")[0]} adornment="급" />
                  </Grid>
                  {region && (
                    <Grid margin="0 10px 0 0" width="">
                      <Text h4 textAlign="left" marginB="10px">
                        거래 지역
                      </Text>
                      <Input output center value={region} />
                    </Grid>
                  )}
                  <Grid width="">
                    <Text h4 textAlign="left" marginB="10px">
                      배송 수단
                    </Text>
                    <Input output center value={deliveryPrice === true ? "배송비 별도" : "무료 배송"} />
                  </Grid>
                </Grid>
                <Line bottom margin="10px 0" />
                <Grid is_flex padding="10px">
                  <Desc>{description}</Desc>
                </Grid>

                <TagWrap>{tag && tag.map((t, idx) => <Tag key={idx}>{t}</Tag>)}</TagWrap>
              </Grid>

              {/* 💎 실시간 입찰 정보 */}
              <Grid width="270px">
                <Text h3 color={Color.Primary} marginB="10px">
                  실시간 입찰 정보
                  <FontAwesomeIcon icon={fasQC} className="infoSvg" />
                </Text>

                {_bid_list && _bid_list.length > 0 ? (
                  _bid_list.map((b, idx) => {
                    return (
                      <LiveBid key={idx} margin="5%">
                        <Text h4 flexGrow="1">
                          {b.nickName}
                        </Text>
                        <Text h4 textAlign="right" flexGrow="6" margin="0 2% 0 0">
                          {input_priceComma(b.bid)}&thinsp;원
                        </Text>
                        <Text subBody width="34px" textAlign="right" color={Color.Dark_4} flexGrow="1">
                          {moment(b.createAt).fromNow()}
                        </Text>
                      </LiveBid>
                    );
                  })
                ) : (
                  <Blank>
                    입찰 정보가 없습니다.
                    <br />이 상품의 첫 입찰자가 되어주세요!
                  </Blank>
                )}
              </Grid>
            </Grid>

            {/* 💎 3단 : 관련상품 & 판매자 정보 */}
            <Grid dp_flex margin="0 0 30px 0">
              <Grid width="750px" margin="0 10px 0 0" padding="0 10px 0 0">
                <Text h3 color={Color.Primary} marginB="10px">
                  관련 상품
                </Text>
                <Grid display="grid" align="center" grids="1fr 1fr 1fr 1fr" >
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

              <Grid width="270px" >
                <Text h3 color={Color.Primary} marginB="10px">
                  판매자 정보
                </Text>
                <Seller>
                  <Grid is_flex margin="0 0 2% 0">
                    <Profile img={profileImg}></Profile>
                    <div style={{ textAlign: "left", marginLeft: "3%" }}>
                      <Text h4 marginB="5%" marginT="5%">
                        {nickname}
                      </Text>
                    </div>
                  </Grid>
                  <Button disabled noflex width="100%" _onClick={() => window.alert("서비스 준비중입니다.")}>
                    상점으로 이동하기&ensp;{">"}
                  </Button>
                </Seller>
              </Grid>
            </Grid>

            {/* 💎 4단 : Q&A */}
            <Grid is_flex column margin="0 0 10px 0">
              <Grid>
                <Text h3 color={Color.Primary} marginB="10px">
                  Q&A
                </Text>
              </Grid>
              <Grid margin="0 0 10px 0">
                <Input
                  text
                  fix
                  width="100%"
                  margin="0 0 10px 0"
                  plcholder="문의 내용을 입력해주세요."
                  adornment={`${QCnt.length} / 500`}
                  maxLength="500"
                  _onChange={(e) => {
                    setReview(e.target.value);
                    setQCnt(e.target.value);
                  }}
                  value={QCnt}
                  fnc={addQuestion}
                  btn="등록하기"
                ></Input>
                {_qna_list.map((q, idx) => (
                  <QnA key={idx} {...q} />
                ))}
              </Grid>
            </Grid>
          </ProductWrap>
        </Desktop>

        <Tablet></Tablet>

        <Mobile>
          <ProductWrap ref={startpoint}>
            {/* <div onMouseOver={helpPop}></div> */}
            {/* 💎 타이머 */}
            <Grid textAlign="center" justify="space-between" padding="0 30px">
              <Text h1 marginB="5px">
                <Timer all {...productOK} purple />
              </Text>
              <Timer timeProgress {...productOK} />
            </Grid>

            {/* 💎 슬라이더 */}
            <SliderWrap>
              <Slider noRadius imgList={img} />
            </SliderWrap>

            <BidLabel>
              <Text h1 bold marginB="1rem">
                {title}
              </Text>
              <Text h4 textAlign="right" marginB="2px">
                현재 입찰 가격
              </Text>
              <Text price textAlign="right">
                {_current ? input_priceComma(_current) : lowBid && input_priceComma(lowBid)}
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
              <Input output num value={lowBid && input_priceComma(lowBid)} adornment="원" />
              <Grid height="10px"></Grid>

              <Text h4 lineHeight="220%">
                즉시 낙찰가
                <FontAwesomeIcon icon={fasQC} className="infoSvg" />
              </Text>
              <Input output num value={sucBid && input_priceComma(sucBid)} adornment="원" />
              <Grid height="50px">
                <Text subBody textAlign="right" color={Color.Dark_4} lineHeight="220%">
                  * 이 가격을 제안하면 즉시 구매 가능합니다.
                </Text>
              </Grid>
              <Grid is_flex margin="0 0 10px 0">
                <Modal bid {...productOK} />
              </Grid>
              <Grid is_flex gap="10px">
                {is_login ? (
                  _is_like ? (
                    <Button main _onClick={() => userLike(_id)} width="30%">
                      <FontAwesomeIcon icon={fasHeart} />
                      &thinsp;찜
                    </Button>
                  ) : (
                    <Button sub _onClick={() => userLike(_id)} width="30%">
                      <FontAwesomeIcon icon={farHeart} />
                      &thinsp;찜
                    </Button>
                  )
                ) : (
                  <Button sub disabled _onClick={() => userLike(_id)} width="30%">
                    <FontAwesomeIcon icon={farHeart} />
                    &thinsp;찜
                  </Button>
                )}
                <Modal immediateBid {...productOK} />
              </Grid>
            </BidLabel>

            {/* 상품정보 */}
            <Grid>
              <Text h3 color={Color.Primary} marginB="1rem">
                상품정보
              </Text>
              <Grid is_flex margin="0 0 1rem 0">
                <Grid margin="0 0.5rem 0 0">
                  <Text h4 textAlign="left" marginB="0.5rem">
                    카테고리
                    <FontAwesomeIcon icon={fasQC} className="infoSvg" />
                  </Text>
                  <Input output center value={`${bigCategory} > ${smallCategory}`} />
                </Grid>
                <Grid width="50%">
                  <Text h4 textAlign="left" marginB="0.5rem">
                    상품상태
                    <FontAwesomeIcon icon={fasQC} className="infoSvg" />
                  </Text>
                  <Input output center value={state && state.split("급")[0]} adornment="급" />
                </Grid>
              </Grid>

              <Grid is_flex margin="0 0 1rem 0">
                {region && (
                  <Grid margin="0 0.5rem 0 0">
                    <Text h4 textAlign="left" marginB="0.5rem">
                      거래 지역
                    </Text>
                    <Input output center value={region} />
                  </Grid>
                )}
                <Grid width="50%">
                  <Text h4 textAlign="left" marginB="0.5rem">
                    배송비
                  </Text>
                  <Input output center value={deliveryPrice === true ? "별도" : "무료"} />
                </Grid>
              </Grid>
              <Line bottom margin="10px 0" color={Color.Light_2} />
              <Grid is_flex column align="flex-start">
                <Desc>{description}</Desc>
              </Grid>

              <TagWrap>{tag && tag.map((t, idx) => <Tag key={idx}>{t}</Tag>)}</TagWrap>
            </Grid>

            <Grid>
              <Text h3 color={Color.Primary} marginB="10px">
                실시간 입찰 정보
                <FontAwesomeIcon icon={fasQC} className="infoSvg" />
              </Text>

              {/* 실시간 입찰 정보 */}
              {_bid_list && _bid_list.length > 0 ? (
                _bid_list.map((b, idx) => {
                  return (
                    <LiveBid key={idx}>
                      <Text h4 flexGrow="1">
                        {b.nickName}
                      </Text>
                      <Text h4 textAlign="right" flexGrow="6" margin="0 2% 0 0">
                        {input_priceComma(b.bid)}&thinsp;원
                      </Text>
                      <Text subBody textAlign="right" color={Color.Dark_4} flexGrow="1">
                        {moment(b.createAt).fromNow()}
                      </Text>
                    </LiveBid>
                  );
                })
              ) : (
                <Blank>
                  입찰 정보가 없습니다.
                  <br />이 상품의 첫 입찰자가 되어주세요!
                </Blank>
              )}
            </Grid>

            <Grid>
              <Text h3 color={Color.Primary} marginB="10px">
                관련 상품
              </Text>
              <Grid is_flex gap="1%">
                {_related_mobile && _related_mobile.length > 0 ? (
                  _related_mobile.map((r, idx) => {
                    // console.log(r);
                    return (
                      <RelatedProduct
                        height="7rem"
                        key={idx}
                        img={r.img[0]}
                        title={r.title}
                        lowBid={r.lowBid}
                        _onClick={() => {
                          history.push(`/product/detail/${r._id}`);
                        }}
                      />
                    );
                  })
                ) : (
                  <>관련 상품이 없습니다.</>
                )}
              </Grid>
            </Grid>

            {/* 3단 : 관련상품 & 판매자 정보 */}
            <Grid>
              <Text h3 color={Color.Primary} marginB="10px">
                판매자 정보
              </Text>
              <Seller>
                <Grid is_flex margin="0 0 2% 0">
                  <Profile img={profileImg}></Profile>
                  <div style={{ textAlign: "left", marginLeft: "3%" }}>
                    <Text h4 marginB="5%" marginT="5%">
                      {nickname}
                    </Text>
                  </div>
                </Grid>
                <Button disabled noflex width="100%" _onClick={() => window.alert("서비스 준비중입니다.")}>
                  상점으로 이동하기&ensp;{">"}
                </Button>
              </Seller>
            </Grid>

            <Grid is_flex column margin="0 0 10px 0">
              <Grid>
                <Text h3 color={Color.Primary} marginB="10px">
                  Q&A
                </Text>
              </Grid>
              <Grid margin="0 0 10px 0">
                <Input
                  text
                  fix
                  width="100%"
                  margin="0 0 10px 0"
                  plcholder="문의 내용을 입력해주세요."
                  adornment={`${QCnt.length} / 500`}
                  maxLength="500"
                  _onChange={(e) => {
                    setReview(e.target.value);
                    setQCnt(e.target.value);
                  }}
                  fnc={addQuestion}
                  smbtn="등록하기"
                />
                {_qna_list.map((q, idx) => (
                  <QnA noProfile key={idx} {...q} />
                ))}
              </Grid>
            </Grid>
          </ProductWrap>
        </Mobile>
      </>
    );
  }
};

const FontBody = "14px";

// Product 컴포넌트 감싸기
const ProductWrap = styled.div`
  max-width: 1030px;
  margin: 0 auto;
  margin-top: 160px;
  display: flex;
  flex-direction: column;
  padding: 0;

  font-size: ${FontBody};

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

  @media only screen and (max-width: 767px) {
    max-width: 1030px;
    margin: 0 auto;
    margin-top: 115px;

    display: flex;
    flex-direction: column;
    padding: 0;

    gap: 50px;

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
  }
`;

const SliderWrap = styled.div`
  width: 60%;
  height: 600px;

  display: flex;

  @media only screen and (max-width: 767px) {
    display: flex;
    align-items: center;
    margin-top: -30px;
    margin-bottom: -10px;
    /* ignore parent's padding */
    width: calc(100% + 20px);
    margin-left: -10px;
    height: 100vw;
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
  height: 45px;
  box-sizing: border-box;
  align-items: center;
  background-color: ${Color.Light_3};
  border-radius: 12px;
  div:nth-child(1) {
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  div:nth-child(2) {
    width: 45%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  div:nth-child(3) {
    width: 23%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media only screen and (max-width: 767px) {
    div:nth-child(1) {
      width: 50%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    div:nth-child(2) {
      width: 50%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 20px;
  }
`;

// 판매자 카드 => 유저 카드로 재활용?
const Seller = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  border: 0.5px solid ${Color.Light_3};
  border-radius: 12px;
  padding: 3%;
  flex-direction: column;
  height: 10rem;
`;

// 제품 타이틀 및 가격표
const BidLabel = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  text-align: left;
  @media only screen and (max-width: 767px) {
    margin-bottom: 0;
  }
`;

// 상품설명
const Desc = styled.div`
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  /* -webkit-line-clamp: 7; */
  -webkit-box-orient: vertical;
  /* display: -webkit-box; */
  white-space: pre-line;

  @media only screen and (max-width: 767px) {
    padding: 0 10px 10px 10px;
  }
`;

// Tag wrapping
const TagWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

// 입찰자 Blank block
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

  @media only screen and (max-width: 767px) {
    padding-top: 10px;
  }
`;

export default Product;
