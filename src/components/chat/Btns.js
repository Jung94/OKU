import React, { useState } from 'react';
import styled from 'styled-components';
import DaumPostcode from "react-daum-postcode";
import { actionCreators as chatActions } from 'redux/modules/chat';

const Btns = (props) => {

  const [region, setRegion] = useState("");
  const [isPostOpen, setIsPostOpen] = useState(false); // 주소창 열고 닫기
  // 우편번호 / 주소 찾기
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setRegion(fullAddress);
    setIsPostOpen(false);
  };
  
  return (
    <>
      <BtnBox>
        <Delivery text="주소 검색" onClick={() => { setIsPostOpen(true);}}>
          배송 정보 보내기
        </Delivery>
        <Exit>
          거래 종료하기
        </Exit>
      </BtnBox>
      {isPostOpen && (
        <Modal>
          <ModalSection>
            <DaumPostcode onComplete={handleComplete} />
          </ModalSection>
          <ModalBack onClick={() => setIsPostOpen(false)}></ModalBack>
        </Modal>
      )}
    </>
  );
};

const Modal = styled.div`
  display: flex;
  align-items: center;
  animation: modal-bg-show 0.3s;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 90;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalSection = styled.section`
  width: 90%;
  max-width: 450px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: modal-show 0.3s;
  overflow: hidden;
  z-index: 99;
`;

const ModalBack = styled.div`
  display: flex;
  align-items: center;
  animation: modal-bg-show 0.3s;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 96;
  background-color: transparent;
`;

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