import React, { useState } from 'react';
import styled from 'styled-components';
import { actionCreators as chatActions } from 'redux/modules/chat';

const Btns = (props) => {
  
  return (
    <>
      <BtnBox>
        <Delivery>배송 정보 보내기</Delivery>
        <Exit>거래 종료하기</Exit>
      </BtnBox>
    </>
  );
}

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25.2px;
  width: 744px;
  margin-bottom: 22.6px;
`;

const Delivery = styled.button`
  width: 172.8px;
  height: 40px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  background: #ae00ff;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2);
`;

const Exit = styled.button`
  width: 172.8px;
  height: 40px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  background: #ae00ff;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2);
`;

export default Btns;