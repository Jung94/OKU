import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle as fasClose, faEllipsisV as fasModi } from "@fortawesome/free-solid-svg-icons";
import { Bid, Edit, BidConfirm } from "components/";

import { actionCreators as bidActions } from "redux/modules/bid";

import { Grid, Input, Line, Button, Text, Profile } from "elements/";

import { Color } from "shared/DesignSys";

const Modal = (props) => {
  const dispatch = useDispatch();

  const { top, bottom, margin, color, text, bid, immediateBid, successAlarm, sucBid, onSale, soldBy, soldById, setting, stamp, sellerunique, timeNow } = props;
  const styles = { top: top, bottom: bottom, margin: margin, color: color, text: text };
  const [modal, setModal] = useState(false);

  // console.log(props);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const addSuccessbid = () => {
    dispatch(bidActions.addNEWSucbidAPI(sucBid, sellerunique, timeNow));
    setModal(true);
    console.log("실행");

    // close();
  };

  if (bid) {
    return (
      <>
        {onSale === false ? (
          <Button {...styles} disabled>
            입찰표 작성
          </Button>
        ) : onSale === true && soldBy === null ? (
          <Button {...styles} _onClick={openModal}>
            입찰표 작성
          </Button>
        ) : onSale === true && soldBy === "거래대기중" ? (
          <Button {...styles} disabled _onClick={openModal}>
            입찰표 작성
          </Button>
        ) : (
          <Button {...styles} _onClick={openModal}>
            입찰표 작성
          </Button>
        )}
        {modal ? (
          <ModalWrap modal>
            <Screen onClick={closeModal}></Screen>
            <ModalBox>
              <Bid bid open={modal} close={closeModal} {...props}></Bid>
            </ModalBox>
          </ModalWrap>
        ) : (
          <></>
        )}
      </>
    );
  }

  if (immediateBid) {
    return (
      <>
        {onSale === false ? (
          <Button {...styles} disabled noflex width="270px">
            즉시 낙찰
          </Button>
        ) : onSale === true && soldBy === null ? (
          <Button {...styles} _onClick={openModal} noflex width="270px">
            즉시 낙찰
          </Button>
        ) : onSale === true && soldBy === "거래대기중" ? (
          <Button {...styles} disabled _onClick={openModal} noflex width="270px">
            즉시 낙찰
          </Button>
        ) : (
          <Button {...styles} _onClick={openModal} noflex width="270px">
            즉시 낙찰
          </Button>
        )}
        {modal ? (
          <ModalWrap modal>
            <Screen onClick={closeModal}></Screen>
            <ModalBox>
              <Bid immediateBid open={modal} close={closeModal} {...props}></Bid>
            </ModalBox>
          </ModalWrap>
        ) : (
          <></>
        )}
      </>
    );
  }

  if (setting) {
    return (
      <Wrap>
        <FontAwesomeIcon icon={fasModi} onClick={openModal} className="setting" />
        {modal ? (
          <ModalWrap modal>
            <Screen onClick={closeModal}></Screen>
            <ModalBox>
              <Edit open={modal} close={closeModal}></Edit>
            </ModalBox>
          </ModalWrap>
        ) : (
          <></>
        )}
      </Wrap>
    );
  }

  if (successAlarm) {
    return (
      <Wrap>
        <AlertButton onClick={openModal}>대화 시도하기</AlertButton>
        {modal ? (
          <ModalWrap modal>
            <Screen onClick={closeModal}></Screen>
            <ModalBox>
              <BidConfirm open={modal} close={closeModal} buyerId={props?.buyerId} alertId={props?.alertId}></BidConfirm>
            </ModalBox>
          </ModalWrap>
        ) : (
          <></>
        )}
      </Wrap>
    );
  }

  if (stamp) {
    return (
      <Wrap>
        <Button _onClick={addSuccessbid} width="300px" margin="20px auto 9% auto">
          즉시 낙찰하기
        </Button>
        {modal ? (
          <ModalWrap modal>
            <Screen onClick={closeModal}></Screen>
            <ModalBox>
              <Text h2>입찰/낙찰에 성공하였습니다!</Text>
            </ModalBox>
          </ModalWrap>
        ) : (
          <></>
        )}
      </Wrap>
    );
  }
};

const ModalWrap = styled.div`
  display: flex;

  backdrop-filter: blur(2px);

  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(0, 0, 0, 0.52);
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  //유보!!!
  animation: ${(props) => (props.modal ? "modal-show 200ms, modal-bg-show 200ms" : "modal-bg-close 200ms")};
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes modal-bg-close {
    from {
      opacity: 1;
    }
    to {
      margin-top: -50px;
      opacity: 0;
    }
  }
`;

const Wrap = styled.div`
  .setting {
    border: 2px solid white;
  }
`;

const Screen = styled.div`
  display: flex;
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  box-shadow: 0 2px 30px #00000088;
  border-radius: 12px;
  width: 30vw;
  min-width: 400px;
  z-index: 9999;

  @media only screen and (max-width: 767px) {
    min-width: 300px;
    width: 90%;
    max-width: 600px;
  }
`;

const AlertButton = styled.div`
  width: 100%;
  height: 25px;
  border-radius: 7px;
  color: #ffffff;
  background: ${Color.Primary};

  margin-top: 0.5rem;

  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms ease-in-out;
  :hover {
    background: ${Color.Tag};
    box-shadow: 0 0 0 3px ${Color.Primary}44;
  }
`;

export default Modal;
