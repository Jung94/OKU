import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { Grid, Button, Text } from "elements/";
import FLogo from "images/FooterLogo.png";
import IconPlus from "images/icon_Plus.svg";
import IconChat from "images/icon_Chat.svg";
import IconMenu from "images/icon_Menu.svg";
import { Color } from "shared/DesignSys";
import { Link } from 'react-router-dom';
import { history } from "redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";

import { faEllipsisH, faCog, faHome, faCommentDots, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconExit from "images/icon_Exit.svg";

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
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  const slider = useRef();

  const slide = () => {
    const btn = slider.current.style.left;
    if (btn === "-100%") {
      slider.current.style.left = "0%";
      
    } else {
      slider.current.style.left = "-100%";
    }
  };
  const slideClose = () => {
    slider.current.style.left = "-100%";
  };

  const login = () => {
    history.push("/login");
    slide();
  };

  const signup = () => {
    history.push("/signup");
    slide();
  };

  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      dispatch(userActions.isLogout());
      window.location.reload();
    }
  };
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
          {!is_login && (
            <>
              <Plus src={IconPlus} onClick={() => {alert("로그인이 필요한 서비스입니다!"); history.push("/login");}} />
              <FourWrap>
                <Left>
                  {/* <Home src={IconPlus} /> */}
                  <FontAwesomeIcon icon={faHome} onClick={() => {history.push("/");}} />
                  <FontAwesomeIcon icon={faCommentDots} onClick={() => {alert("로그인이 필요한 서비스입니다!"); history.push("/login");}} />
                  {/* <Chat src={IconChat} /> */}
                </Left>
                <Right>
                  {/* <Mypage src={IconPlus} /> */}
                  <FontAwesomeIcon icon={faCog} onClick={() => {alert("로그인이 필요한 서비스입니다!"); history.push("/login");}} />
                  <FontAwesomeIcon icon={faEllipsisH} onClick={slide} />
                  {/* <Menu src={IconMenu} /> */}
                </Right>
              </FourWrap>
            </>
          )}
          {is_login && (
            <>
              <Plus src={IconPlus} onClick={() => {history.push("/productupload");}} />
              <FourWrap>
                <Left>
                  {/* <Home src={IconPlus} /> */}
                  <FontAwesomeIcon icon={faHome} onClick={() => {history.push("/");}} />
                  <FontAwesomeIcon icon={faCommentDots} onClick={() => {history.push("/chat");}} />
                  {/* <Chat src={IconChat} /> */}
                </Left>
                <Right>
                  {/* <Mypage src={IconPlus} /> */}
                  <FontAwesomeIcon icon={faCog} onClick={() => {history.push("/my");}} />
                  <FontAwesomeIcon icon={faEllipsisH} onClick={slide} />
                  {/* <Menu src={IconMenu} /> */}
                </Right>
              </FourWrap>
            </>
          )}
          
        </FooterWrap>
        <SidebarWrap ref={slider}>
          <Exit>
            <FontAwesomeIcon icon={faTimes} onClick={slideClose} />
          </Exit>
          
          {/* <Exit src={IconExit} /> */}
          <Grid height="110px" width="100%" bdrBottom="1px solid rgba(0, 0, 0, 0.1)">
            <div style={{ margin: "24px 30px"}}>
              <Text h4 >오쿠에 오신걸 환영합니다!</Text>
              <div style={{ margin: "18px 0 0"}}>
                {!is_login && (
                  <>
                    <Button main size="16px" width="120px" height="46px" margin="0 15px 0 0" _onClick={login}>로그인</Button>
                    <Button sub size="16px" width="120px" height="46px" _onClick={signup}>회원가입</Button>
                  </>
                )}
                {is_login && (
                  <>
                    <Button sub size="16px" width="120px" height="46px" _onClick={logout}>로그아웃</Button>
                  </>
                )}
              </div>
            </div>
          </Grid>
          <Grid is_flex justify="flex-start" padding="0 30px" height="80px" width="100%" bdrBottom="1px solid rgba(0, 0, 0, 0.1)">
            <div>
              <Text h4 >About OKU</Text>
            </div>
          </Grid>
          <Grid is_flex justify="flex-start" padding="0 30px" height="80px" width="100%" bdrBottom="1px solid rgba(0, 0, 0, 0.1)">
            <div>
              <Text h4 >About Team</Text>
            </div>
          </Grid>
          <Grid is_flex justify="flex-start" padding="0 30px" height="80px" width="100%" bdrBottom="1px solid rgba(0, 0, 0, 0.1)">
            <div>
              <Text h4 >서비스 문의하기</Text>
            </div>
          </Grid>
        </SidebarWrap>
      </Mobile>
    </>
    
  );
};

const SidebarWrap = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  position: fixed;
  z-index: 1000;
  top: 0%;
  left: -100%;
  width: 100vw;
  height: 100vh;

  box-shadow: none;
  transition: all 500ms cubic-bezier(0.215, 0.61, 0.355, 1), height 500ms cubic-bezier(0.215, 0.61, 0.355, 1);
`;

const Exit = styled.div`
  position: absolute;
  top: 21px;
  right: 24px;

  & > svg {
    font-size: 25px;
    color: rgba(0, 0, 0, 0.3);
  }


  // width: 28px;
  // height: 28px;
  // background-color: transparent;
  // background: url(${(props) => props.src});
  // background-size: cover;
  // background-position: center;
  // transition: all 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
  
`;

const Left = styled.div`
  // border: 1px solid red;
  display: flex;
  align-items: center;
  gap: 34px;

  & > svg {
    font-size: 25px;
    color: rgba(0, 0, 0, 0.4);
  }
`;

const Right = styled.div`
  // border: 1px solid red;
  display: flex;
  align-items: center;
  gap: 34px;

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

    // width: 100%;
    max-width: 100vw;
    height: 56px;
    overflow: scroll;
    // overflow-x: hidden;
    position: fixed;
    z-index: 1005;
    background: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    ${(props) => (props.display === false ? "display : none;" : "display : flex;")}
    // display : flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
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

  @media only screen and (max-width: 767px) {
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

  @media only screen and (max-width: 767px) {
    & > img {
      width: 85.2px;
      height: 40.6px;
    }
  }
`;

export default Footer;
