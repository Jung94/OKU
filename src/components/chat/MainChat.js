import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// import { actionCreators as chatActions } from "../redux/modules/chat";
import Message from './Message';

const MainChat = (props) => {
//   const dispatch = useDispatch();
//   const msgList = useSelector((state) => state.chat.chat_list);
//   const loading = useSelector((state) => state.chat.is_loading);
//   useEffect(() => {
//     // 로드될때 채팅 목록
//     dispatch(chatActions.loadChatList());
//     // 메세지 보낼때
//     dispatch(chatActions.addChatList());
//     return () => {
//       // 언마운트 시 socket off
//       chatActions.socket.off();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // 채팅 생성 시 또는 채팅방 들어갈때 스크롤이 있을경우 가장 최신 채팅을 보게함
//   const endPoint = useRef(null);
//   const bottomView = () => {
//     endPoint.current?.scrollIntoView();
//   };

//   useEffect(() => {
//     bottomView();
//   }, [msgList]);

  return (
    <>
      <Header>
        소켓왕자
      </Header>
      <ChatBox>
        <Message />
      </ChatBox>
      {/* {loading ? (
        <Spin
          size="large"
          tip="Loading..."
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <>
          <Title>
            <WechatOutlined style={{ color: "#6F9CEB", marginRight: "12px" }} />
            {targetName}님과 대화
          </Title>
          <ChatBox>
            {msgList.length === 0 ? (
              <EmptyPost>
                <Empty />
              </EmptyPost>
            ) : null}
            {msgList.map((val, idx) => {
              return (
                <>
                  <Msg key={idx} {...val} />
                </>
              );
            })}
            <div ref={endPoint}></div>
          </ChatBox>
        </>
      )} */}
    </>
  );
}

const ChatBox = styled.div`
//   border: 1px solid red;
  height: 458px;
  width: 744px;
  overflow: auto;
`;

const Header = styled.div`
//   border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 744px;
  height: 79.6px;
  color: #434343;
  font-size: 20px;
  font-weight: bold;
  background: #fff;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

export default MainChat;