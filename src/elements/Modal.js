import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle as fasClose, faEllipsisV as fasModi } from "@fortawesome/free-solid-svg-icons";
import { Button } from "elements/";
import { Bid, Edit } from "components/";

const Modal = (props) => {
  const { top, bottom, margin, color, text, bid, immediateBid, sucBid, onSale, setting } = props;
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
          <Button {...styles} _onClick={openModal} margin="10px 0">
            입찰표 작성
          </Button>
        ) : (
          <Button {...styles} disabled margin="10px 0">
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
          <Button {...styles} _onClick={openModal} margin="10px 0">
            즉시 낙찰
          </Button>
        ) : (
          <Button {...styles} disabled margin="10px 0">
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
      <>
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
      </>
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
  border-radius: 16px;
  width: 30vw;
  min-width: 400px;
  z-index: 9999;
`;

export default Modal;
