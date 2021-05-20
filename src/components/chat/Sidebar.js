import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from 'components/chat/Card';
import { history } from 'redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as chatActions } from 'redux/modules/chat';
import { useMediaQuery } from "react-responsive";

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

const Sidebar = ({ room }) => {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState("");
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
      <Desktop>
        <Wrap>
          <Header>
            거래자 채팅 목록
          </Header>
          <Main>
            {users.length ? (
              <>
                {users.map((val, idx) => {
                  console.log(val);
                  return (
                    <Box 
                      key={idx + 'msg'}
                      onClick={() => {
                        // 채팅 페이지 이동
                        history.push(`/chat/${val.sellerunique === uid ? val.soldById : val.sellerunique}/${uid}/${val.sellerunique === uid ? val.soldBy : val.nickname}`);
                        // dispatch(chatActions.badgeOff(val.sellerunique === uid ? val.soldById : val.sellerunique));
                      }}
                    >
                      <>
                        <ProfileImg>
                          {/* {val.profile_img === ' ' ? val.nickname[0] : null} */}
                        </ProfileImg>
                        <TextBox>
                          <Up>
                            <Name>{val.sellerunique === uid ? val.soldBy : val.nickname}</Name>
                            {/* <Time>오후 09:11</Time> */}
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
      </Desktop>

      <Tablet>Tablet</Tablet>

      <Mobile>
        <WrapM>
          {users.length ? (
            <>
              {users.map((val, idx) => {
                console.log(val);
                return (
                  <UserBox 
                    key={idx + 'msg'}
                    onClick={() => {
                      // 채팅 페이지 이동
                      history.push(`/chat/${val.sellerunique === uid ? val.soldById : val.sellerunique}/${uid}/${val.sellerunique === uid ? val.soldBy : val.nickname}`);
                      // dispatch(chatActions.badgeOff(val.sellerunique === uid ? val.soldById : val.sellerunique));
                    }}
                  >
                    <>
                      <ImgM>
                        {/* {val.profile_img === ' ' ? val.nickname[0] : null} */}
                      </ImgM>
                        <NameM>{val.sellerunique === uid ? val.soldBy : val.nickname}</NameM>
                        {/* <Time>오후 09:11</Time> */}
                        {/* <Msg>{update}</Msg> */}
                    </>
                  </UserBox>
                );
              })}
            </>
          ) : (<div style={{fontSize: "14px", fontWeight: "500", width: "200px", margin: "0 auto", textAlign: "center"}}>어이어이~ 거래자가 없다구욧!</div>
            // <Empty>
            //   <div>요이요이~</div>
            //   <div>거래자가 없다구욧!!</div>
            // </Empty>
          )}
        </WrapM>
      </Mobile>
    </>
  );
};

const WrapM = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  gap: 4px;
  overflow: auto;
  align-items: center;
  justify-content: flex-start;
  padding: 6px 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const UserBox = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 72px;
`;

const ImgM = styled.div`
  width: 44px;
  height: 44px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 30px;
//   background-image: url("${(props) => props.img}");
  background-image: url('https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const NameM = styled.div`
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  width: 70px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;



const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 220px 0 0;

  & div {
    font-size: 14px;
  }
`;

const Wrap = styled.div`
  width: 250x;
  height: 600px;
  background: #fff;
  border-radius: 12px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  // border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 50px;
  color: #434343;
  font-size: 16px;
  font-weight: bold;
  padding: 2px 0 0;
  background: #fff;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const Main = styled.div`
  // border: 1px solid blue;
  width: 250px;
  height: 550px;
  overflow: auto;
  color: #434343;
  font-size: 20px;
  font-weight: bold;
  background: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const Box = styled.div`
  display: flex;
  gap: 10px;
  // width: 285.4px;
  min-width: 230px;
  height: 60px;
  padding: 12px 20px 14px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ProfileImg = styled.div`
  width: 34px;
  height: 34px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  //   background-image: url("${(props) => props.img}");
  background-image: url("https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // border: 1px solid red;
  padding: 0 0 3px;
  width: 150px;
  background: #fff;
`;

const Up = styled.div`
  // border: 1px solid red:
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
  font-size: 14px;
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
