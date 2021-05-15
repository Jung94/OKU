import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useInterval } from "react-use";

import moment from "moment";
import Moment from "react-moment";
import "moment/locale/ko";

import { Grid } from "elements/";
import { Color } from "shared/DesignSys";
import { de } from "date-fns/locale";

const Timer = (props) => {
  // day : '~일'
  // hms : '시:분:초'
  const { day, hms, all, timeProgress, deadLine, createAt, onSale, purple, white } = props;
  const colors = { purple: purple, white: white };
  // console.log("🕒", onSale);

  // Date.now() 내장함수
  const [seconds, setSeconds] = useState(Date.now());

  // 1000ms = 1s
  useInterval(() => {
    setSeconds(Date.now());
  }, 1000);

  // data 받기
  const _deadline = deadLine; // 데이터 GET하면 받을 준비
  const _createdAt = createAt; // 데이터 GET하면 받을 준비
  const deadline = moment(_deadline); // 데드라인
  const timeNow = moment(seconds); // 현재

  //
  const duration = moment.duration(deadline.diff(timeNow)).format("D hh:mm:ss");
  const day_duration = moment.duration(deadline.diff(timeNow)).format("D");
  const hms_duration = moment.duration(deadline.diff(timeNow)).format("hh:mm:ss");
  const h_duration = moment.duration(deadline.diff(timeNow)).format("h");
  const m_duration = moment.duration(deadline.diff(timeNow)).format("m");
  const s_duration = moment.duration(deadline.diff(timeNow)).format("s");

  // 사실 moment()이거나 Date.parse나 같은거같음..
  const bar = Math.floor(((Date.now() - Date.parse(_createdAt)) / (Date.parse(_deadline) - Date.parse(_createdAt))) * 100);
  // console.log("🕒progress...: ", bar);

  if (day) {
    return <>{deadline - timeNow > 0 ? <TimerWrap {...colors}>D-{day_duration}</TimerWrap> : <TimerEnd {...colors}>경매 종료</TimerEnd>}</>;
  }

  if (hms) {
    return <>{deadline - timeNow > 0 ? <TimerWrap {...colors}>{hms_duration}</TimerWrap> : <TimerEnd {...colors}>경매 종료</TimerEnd>}</>;
  }

  if (all) {
    return (
      <>
        {onSale && deadline - timeNow > 0 ? (
          <TimerWrap {...colors}>
            {day_duration > 0 && "D-"}
            {duration}
          </TimerWrap>
        ) : (
          <TimerWrap {...colors}>D-0 00:00:00</TimerWrap>
        )}
      </>
    );
  }

  if (timeProgress) {
    if (white) {
      return (
        <>
          {onSale && deadline - timeNow > 0 ? (
            <Bar>
              <ProgressBar color={Color.Primary} bar={bar} roundPrimary={5} />
              <ProgressBar color="white" bar={100 - bar} roundLight={5} />
            </Bar>
          ) : (
            <></>
          )}
        </>
      );
    } else {
      return (
        <>
          {onSale && deadline - timeNow > 0 ? (
            <Bar>
              <ProgressBar color={Color.Primary} bar={bar} roundPrimary={5} />
              <ProgressBar color={Color.Light_3} bar={100 - bar} roundLight={5} />
            </Bar>
          ) : (
            <></>
          )}
        </>
      );
    }
  }
};

Timer.defaultProps = {};

const TimerWrap = styled.div`
  width: 100%;
  height: 100%;
  font-weight: 700;
  color: ${(props) => (props.purple ? Color.Primary : props.white ? "#ffffff" : false)};
  letter-spacing: 1px;
  word-spacing: 15px;
`;

const TimerEnd = styled.div`
  width: 100%;
  height: 100%;
  font-weight: 700;
  color: ${(props) => (props.purple ? Color.Primary : props.white ? "#ffffff" : false)};
  letter-spacing: -0.25px;
  word-spacing: -1px;
`;

const ProgressBar = styled.div`
  padding: 0;
  box-sizing: border-box;
  ${(props) => (props.bar ? `width:${props.bar}%;` : "")}
  display:flex;
  text-align: center;
  flex-direction: row;
  height: 3px;
  background-color: ${(props) => (props.color ? `${props.color};` : "")};
  font-weight: 700;
  color: ${(props) => (props.purple ? Color.Primary : props.white ? "#ffffff" : false)};
  letter-spacing: 2px;
  ${(props) => (props.roundPrimary ? `border-top-left-radius:${props.roundPrimary}rem;border-bottom-left-radius:${props.roundPrimary}rem;` : "")}
  ${(props) => (props.roundLight ? `border-top-right-radius:${props.roundLight}rem;border-bottom-right-radius:${props.roundLight}rem;` : "")}
`;

const Bar = styled.div`
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  text-align: center;
`;

export default Timer;
