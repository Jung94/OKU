import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { Text, Grid } from "elements/";
import FLogo from "images/FooterLogo.png";
import IconPlus from "images/icon_Plus.svg";
import IconChat from "images/icon_Chat.svg";
import IconMenu from "images/icon_Menu.svg";
import { Color } from "shared/DesignSys";

import { faEllipsisH, faCog, faHome, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return isDesktop ? children : null;
};

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  return isTablet ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

const Footer = (props) => {
  const { display } = props;
  return (
    <>
      <Desktop>
        <FooterWrap display={display}>
          <FooterContent>
            <Image>
              <img src={FLogo} />
            </Image>
            0부터 9까지 뭐든 It's OK! OKU
          </FooterContent>
        </FooterWrap>
      </Desktop>

      <Tablet>Tablet</Tablet>

      <Mobile>
        <FooterWrap display={display}>
          <Plus src={IconPlus} />
          <FourWrap>
            <Left>
              {/* <Home src={IconPlus} /> */}
              <FontAwesomeIcon icon={faHome} />
              <FontAwesomeIcon icon={faCommentDots} />
              {/* <Chat src={IconChat} /> */}
            </Left>
            <Right>
              {/* <Mypage src={IconPlus} /> */}
              <FontAwesomeIcon icon={faCog} />
              <FontAwesomeIcon icon={faEllipsisH} />
              {/* <Menu src={IconMenu} /> */}
            </Right>
          </FourWrap>
        </FooterWrap>
      </Mobile>
    </>
    
  );
};

const Left = styled.div`
  // border: 1px solid red;
  display: flex;
  align-items: center;
  gap: 44px;

  & > svg {
    font-size: 25px;
    color: rgba(0, 0, 0, 0.4);
  }
`;

const Right = styled.div`
  // border: 1px solid red;
  display: flex;
  align-items: center;
  gap: 44px;

  & > svg {
    font-size: 25px;
    color: rgba(0, 0, 0, 0.4);
  }
`;

const Home = styled.div`
  width: 34px;
  height: 34px;
  background-color: transparent;
  background: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  transition: all 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
`;

const Chat = styled.div`
  width: 30px;
  height: 30px;
  background-color: transparent;
  background: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  transition: all 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
`;

const Mypage = styled.div`
  width: 34px;
  height: 34px;
  background-color: transparent;
  background: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  transition: all 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
`;

const Menu = styled.div`
  width: 30px;
  height: 30px;
  background-color: transparent;
  background: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  transition: all 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
`;

const Plus = styled.img`
  width: 34px;
  height: 34px;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50px;
  transform: translate(-50%, -50%);
  background-color: transparent;
  background: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  transition: all 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
  background-color: ${Color.Light_4};

`;

const FourWrap = styled.div`
  width: 100%;
  // border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FooterWrap = styled.footer`

  @media only screen and (min-width: 1024px) {
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
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
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
  }

  @media only screen and (max-width: 767px) {

    width: 100%;
    height: 56px;
    z-index: -1;
    background: transparent;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    ${(props) => (props.display === false ? "display : none;" : "display : flex;")}
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 7%;
    box-sizing: border-box;
    border-Top: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 4px 10px 1px rgba(111, 111, 111, 0.2);
  }
`;

const FooterContent = styled.footer`

  @media only screen and (min-width: 1024px) {
    margin: 0 0 40px 0;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 18px;
    font-weight: 500;
    color: #818181;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    margin: 0 0 40px 0;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 18px;
    font-weight: 500;
    color: #818181;
  }
`;

const Image = styled.div`

  @media only screen and (min-width: 1024px) {
    & > img {
      width: 85.2px;
      height: 40.6px;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    & > img {
      width: 85.2px;
      height: 40.6px;
    }
  }
`;

export default Footer;
