import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle as fasClose, faEllipsisV as fasModi } from "@fortawesome/free-solid-svg-icons";
import { Bid, Edit } from "components/";

import { Grid, Input, Line, Button, Text, Profile } from "elements/";

import { Color } from "shared/DesignSys";

const Modal = (props) => {
  const { top, bottom, margin, color, text, bid, immediateBid, successAlarm, sucBid, onSale, setting } = props;
  const styles = { top: top, bottom: bottom, margin: margin, color: color, text: text };
  const [modal, setModal] = useState(false);

  // console.log(props);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  if (bid) {
    return (
      <>
        {onSale ? (
          <Button {...styles} _onClick={openModal}>
            입찰표 작성
          </Button>
        ) : (
          <Button {...styles} disabled>
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
        {onSale ? (
          <Button {...styles} _onClick={openModal} noflex width="270px">
            즉시 낙찰
          </Button>
        ) : (
          <Button {...styles} disabled noflex width="270px">
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
              <BidConfirm open={modal} close={closeModal}>
                <Profile img></Profile>
                <Text h1 marginT="1%" textAlign="center" color={Color.Primary}>
                  ~~님께서 낙찰을 시도했습니다!
                </Text>
                <Text h2 marginB="3%" textAlign="center">
                  거래를 수락하시겠습니까?
                </Text>
                <Text size="13px" marginB="6%" textAlign="center" color={Color.Primary}>
                  * 블랙 유저처럼 보인다면 아니오를 눌러주세요!
                </Text>
                <Buttons>
                  <Button _onClick={() => {}} width="100%" margin="0 0.5rem 0 0">
                    수락
                  </Button>
                  <Button sub _onClick={() => {}} width="100%" margin="0 0 0 0.5rem">
                    아니오
                  </Button>
                </Buttons>
              </BidConfirm>
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

const BidConfirm = styled.div`
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

export default Modal;
