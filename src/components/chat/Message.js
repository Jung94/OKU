import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Message = (props) => {

    const me = useSelector((state) => state.user.user);

    return (
        <>
          <Box>
            <ProfileImg></ProfileImg>
            <TextBox>
              <Up>
                <Name>소켓왕자</Name>
                <Time>오전 11:11</Time>
              </Up>
              <Msg>난 제주도로 떠날거야. 너도 나와 함께 가지 않으련?
              </Msg>
            </TextBox>
          </Box>
          <BoxR>
            <TextBoxR>
              <UpR>
                <TimeR>오전 11:11</TimeR>
                <NameR>동동이</NameR>
              </UpR>
              <MsgR>나도 갈래. 언제 갈까?
              </MsgR>
            </TextBoxR>
            <ProfileImgR></ProfileImgR>
          </BoxR>
          <BoxR>
            <TextBoxR>
              <UpR>
                <TimeR>오전 11:11</TimeR>
                <NameR>동동이</NameR>
              </UpR>
              <MsgR>난 제주도로 떠날거야. 너도 나와 함께 가지 않으련?난 제주도로 떠날거야. 너도 나와 함께 가지 않
              </MsgR>
            </TextBoxR>
            <ProfileImgR></ProfileImgR>
          </BoxR>
          <BoxR>
            <TextBoxR>
              <UpR>
                <TimeR>오전 11:11</TimeR>
                <NameR>동동이</NameR>
              </UpR>
              <MsgR>난 제주도로 떠날거야. 너도 나와 함께 가지 않으련?난 제주도로 떠날거야. 너도 나와 함께 가지 않
              </MsgR>
            </TextBoxR>
            <ProfileImgR></ProfileImgR>
          </BoxR>
          <BoxR>
            <TextBoxR>
              <UpR>
                <TimeR>오전 11:11</TimeR>
                <NameR>동동이</NameR>
              </UpR>
              <MsgR>난 제주도로 떠날거야. 너도 나와 함께 가지 않으련?난 제주도로 떠날거야. 너도 나와 함께 가지 않
              </MsgR>
            </TextBoxR>
            <ProfileImgR></ProfileImgR>
          </BoxR>
        </>
    );
};

const BoxR = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  min-width: 724px;
  min-height: 103px;
  padding: 20px 32px 14px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ProfileImgR = styled.div`
  width: 62px;
  height: 62px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 30px;
//   background-image: url("${(props) => props.img}");
  background-image: url('https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const TextBoxR = styled.div`
//   border: 1px solid blue;
  display: flex;
  gap: 14px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 498px;
  min-height: 62px;
  background: #fff;
`;

const UpR = styled.div`
//   border: 1px solid red;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 23px;
  background: #fff;
  margin: 0;
`;

const NameR = styled.div`
//   border: 1px solid green;
  display: inline-block;
  height: 19px;
  font-size: 16px;
  font-weight: bold;
`;

const TimeR = styled.div`
//   border: 1px solid green;
  display: inline-block;
  height: 17px;
  color: rgba(0, 0, 0, 0.3);
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  margin: 0 14px 0 0;
`;

const MsgR = styled.div`
//   border: 1px solid red;
  display: inline-block;
  min-height: 30px;
  background: #fff;
  font-size: 16px;
  line-height: 1.2;
  word-break: break-all;
  text-align: left;

`;

const Box = styled.div`
  display: flex;
  gap: 15px;
  min-width: 724px;
  min-height: 100px;
  padding: 20px 32px 14px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ProfileImg = styled.div`
  width: 62px;
  height: 62px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 30px;
//   background-image: url("${(props) => props.img}");
  background-image: url('https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const TextBox = styled.div`
//   border: 1px solid blue;
  display: flex;
  gap: 14px;
  flex-direction: column;
  justify-content: space-between;
  width: 514px;
  min-height: 62px;
  background: #fff;
`;

const Up = styled.div`
//   border: 1px solid red;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 23px;
  background: #fff;
  margin: 0;
`;

const Name = styled.div`
//   border: 1px solid green;
  display: inline-block;
  height: 19px;
  font-size: 16px;
  font-weight: bold;
`;

const Time = styled.div`
//   border: 1px solid green;
  display: inline-block;
  height: 17px;
  color: rgba(0, 0, 0, 0.3);
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  margin: 0 0 0 14px;
`;

const Msg = styled.div`
//   border: 1px solid red;
  display: inline-block;
  min-height: 30px;
  background: #fff;
  font-size: 16px;
  line-height: 1.2;
  white-space: normal;
  text-align: left;
  
`;

export default Message;