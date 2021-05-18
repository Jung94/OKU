import React from "react";
import styled from "styled-components";
import { priceComma } from "shared/common";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as likeActions } from "redux/modules/like";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart, faPen as fasPen } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

import { Color } from "shared/DesignSys";

const RelatedProduct = (props) => {
  const dispatch = useDispatch();

  const { title, img, lowBid, _id, _onClick, like, relative } = props;

  const _is_like = useSelector((state) => state.like.is_like);
  const like_list = useSelector((state) => state.like.like_list);

  const checkLike = (r) => {
    if (r.productId === _id) {
      return true;
    }
  };

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
      <ImgWrap onClick={_onClick}>
        <RelatedImg like img={img}></RelatedImg>
      </ImgWrap>
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
            {lowBid ? `${priceComma(lowBid)}원` : ""}
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
        {lowBid ? <div>{priceComma(lowBid)}원</div> : ""}
      </TitlePrice>
      <RelatedImg img={img}></RelatedImg>
    </ImgWrap>
  );
};

RelatedProduct.defaultProps = {
  img: "https://movie-phinf.pstatic.net/20210308_97/1615182990261ekXlL_JPEG/movie_image.jpg",
};

const ImgWrap = styled.div`
  // z-index: 99;
  position: relative;
  width: 12rem;
  height: 10rem;
  flex-grow: 1;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: 1%;
  border-radius: 16px;
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
  border-radius: 16px;

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
  border-radius: 16px;
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

const RelatedImg = styled.div`
  display: flex;
  background: url(${(props) => props.img}) no-repeat;
  background-size: cover;
  background-position: center;
  flex-grow: 1;
  height: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: 1%;
  border-radius: 16px;
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

export default RelatedProduct;
