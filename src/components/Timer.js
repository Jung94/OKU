import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useInterval } from "react-use";

import moment from "moment";
import Moment from "react-moment";
import "moment/locale/ko";

import { Grid } from "elements/";
import { Color } from "shared/DesignSys";

const Timer = (props) => {
  // day : '~일'
  // hms : '시:분:초'
  const { day, hms, all, timeProgress, deadLine, createAt, purple, white } = props;
  const colors = { purple: purple, white: white };

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

  const fixedDuration = moment.duration(deadline.diff(createAt)).format("s");
  const _progress = moment.duration(timeNow.diff(createAt)).format("s");
  const prg = _progress.valueOf();

  if (day) {
    return <>{deadline - timeNow > 0 ? <TimerWrap {...colors}>D-{day_duration}</TimerWrap> : <div>경매 종료</div>}</>;
  }

  if (hms) {
    return <>{deadline - timeNow > 0 ? <TimerWrap {...colors}>{hms_duration}</TimerWrap> : <div>경매 종료</div>}</>;
  }

  if (all) {
    return <>{deadline - timeNow > 0 ? <TimerWrap {...colors}>D-{duration}</TimerWrap> : <div>경매 종료</div>}</>;
  }

  if (timeProgress) {
    console.log(prg);
    return (
      <>
        {deadline - timeNow > 0 ? (
          <>
            <ProgressBar {...colors} flexGrow={prg}>
              {prg}
            </ProgressBar>
          </>
        ) : (
          <div>경매 종료</div>
        )}
      </>
    );
  }
};

Timer.defaultProps = {};

const TimerWrap = styled.div`
  width: 100%;
  height: 100%;
  font-weight: 700;
  color: ${(props) => (props.purple ? Color.Primary : props.white ? "#ffffff" : false)};
  letter-spacing: 2px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 5rem;
  background-color: ${Color.Primary};
  font-weight: 700;
  color: ${(props) => (props.purple ? Color.Primary : props.white ? "#ffffff" : false)};
  letter-spacing: 2px;
  /* flex-grow: ${(props) => props.flexGrow}; */
`;

const Bar = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 5rem;
  background-color: black;
  font-weight: 700;
  color: ${(props) => (props.purple ? Color.Primary : props.white ? "#ffffff" : false)};
  letter-spacing: 2px;
  flex-grow: ${(props) => props.flexGrow};
`;

export default Timer;
