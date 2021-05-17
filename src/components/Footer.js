import React from "react";
import styled from "styled-components";
import { Text, Grid } from "elements/";
import FLogo from "images/FooterLogo.png";
import { Color } from "shared/DesignSys";

const Footer = (props) => {
  const { display } = props;
  return (
    <FooterWrap display={display}>
      <FooterContent>
        <Image>
          <img src={FLogo} />
        </Image>
        0부터 9까지 뭐든 It's OK! OKU
      </FooterContent>
    </FooterWrap>
  );
};

const FooterWrap = styled.footer`
  max-width: 100%;
  width: 100%;
  left: 0;
  right: 0;
  height: 95px;
  z-index: -1;
  background: #dadada;
  position: absolute;
  ${(props) => (props.display === false ? "display : none;" : "display : flex;")}
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 45px;
  box-sizing: border-box;
`;

const FooterContent = styled.footer`
  margin: 0 0 40px 0;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 18px;
  font-weight: 500;
  color: #818181;
`;

const Image = styled.div`
  & > img {
    width: 85.2px;
    height: 40.6px;
  }
`;

export default Footer;
