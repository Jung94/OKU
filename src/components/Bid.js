import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Grid, Input, Line, Button, Text } from "elements/";
import { Timer } from "components/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC } from "@fortawesome/free-solid-svg-icons";

import { priceComma, input_priceComma } from "shared/common";
import { actionCreators as bidActions } from "redux/modules/bid";

const Bid = (props) => {
  const dispatch = useDispatch();
  const { open, close, bid, immediateBid, sucBid, deadLine, createAt, sellerunique, _id, onSale } = props;

  const [bidPrice, setBid] = useState("");
  const onChangeBid = useCallback((e) => setBid(e.target.value), []);

  const addBid = () => {
    dispatch(bidActions.addBidAPI(parseInt(bidPrice.replace(/,/g, "")), Date.now()));
  };
  // 숫자로 보내기!
  // console.log(parseInt(bidPrice.replace(/,/g, "")));

  const addSuccessbid = () => {
    dispatch(bidActions.addSucbidAPI(sucBid, sellerunique, Date.now()));
  };

  if (bid) {
    return (
      <>
        {open ? (
          <BidBox>
            <Text h2 marginT="9%" marginB="3%">
              입찰표 작성
              <FontAwesomeIcon icon={fasQC} />
            </Text>
            <Grid textAlign="center" justify="space-between" width="45%">
              <Text h3>
                <Timer all deadLine={deadLine} onSale={onSale} purple />
              </Text>
              <Timer timeProgress deadLine={deadLine} createAt={createAt} onSale={onSale} />
            </Grid>
            <Input
              value={input_priceComma(bidPrice)}
              _onChange={onChangeBid}
              num
              width="75%"
              margin="6% auto"
              adornment="원"
              plcholder="입찰가를 입력해주세요!"
            />
            <Button _onClick={addBid} width="75%" margin="0 auto 9% auto">
              입찰하기
            </Button>
          </BidBox>
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
          <BidBox {...props} open={open}>
            <Text h2 marginT="9%">
              즉시 입찰
              <FontAwesomeIcon icon={fasQC} />
            </Text>
            <Text h4>즉시 낙찰가에 낙찰이 진행됩니다!</Text>
            <Text price lineHeight="400%">
              {priceComma(sucBid)}
              <Text won>원</Text>
            </Text>
            <Button _onClick={addSuccessbid} width="75%" margin="0 auto 9% auto">
              즉시 낙찰하기
            </Button>
          </BidBox>
        ) : (
          <></>
        )}
      </>
    );
  }
};

const BidBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default Bid;
