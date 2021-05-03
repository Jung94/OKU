import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Grid, Input, Line, Button, Text } from "elements/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC } from "@fortawesome/free-solid-svg-icons";

import { priceComma, input_priceComma } from "shared/common";

const Bid = (props) => {
  const { open, close, bid, immediateBid, sucBid } = props;

  const [bidPrice, setBid] = useState("");
  const onChangeBid = useCallback((e) => setBid(e.target.value), []);

  // console.log(close);
  // console.log(open);

  if (bid) {
    return (
      <>
        {open ? (
          <>
            <BidWrap {...props} open={open}>
              <BidBack onClick={close}></BidBack>
              <BidBox>
                <h2 style={{ margin: "8% 0 0 0" }}>
                  입찰표 작성
                  <FontAwesomeIcon icon={fasQC} />
                </h2>
                <h5>물음표 스타일은 일단 추후 일괄 적용</h5>
                <Line bottom margin="8% 0 0 0" />
                <Input value={input_priceComma(bidPrice)} onChange={onChangeBid} num width="75%" adornment="원" plcholder="입찰가를 입력해주세요!" margin="8%"></Input>
                <Grid is_flex>
                  <Button primaryNoBorder _onClick={close}>
                    낙찰하기
                  </Button>
                </Grid>
              </BidBox>
            </BidWrap>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }

  if (immediateBid) {
    return (
      <>
        {open ? (
          <>
            <BidWrap {...props} open={open}>
              <BidBack onClick={close}></BidBack>
              <BidBox>
                <h2 style={{ margin: "8% 0 0 0" }}>
                  즉시 입찰
                  <FontAwesomeIcon icon={fasQC} size="1.2em" />
                </h2>
                <h5>물음표 스타일은 일단 추후 일괄 적용</h5>
                <Line bottom margin="8% 0 0 0" />
                <Text price marginB="8%" marginT="8%">
                  {priceComma(sucBid)}원
                </Text>

                <Grid is_flex>
                  <Button primaryNoBorder _onClick={close}>
                    낙찰하기
                  </Button>
                </Grid>
              </BidBox>
            </BidWrap>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
};

Bid.defaultProps = {
  color: "#d2d2d2",
};

const BidWrap = styled.div`
  display: flex;
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
  animation: ${(props) => (props.open ? "modal-show 200ms, modal-bg-show 200ms" : "modal-bg-close 2s")};
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

const BidBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  box-shadow: 0 2px 30px #00000088;
  width: 30vw;
  min-width: 400px;
  z-index: 999;
`;

export default Bid;
