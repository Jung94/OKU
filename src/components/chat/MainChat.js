import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatActions } from "redux/modules/chat";
import Message from "./Message";

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

const MainChat = ({ targetName }) => {
  const dispatch = useDispatch();
  const msgList = useSelector((state) => state.chat.chat_list);
  const loading = useSelector((state) => state.chat.is_loading);

  useEffect(() => {
    // 로드될때 채팅 목록
    dispatch(chatActions.loadChatList());
    // 메세지 보낼때
    dispatch(chatActions.addChatList());
    return () => {
      // 언마운트 시 socket off
      chatActions.socket.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 채팅 생성 시 또는 채팅방 들어갈때 스크롤이 있을경우 가장 최신 채팅을 보게함
  const endPoint = useRef(null);
  const bottomView = () => {
    endPoint.current?.scrollIntoView({ block: "end", inline: "nearest" });
  };

  useEffect(() => {
    bottomView();
  }, [msgList]);

  return (
    <>
      {/* <Header>
        소켓왕자
      </Header>
      <ChatBox>
        <Message />
      </ChatBox> */}
      <Desktop>
        {loading ? (
          <>{/* empty */}</>
        ) : (
          <div>
            <Header>{targetName ? targetName : "아무나 채팅"}</Header>
            <ChatBox>
              {msgList.length === 0 ? (
                <EmptyPost>
                  <div>경매 성공 시 구매자 또는 경매자와의 채팅이 가능하다구요!</div>
                </EmptyPost>
              ) : null}
              {msgList.map((val, idx) => {
                return (
                  <>
                    <Message key={idx} {...val} />
                  </>
                );
              })}
              <div ref={endPoint}></div>
            </ChatBox>
          </div>
        )}
      </Desktop>

      <Tablet>Tablet</Tablet>

      <Mobile>
        {loading ? (
          <>
            <div style={{padding: "40% 0 0",fontSize: "14px", fontWeight: "500", width: "220px", margin: "0 auto", textAlign: "center"}}>
              경매 성공 시 구매자 또는 경매자와의 채팅이 가능하다구요!
            </div>
          </>
        ) : (
          <div>
            <Header>{targetName}</Header>
            <ChatBox>
              {msgList.length === 0 ? (
                <EmptyPost>
                  <div style={{fontSize: "14px", fontWeight: "500", width: "200px", margin: "0 auto", textAlign: "center"}}>
                    경매 성공 시 구매자 또는 경매자와의 채팅이 가능하다구요!
                  </div>
                </EmptyPost>
              ) : null}
              {msgList.map((val, idx) => {
                return (
                  <>
                    <Message key={idx} {...val} />
                  </>
                );
              })}
              <div ref={endPoint}></div>
            </ChatBox>
          </div>
        )}
      </Mobile>
      
    </>
  );
};

const EmptyPost = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: default;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & div {
    font-size: 18px;
    font-weight: 500;
  }
`;

const ChatBox = styled.div`
  //   border: 1px solid red;
  height: 382px;
  width: 680px;
  overflow: auto;

  @media only screen and (max-width: 767px) {
    // border: 1px solid red;
    min-height: 290px;
    max-height: 350px;
    height: 50vh;
    width: 100vw;
    overflow: auto;
  }

`;

const Header = styled.div`
  //   border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 680px;
  height: 50px;
  color: #434343;
  font-size: 16px;
  font-weight: bold;
  background: #fff;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;

  @media only screen and (max-width: 767px) {
    // border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 34px;
    color: #434343;
    font-size: 14px;
    font-weight: bold;
    background: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

export default MainChat;
