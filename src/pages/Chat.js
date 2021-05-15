import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sider from "components/chat/Sidebar";
import Main from "components/chat/Main";
import InputChat from "components/chat/InputChat";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as chatActions } from "redux/modules/chat";
import { actionCreators as headerActions } from "redux/modules/header";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Chat = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  // 로컬에 저장된 토큰 조회
  const is_login = localStorage.getItem("access_token") ? true : false;

  // 토큰이 없을 경우 사용을 못하게 로그인 화면으로 이동시키기
  // if (!is_login) {
  //   swal({
  //     title: '토큰이 만료되었거나 잘못된 접근입니다.',
  //     text: '다시 로그인 해주세요!',
  //     icon: 'error',
  //   });
  // 로그인창으로 이동
  // history.replace('/');
  // }

  const makeRoom = [props.match.params.otherId, props.match.params.myId].sort();
  //   // 방
  const room = makeRoom[0] + "-" + makeRoom[1];
  //   // 대화 상대 이름
  const targetName = props.match.params.otherName;
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

  if (!is_login) {
    // history.push("/login");
    alert("로그인후에 이용하실 수 있습니다.");
  }

  return (
    <>
      <Wrap>
        <MainContent>
          <MainLeft>
            <Sider room={room} />
          </MainLeft>
          <MainRight>
            {chatActions.socket ? (
              <>
                <Main targetName={targetName} room={room} />
                <MainBtn>
                  <InputChat room={room} />
                </MainBtn>
              </>
            ) : (
              <div>ddddd</div>
            )}
          </MainRight>
        </MainContent>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  // border: 1px solid #000;
  margin: 150px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: 1824px) {
  }
`;

const MainContent = styled.section`
  // border: 1px solid red;
  display: flex;
  gap: 2px;
  max-width: 1030px;
  max-height: 730px;
  box-sizing: border-box;
  margin: 85.6px 0 85.6px;

  @media only screen and (min-width: 1824px) {
    // border: 1px solid red;
    display: flex;
    gap: 2px;
    max-width: 1030px;
    max-height: 730px;
    box-sizing: border-box;
    margin: 85.6px 0 85.6px;
  }
`;

const MainLeft = styled.section`
  width: 285.4px;
  height: 729.4px;
  //   flex-basis: 25%;
  display: block;
  box-shadow: 4px 4px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
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
  //     display: ${(props) => (props.toggle ? "none" : "block")};
  //     flex-basis: ${(props) => (props.toggle ? "0%" : "100%")};
  //     padding: 5px;
  //   }
`;

export default Chat;
