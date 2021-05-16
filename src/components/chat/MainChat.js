import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatActions } from "redux/modules/chat";
import Message from './Message';

const MainChat = ({targetName}) => {
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
    console.log(endPoint.current);
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
      {loading ? (
        <>
          {/* empty */}
        </>
      ) : (
        <>
          <Header>
            {targetName}
          </Header>
          <ChatBox>
            {msgList.length === 0 ? (
              <EmptyPost>
                <div>
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
        </>
      )}
    </>
  );
}

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