import React, { useState } from "react";
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
        <Bid bid open={modal} close={closeModal} {...props}></Bid>
      </>
    );
  }

  if (immediateBid) {
    return (
      <>
        <Button {...styles} primaryNoBorder _onClick={openModal}>
          즉시 낙찰
        </Button>
        <Bid immediateBid open={modal} close={closeModal} {...props}></Bid>
      </>
    );
  }
};

export default Modal;
