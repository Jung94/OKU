import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import IconHeartOn from "images/icon_HeartOn.svg";
import IconHeartOff from "images/icon_HeartOff.svg";
import IconBid from "images/icon_Bid.svg";
import { Timer } from "components/";
import { history } from "../redux/configureStore";

import { actionCreators as likeActions } from "redux/modules/like";
import { input_priceComma } from "shared/common";

import logo from "images/logo512.png";

const PostCardMobile = (props) => {
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
      <Image img={img} onClick={() => history.push(`/product/detail/${_id}`)} />
      <Desc>
        <div style={{ flexGrow: "1" }} onClick={() => history.push(`/product/detail/${_id}`)}>
          <Title>{title}</Title>
          <Price>
            <Bid />
            <Sucbid>
              {/* {input_priceComma(lowBid)} */}
              {input_priceComma(lowBid)}&thinsp;원
            </Sucbid>
          </Price>
        </div>
        <HeartWrap onClick={() => userLike(_id)}> {likeOrNot ? <Heart img={IconHeartOn} /> : <Heart img={IconHeartOff} />} </HeartWrap>
      </Desc>
    </Wrap>
  );
};

PostCardMobile.defaultPorps = {
  title: "타이틀",
  currentprice: 1000,
  lowBid: 1000,
  img: logo,
};

const Wrap = styled.div`
  // border: 1px solid red;
  position: relative;
  width: 100%;
  height: 173px;
  background: #f8f8f8;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 15px;
  justify-content: flex-start;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  // 이거이거
  margin-bottom: 20px;
`;

const Image = styled.div`
  background-image: ${(props) => `url(${props.img})`};
  width: 140px;
  height: 140px;
  background-position: center;
  background-size: cover;
  border-radius: 30px;
  margin: 0 20px 0 0;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
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

const Desc = styled.div`
  height: 140px;

  // width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  justify-content: space-between;
`;

const HeartWrap = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  z-index: 1;
`;

const Title = styled.div`
  width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #2e2e2e;
  font-weight: bold;
  font-size: 18px;
  line-height: 200%;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const Bid = styled.div`
  width: 18px;
  height: 18px;
  background-image: url(${IconBid});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const Sucbid = styled.div`
  color: #2e2e2e;
  font-weight: bold;
  font-size: 15px;
  margin: 0 0 0 10px;
`;

export default PostCardMobile;
