import React from "react";
import styled from "styled-components";
import { input_priceComma } from "shared/common";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as likeActions } from "redux/modules/like";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart, faPen as fasPen } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import IconHeartOn from "images/icon_HeartOn.svg";
import IconHeartOff from "images/icon_HeartOff.svg";

import { Color } from "shared/DesignSys";

const RelatedProduct = (props) => {
  const dispatch = useDispatch();

  const { title, img, lowBid, _id, _onClick, width, height, like, relative } = props;

  const _is_like = useSelector((state) => state.like.is_like);
  const like_list = useSelector((state) => state.like.like_list);

  // 좋아요 확인용
  // console.log("💛", like_list);
  const likeOrNot = like_list.some((e) => e.productId === _id); // props로 넘어오는 각 프로덕트의 _id와 같은지 확인

  // const like = like_list.some(checkLike);

  const userLike = (_id) => {
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

  // 마이페이지 좋아요 버튼 버전
  if (like) {
    return (
      <LikeImgWrap width={width} height={width}>
        <RelatedImg like img={img} onClick={_onClick}></RelatedImg>

        <HeartWrap onClick={() => userLike(_id)}> {likeOrNot ? <Heart img={IconHeartOn} /> : <Heart img={IconHeartOff} />} </HeartWrap>
      </LikeImgWrap>
    );
  }

  // 관련상품 버전
  if (relative) {
    return (
      <ImgWrap onClick={_onClick}>
        {like ? (
          <FontAwesomeIcon style={{ color: Color.Primary, fontSize: "32px" }} icon={fasHeart} onClick={userLike} />
        ) : (
          <FontAwesomeIcon style={{ color: Color.Primary, fontSize: "32px" }} icon={farHeart} onClick={userLike} />
        )}
        <Title>
          <div>
            <br />
            {title ? title : ""}
            <br />
            {lowBid ? `${input_priceComma(lowBid)}원` : ""}
          </div>
        </Title>
        <RelatedImg like img={img}></RelatedImg>
      </ImgWrap>
    );
  }

  return (
    <ImgWrap onClick={_onClick}>
      <TitlePrice>
        {title ? <div>{title}</div> : ""}
        {lowBid ? <div>{input_priceComma(lowBid)}원</div> : ""}
      </TitlePrice>
      <RelatedImg img={img}></RelatedImg>
    </ImgWrap>
  );
};

RelatedProduct.defaultProps = {
  img: "https://movie-phinf.pstatic.net/20210308_97/1615182990261ekXlL_JPEG/movie_image.jpg",
  height: "10rem",
};

const ImgWrap = styled.div`
  // z-index: 99;
  position: relative;
  // ${(props) => (props.width ? `width: ${props.width};` : "width:12rem; flex-grow: 1;")};
  height: ${(props) => (props.height ? props.height : "10.1rem")};
  width: ${(props) => (props.width ? props.width : "11.3rem")};

  flex-wrap: wrap;
  border-radius: 12px;
  cursor: pointer;
  // border: 1px solid red;

  :hover {
    transition: 0.2s;
    transform: scale(1.05);
  }

  &:not(hover) {
    transition: 0.2s;
  }
`;

const RelatedImg = styled.div`
  display: flex;
  background: url(${(props) => props.img}) no-repeat;
  background-size: cover;
  background-position: center;
  width : 11.2rem;
  height : 10.1rem;
  flex-grow: 1;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 12px;
  border: 0.5px solid ${Color.Light_3};
  align-items: center;

  :hover {
    transition: 0.2s;
    ${(props) => (props.like ? "" : "opacity: 0;")}
  }

  &:not(hover) {
    transition: 0.2s;
  }
`;

const LikeImgWrap = styled.div`
  // z-index: 99;
  position: relative;
  ${(props) => (props.width ? `width: ${props.width};` : "width:12rem; flex-grow: 1;")};
  height: ${(props) => (props.height ? props.height : "10rem")};
  flex-wrap: wrap;
  border-radius: 12px;
  cursor: pointer;
  // border: 1px solid red;

  :hover {
    transition: 0.2s;
    transform: scale(1.05);
  }

  &:not(hover) {
    transition: 0.2s;
  }
`;

const TitlePrice = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 98%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  overflow: hidden;
  word-break: break-all;
  opacity: 0;
  transition: 0.2s;
  text-align: center;
  color: #fff;
  font-weight: 500;
  padding: 10px;
  border-radius: 12px;

  :hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const Title = styled.span`
  position: absolute;
  top: 63%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 98%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;
  align-items: center;
  opacity: 0;
  transition: 0.2s;
  font-weight: 500;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0);
  line-height: 190%;
  div {
    margin: auto 0;
  }
  :hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const HeartWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  z-index: 999;

  @media only screen and (max-width: 767px) {
    margin-top: -11vw;
    margin-left: 29vw;
  }
`;

const Heart = styled.div`
  cursor: pointer;
  z-index: 1;
  width: 30px;
  height: 30px;

  transition: all 200ms ease-in;
  background-color: transparent;
  background: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, 0.1);
  :active {
    svg {
      transform: rotate(15deg);
    }
  }
  :active {
    transition: 0.2s;
    transform: scale(1.1);
  }
`;

export default RelatedProduct;
