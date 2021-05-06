import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from 'components/chat/Card';
import { history } from 'redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as chatActions } from 'redux/modules/chat';

const Sidebar = ({ room }) => {
  const dispatch = useDispatch();
  const [ search, setSearch ] = useState('');
  const uid = useSelector((state) => state.user.user?.uid);
  const users = useSelector((state) => state.chat.user_list);

  useEffect(() => {
    // 전체 유저 조회
    dispatch(chatActions.middlewareUsers());
    // 전역소켓 연결
    chatActions.globalSocket.connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 베지 및 알림
    dispatch(chatActions.globalAddChatList(room));
    return () => {
      // 언마운트 시 socket off
      chatActions.globalSocket.off();
    };
  }, [dispatch, room]);

  return (
    <>
      <Wrap>
        <Header>
          거래자 채팅 목록
        </Header>
        <Main>
          <Card />
          <Card />
        </Main>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 285.4px;
  height: 729.4px;
  background: #fff;
  border-radius: 16px;
  border-right: 2px solid rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  // border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 285.4px;
  height: 79.6px;
  color: #434343;
  font-size: 20px;
  font-weight: bold;
  background: #fff;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const Main = styled.div`
  // border: 1px solid blue;
  width: 285.4px;
  height: 649px;
  overflow: auto;
  color: #434343;
  font-size: 20px;
  font-weight: bold;
  background: #fff;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

export default Sidebar;