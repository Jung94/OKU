import React, { useRef, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Grid, Input, Line, Button, Text, Profile } from "elements/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC } from "@fortawesome/free-solid-svg-icons";

import { history } from "../redux/configureStore";

import { actionCreators as bidActions } from "redux/modules/bid";
import { Color } from "shared/DesignSys";

const BidConfirm = (props) => {
  const dispatch = useDispatch();
  const { open, close, buyerId, alertId } = props;

  const buyer = useSelector((state) => state.bid.buyer);

  const successMsg = useSelector((state) => state.bid.successMsg);

  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    dispatch(bidActions.getPublicUserAPI(buyerId));
    dispatch(bidActions.confirmSuccessAPI(alertId));
  }, [successMsg]);

  const makeItBid = () => {
    dispatch(bidActions.confirmSuccessAPI(alertId, confirm));
    console.log(successMsg);

    if (successMsg === "거래가 취소되었습니다.") {
      console.log(successMsg, "취소");
      close();
    } else {
      console.log(successMsg);
      close();
      history.push("/chat");
    }
  };

  return (
    <>
      {open ? (
        <BidConfirmBox {...props} open={open}>
          <Profile img={buyer.profileImg} size="5rem"></Profile>
          <Text h1 marginT="1%" marginB="2%" textAlign="center">
            <span style={{ color: `${Color.Primary}` }}>{buyer.nickname}</span>
            님이
            <br />
            낙찰을 원하고 있습니다!
          </Text>
          <Text h2 marginB="3%" textAlign="center">
            거래를 수락하시겠습니까?
          </Text>
          <Text size="13px" marginB="6%" textAlign="center" color={Color.Primary}>
            * 수락을 누르는 즉시 <span style={{ fontWeight: "700" }}>채팅방이 생성</span>됩니다.
            <br />
            블랙 유저처럼 보인다면 아니오를 눌러주세요!
          </Text>
          <Buttons>
            <Button
              sub
              _onClick={() => {
                setConfirm(false);
                makeItBid();
              }}
              width="50%"
              margin="0 2.5px 0 0"
            >
              안할래요
            </Button>
            <Button
              _onClick={() => {
                setConfirm(true);
                makeItBid();
              }}
              width="100%"
              margin="0 0 0 2.5px"
            >
              낙찰 응하기
            </Button>
          </Buttons>
        </BidConfirmBox>
      ) : (
        <></>
      )}
    </>
  );
};

const BidConfirmBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 9%;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
  margin: 0 auto 9% auto;
`;

export default BidConfirm;
