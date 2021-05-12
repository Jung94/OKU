import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "react-use";

import styled from "styled-components";
import { Grid, Input, Line, Button, Text } from "elements/";
import { Timer } from "components/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC } from "@fortawesome/free-solid-svg-icons";

import { priceComma, input_priceComma } from "shared/common";
import { actionCreators as bidActions } from "redux/modules/bid";
import { actionCreators as productActions } from "redux/modules/product";

const Bid = (props) => {
  const dispatch = useDispatch();
  const history = props.history;
  const p_id = props._id;
  const { open, close, bid, immediateBid, sucBid, deadLine, createAt, sellerunique, _id, onSale } = props;
  const productOK = useSelector((state) => state.product.product_detail);

  const [bidPrice, setBid] = useState("");
  const onChangeBid = useCallback((e) => setBid(e.target.value), []);
  
  const bidInfo = React.useRef();
  const bid_before = useSelector((state) => state.bid.bid_before);
  const [messageBid, setMessageBid] = useState('');

  const _current = useSelector((state) => state.bid.current);

  React.useEffect(() => {
    
    if (bid_before === 'before' ) {
      setMessageBid('현재 입찰가 보다 높아야 해욧!');
      bidInfo.current.style.display = 'block';
      console.log('현재 입찰가 보다 높아야 해요!');
      return;
    } else if (bid_before === 'time') {
      setMessageBid('마감 시간이 종료되었어요..');
      bidInfo.current.style.display = 'block';
      console.log('마감 시간이 종료되었어요..');
      return;
    } else if (bid_before === 'success') {
      console.log(bid_before);
      bidInfo.current.style.display = 'none';
    } 

  }, [bid_before]);

  useInterval(() => {
    dispatch(bidActions.setBidAPI(p_id));
  }, 1000);

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
            {_current ? (<Price>{priceComma(_current)}원</Price>) : <Price>{priceComma(productOK.lowBid)}원</Price>}
            {/* <Price>{priceComma(_current)}원</Price> */}
            <Input
              value={input_priceComma(bidPrice)}
              _onChange={onChangeBid}
              num
              width="75%"
              margin="6% auto 0"
              adornment="원"
              plcholder="입찰가를 입력해주세요!"
            />
            <InfoUl ref={bidInfo}>
              <li>{messageBid}</li>
            </InfoUl> 
            <Button _onClick={addBid} width="75%" margin="4% auto 9% auto">
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

const Price = styled.div`
  margin: 6% auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
  font-size: 20px;
  font-weight: 500;
`;

const InfoUl = styled.ul`
  display: none;
  width: 300px;
  margin: 4% auto 0;
  list-style-type: none;
  font-size: 14px;
  text-align: center;
  color: #ee3a57;
  position: relative;
  font-weight: 500;
`

const BidBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default Bid;
