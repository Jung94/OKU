import React, { useEffect } from "react";
import styled from "styled-components";

import { Color } from "shared/DesignSys";

import haepari from "images/oku_char.png";
import haepari_wh from "images/oku_char_white.png";
import haepari_wh_head from "images/oku_char_white_head.png";

const Notice = (props) => {
  return (
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSd3XKQHTFQ0nb6OH_3OqIOZaVNuJockbvp-12-uKxuVaezS9Q/viewform" target="_blank">
      <Block img={haepari_wh}></Block>
    </a>
  );
};
const Block = styled.div`
  cursor: pointer;
  background-image: url("${(props) => props.img}");
  background-position: center;
  background-size: 120%;
  /* border: 1px solid red; */
  position: fixed;
  z-index: 99999999999999999;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  bottom: 30px;
  right: 50px;
  transition: transform 350ms;
  :hover {
    transform: translateY(-10px);
  }

  @media only screen and (max-width: 767px) {
    width: 60px;
    height: 60px;
    bottom: 66px;
    right: 10px;
    background-size: 115%;
    background-color: #ffffff1a;
    backdrop-filter: blur(1px);
    border: 1px solid ${Color.Light_1};
    box-shadow: 0 3px 10px ${Color.Secondary_1};
  }
`;

export default Notice;
