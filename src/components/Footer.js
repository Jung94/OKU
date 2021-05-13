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
  height: 151px;
  z-index: -1;
  background: ${Color.Light_1};
  position: absolute;
  ${(props) => (props.display === false ? "display : none;" : "display : flex;")}
  flex-direction: column;
  align-items: center;
  padding-top: 45px;
  box-sizing: border-box;
`;

const FooterContent = styled.footer`
  max-width: 80vw;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 20px;
  font-weight: 500;
  color: ${Color.Dark_4};
`;

const Image = styled.div`
  & > img {
    width: 105.2px;
    height: 52.6px;
  }
`;

export default Footer;
