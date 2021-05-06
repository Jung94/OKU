import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sider from 'components/chat/Sidebar';
import Main from 'components/chat/Main';
import Btns from 'components/chat/Btns';
import InputChat from 'components/chat/InputChat';
import { useSelector } from 'react-redux';
import { actionCreators as chatActions } from 'redux/modules/chat';

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Chat = (props) => {
  // 로컬에 저장된 토큰 조회
  const is_login = localStorage.getItem("access_token") ? true : false;

//   const makeRoom = [props.match.params.otherId, props.match.params.myId].sort();
//   // 방
//   const room = makeRoom[0] + '-' + makeRoom[1];
//   // 대화 상대 이름
//   const targetName = props.match.params.otherName;
  // 내 이름
  const username = useSelector((state) => state.user.user);
  // 방 생성 정보
  const Info = {
    // room: room,
    username: username,
  };

  // useEffect(() => {
  //   // 웹소켓 연결
  //   chatActions.socket.connect();
  //   return () => {
  //     // 채팅 페이지 나가면 웹소켓 연결 해제
  //     chatActions.socket.disconnect();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <Wrap>
        <MainContent>
          <MainLeft>
            <Sider 
            // room={room}
            />
          </MainLeft>
          <MainRight>
            <Main />
            <MainBtn>
              <Btns />
              <InputChat />
            </MainBtn>
            
            {/* {chatActions.socket ? (
              <>
                <ChatMain targetName={targetName} room={room} />
                <ChatInput room={room} />
              </>
            ) : (
              <Spin
                size='large'
                tip='Loading...'
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )} */}
          </MainRight>
        </MainContent>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  // border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainContent = styled.section`
  // border: 1px solid #000;
  display: flex;
  gap: 2px;
  max-width: 1030px;
  max-height: 730px;
  box-sizing: border-box;
  margin: 85.6px 0 85.6px;
`;

const MainLeft = styled.section`
  width: 285.4px;
  height: 729.4px;
//   flex-basis: 25%;
  display: block;
  box-shadow: 4px 4px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
//   @media only screen and (max-width: 375px) {
//     display: ${(props) => (props.toggle ? 'block' : 'none')};
//     flex-basis: ${(props) => (props.toggle ? '100%' : '0%')};
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
//   flex-basis: 75%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 744px;
  height: 729.4px;
  background: #fff;
  box-shadow: 4px 4px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  position: relative;
//   @media only screen and (max-width: 768px) {
//     padding: 16px 0;
//   }
//   @media only screen and (max-width: 375px) {
//     display: ${(props) => (props.toggle ? 'none' : 'block')};
//     flex-basis: ${(props) => (props.toggle ? '0%' : '100%')};
//     padding: 5px;
//   }
`;

export default Chat;