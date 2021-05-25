import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC } from "@fortawesome/free-solid-svg-icons";
import { Bid, Edit, BidConfirm } from "components/";

import { Grid, Input, Line, Button, Text, Profile } from "elements/";

import { Color } from "shared/DesignSys";

const Tooltip = (props) => {
  const { children } = props;
  const [tooltip, setTooltip] = useState(false);

  // console.log(onSale, soldBy);

  const openTooltip = () => {
    setTooltip(true);
  };

  const closeTooltip = () => {
    setTooltip(false);
  };

  return (
    <>
      <Wrap onMouseOver={openTooltip} onMouseOut={closeTooltip}>
        <FontAwesomeIcon icon={fasQC} className="infoSvg" />
        {tooltip ? <TooltipWrap className="infoBox">{children}zxczxczxcxzc</TooltipWrap> : ""}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  /* background-color: green; */
  width: 18px;
  height: 18px;
  border-radius: 50%;
  .infoSvg {
    color: ${Color.Light_4};
    margin: 2px;
    font-size: 16px;
    cursor: default;
    z-index: 99;
  }
`;

const TooltipWrap = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  border: 0.5px solid ${Color.Light_2};
  border-radius: 12px;
  box-shadow: 0 2px 5px ${Color.Light_4}66;
  position: absolute;
  z-index: 999;

  margin-top: 5px;
  width: 160px;
  height: 50px;
`;

export default Tooltip;
