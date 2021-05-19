import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";

import moment from "moment"; 
import "moment/locale/ko";

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

const Message = (props) => {

    // const me = useSelector((state) => state.user.user);
    const me = localStorage.getItem("nickname");
    
    const time = moment(props.time).format("hh:mm");
    
    return (
        <>
          <Desktop>
            {me !== props.user ? (
              <>
                <Box>
                  <ProfileImg></ProfileImg>
                  <TextBox>
                    <Up>
                      <Name>{props.user}</Name>
                      <Time>{time}</Time>
                    </Up>
                    <Msg>{props.msg}</Msg>
                  </TextBox>
                </Box>
              </>
            ) : (
              <>
                <BoxR >
                  <TextBoxR>
                    <UpR>
                      <TimeR>{time}</TimeR>
                      <NameR>{me}</NameR>
                    </UpR>
                    <MsgR>{props.msg}</MsgR>
                  </TextBoxR>
                  <ProfileImgR></ProfileImgR>
                </BoxR>
              </>
            )}
          </Desktop>

          <Tablet>Tablet</Tablet>

          <Mobile>
            {me !== props.user ? (
              <>
                <Box>
                  <ProfileImg></ProfileImg>
                  <TextBox>
                    <Up>
                      <Name>{props.user}</Name>
                      <Time>{time}</Time>
                    </Up>
                    <Msg>{props.msg}</Msg>
                  </TextBox>
                </Box>
              </>
            ) : (
              <>
                <BoxR >
                  <TextBoxR>
                    <UpR>
                      <TimeR>{time}</TimeR>
                      <NameR>{me}</NameR>
                    </UpR>
                    <MsgR>{props.msg}</MsgR>
                  </TextBoxR>
                  <ProfileImgR></ProfileImgR>
                </BoxR>
              </>
            )}
          </Mobile>
          
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

  @media only screen and (max-width: 767px) {
    // border: 1px solid green;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    min-width: 100vw;
    width: 100vw;
    min-height: 50px;
    padding: 10px 10px 10px 10px;
    background: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
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

  @media only screen and (max-width: 767px) {
    width: 40px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 30px;
  //   background-image: url("${(props) => props.img}");
    background-image: url('https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
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

  @media only screen and (max-width: 767px) {
    // border: 1px solid blue;
    display: flex;
    gap: 2px;
    flex-direction: column;
    justify-content: space-between;
    width: 231px;
    min-width: 220px;
    min-height: 30px;
    background: #fff;
  }
`;

const UpR = styled.div`
//   border: 1px solid red;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 23px;
  background: #fff;
  margin: 0;

  @media only screen and (max-width: 767px) {
    // border: 1px solid blue;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    height: 23px;
    background: #fff;
    margin: 0;
  }
`;

const NameR = styled.div`
//   border: 1px solid green;
  display: inline-block;
  height: 19px;
  font-size: 16px;
  font-weight: bold;

  @media only screen and (max-width: 767px) {
    // border: 1px solid blue;
    display: inline-block;
    font-size: 12px;
    font-weight: 500;
    margin: 0 1px 0 0;
  }
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

  @media only screen and (max-width: 767px) {
    // border: 1px solid green;
    display: inline-block;
    height: 16px;
    color: rgba(0, 0, 0, 0.3);
    font-size: 10px;
    font-weight: 400;
    text-align: left;
    margin: 0 8px 0 0;
  }
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
  white-space: pre-line;

  @media only screen and (max-width: 767px) {
    // border: 1px solid blue;
    display: inline-block;
    min-height: 30px;
    background: #fff;
    font-size: 12.4px;
    line-height: 1.3;
    white-space: normal;
    text-align: left;
    white-space: pre-line;

  }
`;



const Box = styled.div`
  display: flex;
  gap: 15px;
  min-width: 724px;
  min-height: 100px;
  padding: 20px 32px 14px;
  background: #fff;
  // border: 1px solid green;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: 767px) {
    // border: 1px solid green;
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    min-width: 100vw;
    width: 100vw;
    min-height: 50px;
    padding: 10px 40px 10px 10px;
    background: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
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

  @media only screen and (max-width: 767px) {
    width: 40px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 30px;
  //   background-image: url("${(props) => props.img}");
    background-image: url('https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
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

  @media only screen and (max-width: 767px) {
    // border: 1px solid blue;
    display: flex;
    gap: 2px;
    flex-direction: column;
    justify-content: space-between;
    width: 240px;
    min-width: 220px;
    min-height: 30px;
    background: #fff;
  }
`;

const Up = styled.div`
//   border: 1px solid red;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 23px;
  background: #fff;
  margin: 0;

  @media only screen and (max-width: 767px) {
    // border: 1px solid blue;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    height: 23px;
    background: #fff;
    margin: 0;
  }
`;

const Name = styled.div`
//   border: 1px solid green;
  display: inline-block;
  height: 19px;
  font-size: 16px;
  font-weight: bold;

  @media only screen and (max-width: 767px) {
    // border: 1px solid blue;
    display: inline-block;
    font-size: 12px;
    font-weight: 500;
  }
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

  @media only screen and (max-width: 767px) {
    // border: 1px solid green;
    display: inline-block;
    height: 17px;
    color: rgba(0, 0, 0, 0.3);
    font-size: 10px;
    font-weight: 400;
    text-align: left;
    margin: 0 0 0 8px;
  }
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
  white-space: pre-line;

  @media only screen and (max-width: 767px) {
    // border: 1px solid blue;
    display: inline-block;
    min-height: 14px;
    background: #fff;
    font-size: 12.4px;
    line-height: 1.3;
    white-space: normal;
    text-align: left;
    white-space: pre-line;
  }
`;

export default Message;