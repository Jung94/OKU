import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "react-use";

import styled from "styled-components";
import { Grid, Input, Line, Button, Text, Modal } from "elements/";
import { Timer } from "components/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC } from "@fortawesome/free-solid-svg-icons";

import { history } from "../redux/configureStore";

import { API } from "shared/Api";

import { input_priceComma, comma, uncomma } from "shared/common";
import { actionCreators as bidActions } from "redux/modules/bid";
import { actionCreators as productActions } from "redux/modules/product";

import { Color } from "shared/DesignSys";

const Stamp = (props) => {
  const { children } = props;

  return (
    <>
      <BidBox>
        <Text h1 marginT="10%" marginB="10%">
          {children}에 성공하였습니다!
        </Text>
      </BidBox>
    </>
  );
};

const Bid = (props) => {
  const dispatch = useDispatch();
  const p_id = props._id;
  const { open, close, bid, immediateBid, lowBid, sucBid, deadLine, createAt, sellerunique, _id, onSale } = props;
  const u_id = localStorage.getItem("uid");

  const productOK = useSelector((state) => state.product.product_detail);

  const [bidPrice, setBid] = useState("");
  const onChangeBid = useCallback((e) => setBid(e.target.value), []);

  const bid_before = useSelector((state) => state.bid.bid_before);
  const [messageBid, setMessageBid] = useState("");

  const _current = useSelector((state) => state.bid.current);

  const [stampMsg, setStamp] = useState(false);

  useInterval(() => {
    dispatch(bidActions.setBidAPI(p_id, lowBid)); // lowBid 있어야함
  }, 1000);

  const addBid = () => {
    const trueBid = parseInt(bidPrice.replace(/,/g, ""));
    console.log(_current, lowBid, trueBid);
    if (!onSale) {
      setMessageBid("마감 시간이 종료되었어요..");
    } else if (!trueBid) {
      setMessageBid("입찰가를 입력해야합니다.");
    } else if (trueBid < lowBid) {
      setMessageBid("최소 입찰가보다 높아야 해욧!");
    } else if (_current === lowBid && _current === trueBid) {
      // 최소입찰가를 입력할때
      dispatch(bidActions.addBidAPI(parseInt(bidPrice.replace(/,/g, "")), Date.now()));
    } else if (trueBid > sucBid) {
      setMessageBid("즉시 낙찰가보다 낮아야 해욧!");
    } else if (trueBid === sucBid) {
      addSucBid();
    } else if (_current > lowBid) {
      if (trueBid < _current || trueBid < lowBid) {
        setMessageBid("현재 입찰가보다 높아야 해욧!");
      } else {
        dispatch(bidActions.addBidAPI(parseInt(bidPrice.replace(/,/g, "")), Date.now()));
      }
    } else {
      dispatch(bidActions.addBidAPI(parseInt(bidPrice.replace(/,/g, "")), Date.now()));
    }
    // return succeessModal();
  };

  const addSucBid = () => {
    dispatch(addNEWSucbidAPI());
  };

  const addNEWSucbidAPI = () => {
    return function (dispatch, getState, { history }) {
      let nickname = localStorage.getItem("nickname");
      const access_token = localStorage.getItem("access_token");
      const draft = { bid: sucBid, nickName: nickname, createAt: Date.now() };
      fetch(`${API}/bid/newsucbid/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: `${access_token}`,
        },
        body: JSON.stringify({ sellerunique: sellerunique, sucbid: sucBid }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.okay) {
            setStamp(true);
            dispatch(bidActions.addBid(draft));
            history.go(0);
          } else {
            console.log("response is not ok.");
          }
        })
        .catch((err) => {
          console.log("addNEWSucbidAPI에 문제가 있습니다.", err);
        });
    };
  };

  React.useEffect(() => {
    setMessageBid("");
    if (bid_before === "time") {
      setMessageBid("마감 시간이 종료되었어요..");
    } else if (bid_before === "success") {
      // setMessageBid("입찰 성공!");
    } else if (bid_before === "before") {
      setMessageBid("현재 입찰가보다 높아야 해욧!");
    }
  }, [bid_before, open]);

  if (bid) {
    return (
      <>
        {open && !stampMsg ? (
          <BidBox>
            <Text h1 marginT="10%">
              입찰표 작성
              {/* <FontAwesomeIcon icon={fasQC} /> */}
            </Text>
            <Grid textAlign="center" justify="space-between" width="35%" margin="20px 0 35px 0">
              <Text h3 marginB="5px">
                <Timer all deadLine={deadLine} onSale={onSale} purple />
              </Text>
              <Timer timeProgress deadLine={deadLine} createAt={createAt} onSale={onSale} />
            </Grid>
            {_current ? (
              <BidNow>
                <div>현재 입찰가</div>
                <div>
                  {comma(uncomma(_current))}
                  <span>&ensp;원</span>
                </div>
              </BidNow>
            ) : (
              <BidNow>
                <div>최소 입찰가</div>
                <div>
                  {productOK.lowBid}
                  <span>&ensp;원</span>
                </div>
              </BidNow>
            )}

            <Input value={comma(uncomma(bidPrice))} _onChange={onChangeBid} num width="75%" margin="10px auto 0" adornment="원" plcholder="입찰가를 입력해주세요!" />

            {sellerunique === u_id ? (
              <>
                <InfoUl>* 스스로 입찰할 수 없습니다.</InfoUl>
                <Button disabled width="75%" margin="10px auto 9% auto">
                  입찰하기
                </Button>
              </>
            ) : (
              <>
                <InfoUl>{messageBid}</InfoUl>
                <Button _onClick={addBid} width="75%" margin="10px auto 9% auto">
                  입찰하기
                </Button>
              </>
            )}
          </BidBox>
        ) : (
          <BidBox {...props}>
            <Stamp>입찰</Stamp>
            <Button
              _onClick={() => {
                setStamp(false);
              }}
              width="75%"
              margin="20px auto 9% auto"
            >
              확인
            </Button>
          </BidBox>
        )}
      </>
    );
  }

  if (immediateBid) {
    return (
      <>
        {open && !stampMsg ? (
          <BidBox {...props}>
            <Text h1 marginT="10%">
              즉시 낙찰
            </Text>
            <Text h4 marginT="10px" marginB="20px">
              즉시 낙찰가에 낙찰이 진행됩니다!
            </Text>
            <Text price marginB="20px">
              {input_priceComma(sucBid)}
              <Text won>&ensp;원</Text>
            </Text>
            {sellerunique === u_id ? (
              <>
                <InfoUl>* 스스로 낙찰할 수 없습니다.</InfoUl>
                <Button disabled width="75%" margin="10px auto 9% auto">
                  즉시 낙찰하기
                </Button>
              </>
            ) : (
              <>
                {/* <Modal stamp sucBid={sucBid} sellerunique={sellerunique} timeNow={Date.now()}></Modal> */}
                <Button _onClick={addSucBid} width="75%" margin="20px auto 9% auto">
                  즉시 낙찰하기
                </Button>
              </>
            )}
          </BidBox>
        ) : (
          <BidBox {...props}>
            <Stamp>낙찰</Stamp>
            {/* <Button
              _onClick={() => {
                setStamp(false);
                close();
                // history.go(0);
              }}
              width="75%"
              margin="20px auto 9% auto"
            >
              확인
            </Button> */}
          </BidBox>
        )}
      </>
    );
  }
};

const InfoUl = styled.ul`
  display: flex;
  height: 18px;
  margin: 1% auto 0;
  font-size: 13px;
  text-align: center;
  align-items: center;
  color: ${Color.Primary};
  position: relative;
  font-weight: 500;
`;

const BidBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100px;
`;

const BidNow = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
  height: 45px;
  padding: 0 25px;
  background-color: ${Color.Light_3};
  border-radius: 12px;
  color: ${Color.Dark_4};

  margin: 0 auto;

  font-size: 18px;
  font-weight: 500;
  div:nth-child(1) {
    text-align: left;
    font-size: 14px;
    width: 50%;
  }
  div:nth-child(2) {
    text-align: right;
    width: 50%;
  }
  span {
    font-size: 14px;
  }
`;

export default Bid;
