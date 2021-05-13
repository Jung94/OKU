import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import { actionCreators as likeActions } from "redux/modules/like";
import { priceComma } from "shared/common";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart, faPen as fasPen } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

import { Timer } from "components/";

import { Color } from "shared/DesignSys";

const PostCard = (props) => {
  // const _id = props.match.params.id;
  const dispatch = useDispatch();
  const { img, title, currentprice, sucBid, _onClick, _id } = props;
  const _is_like = useSelector((state) => state.like.is_like);
  const like_list = useSelector((state) => state.like.like_list);

  const checkLike = (r) => {
    if (r.productId === _id) {
      return true;
    }
  };

  const like = like_list.some(checkLike);

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

  return (
    <Cards>
      <Information>
        <Image onClick={_onClick}>
          <img alt="item" src={img} />
          {/* <UpTime>
            <div style={{ backgroundColor: "white", padding: "5px", height: "0" }}>
              <Timer day {...props} purple />
            </div>
          </UpTime> */}
          <Dibs>
            {like ? (
              <div onClick={userLike}>
                <FontAwesomeIcon style={{ color: Color.Primary, fontSize: "38px" }} icon={fasHeart} />
              </div>
            ) : (
              <div onClick={userLike}>
                <FontAwesomeIcon style={{ color: Color.Secondary_2, fontSize: "38px" }} icon={farHeart} />
              </div>
            )}
          </Dibs>
        </Image>

        <Desc>
          <Title>{title}</Title>
          {/* <Deadline>경매마감까지 00 : 57 : 30 초 남았습니다</Deadline> */}
          {/* <Currentprice>{currentprice}</Currentprice> */}
          <Sucbid>{priceComma(sucBid)}원</Sucbid>
        </Desc>
      </Information>
    </Cards>
  );
};

PostCard.defaultPorps = {
  title: "타이틀 디폴드",
  currentprice: "현재 디폴트",
  sucBid: "1원",
};

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 32.5px;
  margin: 45px 0;
`;

const Information = styled.div`
  width: 300px;
  height: 404px;
`;

const Image = styled.div`
  & > img {
    width: 300px;
    height: 300px;
    border-radius: 30px 30px 0 0;
    z-index: 0;
  }
`;

const UpTime = styled.div`
  z-index: 999;
  margin: -20px 0 0 0;
  display: flex;
  width: 90px;
`;

const Dibs = styled.div`
  z-index: 999;
  margin: -60px 0 0 248px;
  cursor: pointer;
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
  margin: 12px 0 0 0;
  padding: 8px 25px 0 25px;
  background-color: ${Color.Light_2};
`;

const Title = styled.div`
  /* margin: 0 142px 10px 25px; */
  padding-top: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 250px;
`;

const Currentprice = styled.div`
  /* margin: 0 142px 10px 25px; */
`;

const Sucbid = styled.div`
  /* margin: 0 142px 21px 25px; */
`;

export default PostCard;