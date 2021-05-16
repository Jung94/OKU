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
  const is_login = localStorage.getItem("access_token");

  const { img, title, currentprice, lowBid, _onClick, _id } = props;
  console.log("🚚", props);

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
      {/* <Heart onClick={() => userLike(_id)}>{likeOrNot ? <FontAwesomeIcon icon={fasHeart} /> : <FontAwesomeIcon icon={farHeart} />}</Heart> */}
      {img.length > 0 && <Image alt="item" img={img} onClick={() => history.push(`/product/detail/${_id}`)} />}
      <Desc>
        <div>
          <Title onClick={() => history.push(`/product/detail/${_id}`)}>{title}</Title>
          {/* <Currentprice>{currentprice}</Currentprice> */}
        </div>
        <div style={{ textAlign: "right", alignItems: "flex-end" }}>
          <Heart onClick={() => userLike(_id)}>{likeOrNot ? <FontAwesomeIcon icon={fasHeart} /> : <FontAwesomeIcon icon={farHeart} />}</Heart>
          <Sucbid>
            <span className="text">최소입찰가</span>
            <br />
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
  width: 300px;
  height: 420px;
  /* border: 2px solid ${Color.Primary}; */
  box-shadow: 0 0 10px ${Color.Light_4};
  border-radius: 30px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Image = styled.div`
  background-image: ${(props) => `url(${props.img})`};
  background-position: center;
  background-size: cover;
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
  background-color: #ffffff;
  color: ${Color.Primary};
  /* position: absolute;
  margin: 255px 245px;
  font-size: 23px;
  padding: 3px;
  width: 38px;
  height: 38px; */
  text-align: center;
  margin: 0 0 0 auto;
  border-radius: 16px;
  transition: all 200ms ease-in;
  :active {
    svg {
      transform: rotate(15deg);
    }
  }
  :hover {
    background-color: #ffffff;
    color: ${Color.Primary};
  }
`;

const Desc = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #2e2e2e;
  width: 100%;
  min-height: 104px;
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
  line-height: 180%;
  padding-left: 22px;
  padding-right: 15px;
  margin-top: 10px;
`;

const Title = styled.div`
  /* 한줄일때 */
  display: inline-block;
  width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* */
  cursor: pointer;
`;

const Sucbid = styled.div`
  /* text-align: right; */
  line-height: 100%;
  color: ${Color.Primary};
  .text {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -1px;
    color: ${Color.Light_4};
  }
  .won {
    color: ${Color.Dark_1};
  }
`;

export default PostCard;
