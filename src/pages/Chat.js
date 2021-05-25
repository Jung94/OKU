import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Sider from "components/chat/Sidebar";
import Main from "components/chat/Main";
import InputChat from "components/chat/InputChat";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as chatActions } from "redux/modules/chat";
import { actionCreators as headerActions } from "redux/modules/header";

import { faBars } from "@fortawesome/free-solid-svg-icons";
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

const Chat = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (isMobile) {
      dispatch(headerActions.setHeader(false));
    }
  }, []);

  // 로컬에 저장된 토큰 조회
  const is_login = localStorage.getItem("access_token") ? true : false;

  const makeRoom = [props.match.params.otherId, props.match.params.myId].sort();
  // 방
  const room = makeRoom[0] + "-" + makeRoom[1];
  // 대화 상대 이름
  const targetName = props.match.params.otherName;
  // 상품 id
  const productId = props.match.params.productId;

  const otherId = props.match.params.otherId;

  const myId = props.match.params.myId;
  // 상품 제목
  const productName = props.match.params.title;
  // 내 이름
  const username = useSelector((state) => state.user.user);
  // 방 생성 정보
  const Info = {
    room: room,
    username: username,
  };

  useEffect(() => {
    dispatch(headerActions.setFooter(false));
    // 웹소켓 연결
    chatActions.socket.connect();
    return () => {
      // 채팅 페이지 나가면 웹소켓 연결 해제
      chatActions.socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      // 채팅 방 나가기
      chatActions.socket.emit("leave", { room: room });
    };
  }, [room]);

  //   웹소켓 연결이 성공하면 채팅 방 생성
  if (chatActions.socket) {
    chatActions.socket.emit("join", Info);
  }

  // if (!is_login) {
  //   // history.push("/login");
  //   alert("로그인후에 이용하실 수 있습니다.");
  // }

  return (
    <>
      <Desktop>
        <Wrap>
          <MainContent>
            <MainLeft>
              <Sider room={room} />
            </MainLeft>
            <MainRight>
              {chatActions.socket ? (
                <>
                  <Main targetName={targetName} productName={productName} room={room} />
                  <MainBtn>
                    <InputChat room={room} productId={productId} otherId={otherId} myId={myId} />
                  </MainBtn>
                </>
              ) : (
                <div>연결이 불안정합니다.</div>
              )}
            </MainRight>
          </MainContent>
        </Wrap>
      </Desktop>

      <Tablet>Tablet</Tablet>

      <Mobile>
        <Wrap>
          <MainContent>
            <MainTop>
              <Sider room={room} />
            </MainTop>
            <MainBottom>
              <Main targetName={targetName} productName={productName} room={room} />
              <MainBtnM>
                <InputChat room={room} productId={productId} otherId={otherId} myId={myId} />
              </MainBtnM>
            </MainBottom>
          </MainContent>
        </Wrap>
      </Mobile>
    </>
  );
};

const MainBtnM = styled.div`
  // border: 1px solid red;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 56px;
  width: 100vw;
  // height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainTop = styled.div`
  // border: 1px solid red;
  width: 100vw;
  height: 90px;
  margin: 0 0 2px;
`;

const MainBottom = styled.div`
  // border: 1px solid blue;
  width: 100vw;
  // height: 100px;
`;

const Wrap = styled.div`
  // border: 1px solid #000;
  margin: 90px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 767px) {
    // border: 1px solid green;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MainContent = styled.section`
  // border: 1px solid red;
  display: flex;
  max-width: 1030px;
  max-height: 680px;
  box-sizing: border-box;
  margin: 80px 0 40px;

  @media only screen and (max-width: 767px) {
    // border: 1px solid red;
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    max-height: 100vh;
    box-sizing: border-box;
    margin: 2px 0 0;
  }
`;

const MainLeft = styled.section`
  width: 250px;
  height: 600px;
  margin: 0 2px 0 0;
  display: block;
  box-shadow: 4px 4px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  //   @media only screen and (max-width: 375px) {
  //     display: ${(props) => (props.toggle ? "block" : "none")};
  //     flex-basis: ${(props) => (props.toggle ? "100%" : "0%")};
  //   }
`;

const MainBtn = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  // border: 1px solid blue;
`;

const MainRight = styled.section`

  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 680px;
  height: 600px;
  background: #fff;
  box-shadow: 4px 4px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  position: relative;
`;

export default Chat;
