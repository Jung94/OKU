import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

import { Modal } from "elements/";

import { Color } from "shared/DesignSys";

import moment from "moment";
import "moment/locale/ko";

const RingContents = (props) => {
  moment.locale("ko");
  const { alertType, productTitle, productId, creatAt, _id, buyerId } = props;
  return (
    <Box>
      <Desc>
        {alertType === "판매실패" && (
          <>
            <AlertTitle onClick={() => history.push(`/product/detail/${productId}`)}>
              <TitleLeft>❗&thinsp;{alertType}</TitleLeft>
              <TitleRight>{moment(creatAt).fromNow()}</TitleRight>
            </AlertTitle>
            <AlertCotents onClick={() => history.push(`/product/detail/${productId}`)}>
              <NameSpan>{productTitle}</NameSpan>
              이(가) 판매에 실패하였습니다.
            </AlertCotents>
          </>
        )}
        {alertType === "낙찰성공" && (
          <>
            <AlertTitle onClick={() => history.push(`/product/detail/${productId}`)}>
              <TitleLeft>✅&thinsp;{alertType}</TitleLeft>
              <TitleRight>{moment(creatAt).fromNow()}</TitleRight>
            </AlertTitle>
            <AlertCotents onClick={() => history.push(`/product/detail/${productId}`)}>
              <NameSpan>{productTitle}</NameSpan> 경매에 낙찰이 성사되었습니다.
            </AlertCotents>
            <Chatting onClick={() => history.push("/chat")}>거래 채팅 진행하기</Chatting>
          </>
        )}
        {alertType === "낙찰실패" && (
          <>
            <AlertTitle onClick={() => history.push(`/product/detail/${productId}`)}>
              <TitleLeft>❗&thinsp;{alertType}</TitleLeft>
              <TitleRight>{moment(creatAt).fromNow()}</TitleRight>
            </AlertTitle>
            <AlertCotents onClick={() => history.push(`/product/detail/${productId}`)}>
              <NameSpan>{productTitle}</NameSpan>의 낙찰이 실패되었습니다.
            </AlertCotents>
          </>
        )}
        {alertType === "문의" && (
          <>
            <AlertTitle onClick={() => history.push(`/product/detail/${productId}`)}>
              <TitleLeft>💬&thinsp;{alertType}</TitleLeft>
              <TitleRight>{moment(creatAt).fromNow()}</TitleRight>
            </AlertTitle>
            <AlertCotents onClick={() => history.push(`/product/detail/${productId}`)}>
              <NameSpan>{productTitle}</NameSpan>의 문의댓글이 작성되었습니다.
            </AlertCotents>
          </>
        )}
        {alertType === "문의답글" && (
          <>
            <AlertTitle onClick={() => history.push(`/product/detail/${productId}`)}>
              <TitleLeft>💬&thinsp;{alertType}</TitleLeft>
              <TitleRight>{moment(creatAt).fromNow()}</TitleRight>
            </AlertTitle>
            <AlertCotents onClick={() => history.push(`/product/detail/${productId}`)}>
              <NameSpan>{productTitle}</NameSpan>의 문의답글이 작성되었습니다.
            </AlertCotents>
          </>
        )}
        {alertType === "판매성공" && buyerId && (
          <>
            <AlertTitle onClick={() => history.push(`/product/detail/${productId}`)}>
              <TitleLeft>📢&thinsp;{alertType}</TitleLeft>
              <TitleRight>{moment(creatAt).fromNow()}</TitleRight>
            </AlertTitle>
            <AlertCotents onClick={() => history.push(`/product/detail/${productId}`)}>
              <NameSpan>{productTitle}</NameSpan>이(가) 낙찰에 성공하였습니다.
            </AlertCotents>
            <Modal successAlarm alertId={_id} buyerId={buyerId} />
          </>
        )}
      </Desc>
      <Line />
    </Box>
  );
};

// font-size
const Body = "14px";
const Body_2 = "13px";

// styled-components
const Box = styled.div`
  transition: all 50ms ease-in;
  margin-top: 1px;
  margin-bottom: 1px;
  :hover {
    background-color: ${Color.Secondary_2}44;
  }
`;

const Desc = styled.div`
  padding: 10px 10px 15px 10px;
`;

const AlertTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleLeft = styled.span`
  color: #ae00ff;
  font-size: ${Body};
  font-weight: 700;
  line-height: 220%;
  cursor: pointer;
`;

const TitleRight = styled.span`
  color: ${Color.Light_4};
  font-size: 12px;
  font-weight: 700;
`;

const AlertCotents = styled.div`
  color: #707070;
  font-size: 13px;
  margin-top: 3px;
  font-weight: 400;

  cursor: pointer;
`;

const Line = styled.div`
  border-bottom: 1px solid #d0d0d0;
  cursor: default;
`;

const Chatting = styled.button`
  width: 100%;
  height: 25px;
  border-radius: 7px;
  color: #ffffff;
  background: ${Color.Primary};

  margin-top: 0.5rem;

  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const NameSpan = styled.span`
  font-size: ${Body_2};
  font-weight: 700;
  color: ${Color.Dark_2};
`;

export default RingContents;
