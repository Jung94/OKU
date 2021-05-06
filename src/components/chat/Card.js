import React from 'react';
import styled from 'styled-components';

const Card = (props) => {

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
    </>
  );
};

const Box = styled.div`
  display: flex;
  gap: 10px;
  width: 285.4px;
  height: 103px;
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

export default Card;