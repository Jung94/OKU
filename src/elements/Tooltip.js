import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle as farQC } from "@fortawesome/free-regular-svg-icons";

import { Bid, Edit, BidConfirm } from "components/";

import { Grid, Input, Line, Button, Text, Profile } from "elements/";

import { Color } from "shared/DesignSys";

const Tooltip = (props) => {
  const { children, width, marginB, marginT, vAlgin, size, _solid, _void, rtl } = props;
  const styles = {
    width: width,
    size: size,
    marginB: marginB,
    marginT: marginT,
    vAlgin: vAlgin,
    rtl: rtl,
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
            <TooltipWrap {...styles} className="infoBox">
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
            <TooltipWrap {...styles} className="infoBox">
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
  width: "180px",
  marginB: "0px",
  marginT: "0px",
  vAlgin: "0px",
  size: "16px",
};

const Wrap = styled.div`
  /* background-color: green; */
  display: inline-flex;
  margin-left: 3px;
  margin-right: 3px;
  margin-top: ${(props) => props.marginT};
  vertical-align: ${(props) => props.vAlgin};

  width: 18px;
  height: 18px;
  border-radius: 50%;
  /* box-direction: rtl; */
  ${(props) => (props.rtl ? "flex-direction: row-reverse;" : "")}
  /* direction: rtl; */
  /* -webkit-transform: rotate(-180deg);
  transform: rotate(-180deg); */

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

  ${(props) =>
    props.rtl
      ? "border-top-left-radius: 12px; border-top-right-radius: 2px; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;"
      : "border-top-left-radius: 2px; border-top-right-radius: 12px; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; margin-left: 20px;"}

  box-shadow: 0 2px 5px ${Color.Light_4}66;
  position: absolute;
  z-index: 999;

  margin-top: 20px;
  width: ${(props) => (props.width ? props.width : "width: 180px;")};

  text-align: left;
  padding: 10px;
`;

export default Tooltip;
