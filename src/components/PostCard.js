import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { actionCreators as likeActions } from "redux/modules/like";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart, faPen as fasPen } from "@fortawesome/free-solid-svg-icons";

const PostCard = (props) => {
  const dispatch = useDispatch();
  const { img, title, currentprice, sucBid, _onClick, _id } = props;
  const _is_like = useSelector((state) => state.like.is_like);

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
            <img src={img} />
            <Dibs>
            {!_is_like ? (
            <div onClick={userLike}>
                <FontAwesomeIcon style={{ color: "#eac7ff", fontSize: "41px" }} icon={fasHeart} />
            </div>
            ) : (
            <div onClick={userLike}>
                <FontAwesomeIcon style={{ color: "#ae27ff", fontSize: "41px" }} icon={fasHeart} />
            </div>
            )}
            </Dibs>
        </Image>

        <Desc>
            <Title>{title}</Title>
            {/* <Deadline>
                경매마감까지 00 : 57 : 30 초 남았습니다
            </Deadline> */}
            <Currentprice>{currentprice}</Currentprice>
            <Sucbid>{sucBid}원</Sucbid>
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
    cursor : pointer;
}
`;

const Dibs = styled.div`
    z-index: 999;
    position: relative;
    margin: -60px 0 0 248px;
    cursor: pointer;
`;

const Desc = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #2e2e2e;
    width: 300px;
    min-height: 104px;
    background: #f2f2f2;
    border-radius: 0 0 30px 30px;
    text-align: left;
    box-sizing: border-box;
    margin: 13px 0 0 0;
`;

const Title = styled.div`
    margin: 0 142px 11px 25px;
    padding-top: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 250px;
    cursor : pointer;
`;

const Currentprice = styled.div`
    margin: 0 142px 21px 25px;
`;

const Sucbid = styled.div`
    margin: 0 142px 21px 25px;
`;

export default PostCard;