import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from 'components/chat/Card';
import { history } from 'redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as chatActions } from 'redux/modules/chat';

const Sidebar = ({ room }) => {
  const dispatch = useDispatch();
  const [ update, setUpdate ] = useState('');
  const uid = localStorage.getItem("uid");
  const users = useSelector((state) => state.chat.user_list);
  const msgList = useSelector((state) => state.chat.chat_list);

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
      {/* <Wrap>
        <Header>
          거래자 채팅 목록
        </Header>
        <Main>
          <Card />
          <Card />
        </Main>
      </Wrap> */}
      <Wrap>
        <Header>
          거래자 채팅 목록
        </Header>
        <Main>
          {users.length ? (
            <>
              {users.map((val, idx) => {
                // console.log(val);
                return (
                  <Box 
                    key={idx + 'msg'}
                    onClick={() => {
                      // 채팅 페이지 이동
                      history.push(`/chat/${val.sellerunique === uid ? val.soldById : val.sellerunique}/${uid}/${val.sellerunique === uid ? val.soldBy : val.nickname}`);
                      // dispatch(chatActions.badgeOff(val.id));
                    }}
                  >
                    <>
                      <ProfileImg>
                        {/* {val.profile_img === ' ' ? val.nickname[0] : null} */}
                      </ProfileImg>
                      <TextBox>
                        <Up>
                          <Name>{val.sellerunique === uid ? val.soldBy : val.nickname}</Name>
                          <Time>오후 09:11</Time>
                        </Up>
                        {/* <Msg>{update}</Msg> */}
                      </TextBox>
                    </>
                  </Box>
                );
              })}
            </>
          ) : (
            <Empty>
              <div>요이요이~</div>
              <div>거래자가 없다구욧!!</div>
            </Empty>
          )}
          
        </Main>
      </Wrap>
    </>
  );
};

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 270px 0 0;

  & div {
    font-size: 16px;
  }
`;

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

const Box = styled.div`
  display: flex;
  gap: 10px;
  // width: 285.4px;
  min-width: 267px;
  height: 69px;
  padding: 14px 20px 12px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 30px;
//   background-image: url("${(props) => props.img}");
  background-image: url('https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
//   border: 1px solid red;
  width: 190px;
  height: 100%;
  background: #fff;
`;

const Up = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  max-width: 190px;
  height: 23px;
  background: #fff;
  margin: 8px 0 0;
`;

const Name = styled.div`
//   border: 1px solid green;
  position: absolute;
  width: 110px;
  height: 21px;
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  bottom: 0;
  left: 0;
`;

const Time = styled.div`
//   border: 1px solid green;
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 16px;
  color: rgba(0, 0, 0, 0.3);
  font-size: 12px;
  font-weight: 400;
  text-align: right;
  bottom: 0;
  right: 0;
`;

const Msg = styled.div`
//   border: 1px solid red;
  max-width: 190px;
  height: 30px;
  background: #fff;
  font-size: 12px;
  line-height: 1.2;
  white-space: normal;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Sidebar;