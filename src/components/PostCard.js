import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import { actionCreators as likeActions } from "redux/modules/like";
import { priceComma } from "shared/common";

import { Timer } from "components/";
import { history } from "../redux/configureStore";
import { Color } from "shared/DesignSys";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart, faPen as fasPen } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

import logo from "images/logo512.png";

const PostCard = (props) => {
  const dispatch = useDispatch();
  const { img, title, currentprice, sucBid, _onClick, _id } = props;
  console.log("🚚", props);
  const like_list = useSelector((state) => state.like.like_list);
  // console.log("💛", like_list);

  const userLike = (_id) => {
    // if (is_login) {
    const _is_like = like_list.some((e) => e.productId === _id);
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

  return (
    <Wrap>
      <Information>
        <UpTime>
          <Timer day {...props} />
        </UpTime>
        <Heart>
          {like_list.some((e) => e.productId === _id) ? <FontAwesomeIcon icon={fasHeart} onClick={() => userLike(_id)} /> : <FontAwesomeIcon icon={farHeart} onClick={() => userLike(_id)} />}
        </Heart>
        {img.length > 0 && <Image alt="item" img={img} onClick={() => history.push(`/product/detail/${_id}`)} />}
        <Desc>
          <Title onClick={() => history.push(`/product/detail/${_id}`)}>{title}</Title>
          {/* <Currentprice>{currentprice}</Currentprice> */}
          <Sucbid>{priceComma(sucBid)}원</Sucbid>
        </Desc>
      </Information>
    </Wrap>
  );
};

PostCard.defaultPorps = {
  title: "Title",
  currentprice: 1000,
  sucBid: 1000,
  img: logo,
};

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 32.5px;
  margin: 45px 0;
  box-sizing: border-box;
`;

const Information = styled.div`
  width: 300px;
  height: 404px;
  border: 2px solid ${Color.Primary};
  box-shadow: 0 0 10px ${Color.Light_4};
  box-sizing: border-box;
`;

const Image = styled.div`
  background-image: ${(props) => `url(${props.img})`};
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 76%;
  border-radius: 30px 30px 0 0;
  cursor: pointer;
`;

const UpTime = styled.div`
  z-index: 10;
  display: flex;
  width: max-content;
  position: absolute;
  background-color: #ffffff88;
  border-radius: 14px;
  margin-top: 18px;
  margin-left: 18px;
  padding: 5px 10px;
  font-size: 20px;
  color: ${Color.Dark_2};
  transition: all 200ms ease-in-out;
  :hover {
    background-color: #ffffff;
    color: ${Color.Primary};
  }
`;

const Heart = styled.div`
  z-index: 12;
  cursor: pointer;
  width: max-content;
  position: absolute;
  margin: 250px 240px;
  background-color: white;
  color: ${Color.Primary};
  font-size: 25px;
  padding: 3px;
  text-align: center;
  width: 40px;
  height: 40px;
  border-radius: 16px;
`;

const Desc = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #2e2e2e;
  width: 300px;
  min-height: 104px;
  border-radius: 0 0 30px 30px;

  text-align: left;
  box-sizing: border-box;
  /* background-color: ${Color.Light_2}; */
`;

const Title = styled.div`
  padding-top: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 250px;
  cursor: pointer;
`;

const Sucbid = styled.div``;

export default PostCard;
