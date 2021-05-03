import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "elements/";
import { Bid } from "components/";

const Modal = (props) => {
  const { top, bottom, margin, color, text, bid, immediateBid, sucBid } = props;
  const styles = { top: top, bottom: bottom, margin: margin, color: color, text: text };
  const [modal, setModal] = useState(false);

  // console.log(modal);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  if (bid) {
    return (
      <>
        <Button {...styles} primaryNoBorder _onClick={openModal}>
          입찰표 작성
        </Button>
        {modal ? (
          <BidWrap modal>
            <BidBack onClick={closeModal}></BidBack>
            <Bid bid open={modal} close={closeModal} {...props}></Bid>
          </BidWrap>
        ) : (
          <></>
        )}
      </>
    );
  }

  if (immediateBid) {
    return (
      <>
        <Button {...styles} primaryNoBorder _onClick={openModal}>
          즉시 낙찰
        </Button>
        {modal ? (
          <BidWrap modal>
            <BidBack onClick={closeModal}></BidBack>
            <Bid immediateBid open={modal} close={closeModal} {...props}></Bid>
          </BidWrap>
        ) : (
          <></>
        )}
      </>
    );
  }
};

const BidWrap = styled.div`
  display: flex;

  backdrop-filter: blur(2px);
  backdrop-filter: grayscale(10%);

  align-items: center;
  justify-content: space-evenly;
  background-color: #eeeee333;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  //유보!!!
  animation: ${(props) => (props.modal ? "modal-show 200ms, modal-bg-show 200ms" : "modal-bg-close 2s")};
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
      opacity: 0;
      display: none;
    }
  }
`;

const BidBack = styled.div`
  display: flex;
  position: fixed;
  background-color: #00000033;
  z-index: 99;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default Modal;
