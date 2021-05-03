import React, { useState } from "react";
import styled from "styled-components";
import { useInterval } from "react-use";

import moment from "moment";
import Moment from "react-moment";
import "moment/locale/ko";

const Timer = (props) => {
  // day : '~일'
  // hms : '시:분:초'
  const { day, hms, all, deadLine } = props;

  // Date.now() 내장함수
  const [seconds, setSeconds] = useState(Date.now());

  // 1000ms = 1s
  useInterval(() => {
    setSeconds(Date.now());
  }, 1000);

  // data 받기
  const _deadline = deadLine; // 데이터 GET하면 받을 준비
  const deadline = moment(_deadline); // 데드라인
  const timeNow = moment(seconds); // 현재

  //
  const duration = moment.duration(deadline.diff(timeNow)).format("D hh:mm:ss");
  const day_duration = moment.duration(deadline.diff(timeNow)).format("D");
  const hms_duration = moment.duration(deadline.diff(timeNow)).format("hh:mm:ss");
  const h_duration = moment.duration(deadline.diff(timeNow)).format("h");
  const m_duration = moment.duration(deadline.diff(timeNow)).format("m");
  const s_duration = moment.duration(deadline.diff(timeNow)).format("s");

  if (day) {
    return <>{deadline - timeNow > 0 ? <TimerWrap>D-{day_duration}</TimerWrap> : <div>경매 종료</div>}</>;
  }

  if (hms) {
    return <>{deadline - timeNow > 0 ? <TimerWrap>{hms_duration}</TimerWrap> : <div>경매 종료</div>}</>;
  }

  if (all) {
    return <>{deadline - timeNow > 0 ? <TimerWrap>D-{duration}</TimerWrap> : <div>경매 종료</div>}</>;
  }
};

Timer.defaultProps = {};

const TimerWrap = styled.div`
  width: 100%;
  height: 100%;
  font-weight: 700;
`;

export default Timer;
