import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle as farQC } from "@fortawesome/free-regular-svg-icons";

import { Bid, Edit, BidConfirm } from "components/";

import { Grid, Input, Line, Button, Text, Profile } from "elements/";

import { Color } from "shared/DesignSys";

const Tooltip = (props) => {
  const { children, marginB, marginT, vAlgin, size, _solid, _void, right, left } = props;
  const styles = {
    size: size,
    marginB: marginB,
    marginT: marginT,
    vAlgin: vAlgin,
  };
  const [tooltip, setTooltip] = useState(false);

  // console.log(onSale, soldBy);

  const openTooltip = () => {
    setTooltip(true);
  };

  const closeTooltip = () => {
    setTooltip(false);
  };

  if (_solid) {
    return (
      <>
        <Wrap {...styles} onMouseOver={openTooltip} onMouseOut={closeTooltip}>
          <FontAwesomeIcon icon={fasQC} className="infoSvg" />
          {tooltip ? (
            <TooltipWrap className="infoBox">
              <Text subBody color={Color.Dark_1} lineHeight="150%">
                {children}
              </Text>
            </TooltipWrap>
          ) : (
            ""
          )}
        </Wrap>
      </>
    );
  }

  if (_void) {
    return (
      <>
        <Wrap {...styles} onMouseOver={openTooltip} onMouseOut={closeTooltip}>
          <FontAwesomeIcon icon={farQC} className="infoSvg" />
          {tooltip ? (
            <TooltipWrap className="infoBox">
              <Text subBody color={Color.Dark_1} lineHeight="150%">
                {children}
              </Text>
            </TooltipWrap>
          ) : (
            ""
          )}
        </Wrap>
      </>
    );
  }
};

Tooltip.defaultProps = {
  marginB: "0px",
  marginT: "0px",
  vAlgin: "0px",
  size: "16px",
};

const Wrap = styled.div`
  /* background-color: green; */
  display: inline-block;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: ${(props) => props.marginB};
  margin-top: ${(props) => props.marginT};
  vertical-align: ${(props) => props.vAlgin};
  width: 18px;
  height: 18px;
  border-radius: 50%;
  .infoSvg {
    color: ${Color.Light_3};
    margin: 2px;
    font-size: ${(props) => props.size};
    cursor: default;
    z-index: 99;
    :hover {
      color: ${Color.Primary};
    }
  }
`;

const TooltipWrap = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  border: 0.5px solid ${Color.Light_2};
  border-top-left-radius: 2px;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 0 2px 5px ${Color.Light_4}66;
  position: absolute;
  z-index: 999;

  margin-left: 3px;
  margin-top: 0px;
  width: 180px;

  text-align: left;
  padding: 10px;
`;

export default Tooltip;
