import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import { actionCreators as likeActions } from "redux/modules/like";
import { priceComma } from "shared/common";

import { Timer } from "components/";
import { history } from "../redux/configureStore";
import { Color } from "shared/DesignSys";
import IconHeartOn from "images/icon_HeartOn.svg";
import IconHeartOff from "images/icon_HeartOff.svg";
import IconBid from "images/icon_Bid.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart, faPen as fasPen } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

import logo from "images/logo512.png";

const PostCard = (props) => {
  const dispatch = useDispatch();
  const is_login = localStorage.getItem("access_token");

  const { img, title, currentprice, lowBid, _onClick, _id, main, result } = props;

  // 좋아요 확인용
  const like_list = useSelector((state) => state.like.like_list);
  // console.log("💛", like_list);
  const likeOrNot = like_list.some((e) => e.productId === _id); // props로 넘어오는 각 프로덕트의 _id와 같은지 확인

  const userLike = (_id) => {
    if (is_login) {
      const _is_like = like_list.some((e) => e.productId === _id);
      if (!_is_like) {
        // 좋아요 한 적이 없으면 false이므로
        dispatch(likeActions.addLikeAPI(_id)); // 좋아요 실행
      } else {
        // 좋아요 한 적이 있으면 true
        dispatch(likeActions.deleteLikeAPI(_id)); // 좋아요 해제 실행
      }
    } else {
      window.alert("로그인이 필요한 서비스입니다.");
    }
  };

  return (
    <Wrap>
      <UpTime>
        <Timer day {...props} />
      </UpTime>
      <div onClick={() => userLike(_id)}> {likeOrNot ? <Heart img={IconHeartOn} /> : <Heart img={IconHeartOff} />} </div>
      {/* 👇이거 중요! */}
      {img && img.length > 0 && <Image alt="item" img={img} onClick={() => history.push(`/product/detail/${_id}`)} />}
      <Desc>
        <div style={{ width: "100%" }}>
          <Title onClick={() => history.push(`/product/detail/${_id}`)}>{title}</Title>
          {/* <Currentprice>{currentprice}</Currentprice> */}
        </div>
        <div style={{ textAlign: "right", alignItems: "flex-end", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "8px" }}>
          <Bid />
          <Sucbid>
            {priceComma(lowBid)}&thinsp;<span className="won">원</span>
          </Sucbid>
        </div>
      </Desc>
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
  // border: 1px solid red;
  position: relative;
  width: 228px;
  height: 315px;
  box-shadow: 0 0 10px ${Color.Light_4};
  border-radius: 30px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #f8f8f8;

  :hover {
    transition: 0.2s;
    transform: scale(1.03);
  }

  &:not(hover) {
    transition: 0.2s;
  }
`;

const Image = styled.div`
  background-image: ${(props) => `url(${props.img})`};
  background-position: center;
  background-size: cover;
  // background-image: linear-gradient( to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), ${(props) => `url(${props.img})`} ;
  width: 100%;
  height: 74%;
  cursor: pointer;
`;

const UpTime = styled.div`
  z-index: 10;
  display: flex;
  width: max-content;
  position: absolute;
  background-color: #ffffff88;
  border-radius: 14px;
  margin-top: 16px;
  margin-left: 16px;
  padding: 6px 10px 4px;
  font-size: 17px;
  color: ${Color.Dark_2};
  transition: all 200ms ease-in-out;
  :hover {
    background-color: #ffffff;
    color: ${Color.Primary};
  }
`;

const Heart = styled.div`
  position: absolute;
  // border: 1px solid blue;
  z-index: 12;
  top: 191px;
  right: 11px;
  cursor: pointer;
  width: 32px;
  height: 32px;
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

const Bid = styled.div`
  // border: 1px solid red;
  width: 18px;
  height: 18px;
  background-image: url(${IconBid});
  background-size: cover;
  background-position: center;
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: #2e2e2e;
  width: 100%;
  min-height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* flex-direction: column; */
  line-height: 180%;
  padding: 0 18px 0 17px;
  margin-top: 10px;
  // border: 1px solid green;
`;

const Title = styled.div`
  /* 한줄일때 */
  // border: 1px solid red;
  // display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* */
  cursor: pointer;
`;

const Sucbid = styled.div`
  line-height: 100%;
  color: ${Color.Primary};
  .text {
    font-weight: 500;
    letter-spacing: -1px;
    color: ${Color.Light_4};
  }
  .won {
    color: ${Color.Dark_1};
  }
`;

export default PostCard;
