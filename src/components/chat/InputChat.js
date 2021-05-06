import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { actionCreators as chatActions } from 'redux/modules/chat';

const ChatInput = ({ room }) => {
  const [msg, setMsg] = useState('');
//   const userImg = useSelector((state) => state.user.user?.profile_img);
//   const username = useSelector((state) => state.user.user);

  // 채팅 전송 시 방 정보, 유저 이름, 유저 프로필, 메세지 전송
//   const Info = {
//     room: room,
//     username: username?.nickname,
//     profile_img: userImg,
//     msg: msg,
//     uid: username?.uid,
//   };
//   const msgSubmit = () => {
//     // 아무것도 입력하지 않은 경우 리턴
//     if (msg === '') {
//       return;
//     }
//     // 채팅 전송
//     chatActions.socket.emit('send', {
//       room: Info.room,
//       username: Info.username,
//       profile_img: Info.profile_img,
//       msg: Info.msg,
//     });
//     // 알람 전송
//     chatActions.globalSocket.emit('globalSend', {
//       room: Info.room,
//       username: Info.username,
//       uid: Info.uid,
//       profile_img: Info.profile_img,
//       msg: Info.msg,
//     });
//     setMsg('');
//   };
  return (
    <>
      <InputBox>
        <Text type="text" placeholder="대화를 입력해주세요."/>
        <Btn>전송</Btn>
        {/* <Input
          placeholder='내용을 입력하세요...'
          suffix={
            <Button type='primary' onClick={msgSubmit}>
              전송
            </Button>
          }
          style={{
            padding: '0',
            paddingLeft: '14px',
          }}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              msgSubmit();
            }
          }}
          value={msg}
        /> */}
      </InputBox>
    </>
  );
}

const InputBox = styled.div`
  display: flex;
  gap: 12px;
  width: 680px;
  margin-bottom: 19.4px;
`;

const Text = styled.textarea`
  width: 595px;
  height: 80px;
  background: #fff;
  border-radius: 16px;
  border: 0.5px solid #c1c1c1;
  font-size: 16px;
  padding: 14px;
  white-space: normal;
  word-break: break-all;
  outline: none;
  resize: none;
`;

const Btn = styled.button`
  width: 73px;
  height: 80px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  background: #ae00ff;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.2);
`;

export default ChatInput;