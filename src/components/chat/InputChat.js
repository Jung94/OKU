import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { actionCreators as chatActions } from "redux/modules/chat";

import DaumPostcode from "react-daum-postcode";

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

const ChatInput = ({ room }) => {
  const [msg, setMsg] = useState("");
  const [region, setRegion] = useState("");
  const [isPostOpen, setIsPostOpen] = useState(false); // 주소창 열고 닫기
  // const userImg = useSelector((state) => state.user.user?.profile_img);
  // const username = useSelector((state) => state.user.user);
  // const uid = useSelector((state) => state.user.uid);
  const username = localStorage.getItem("nickname");
  const uid = localStorage.getItem("uid");

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
    setMsg(fullAddress);
    setIsPostOpen(false);
  };

  // 채팅 전송 시 방 정보, 유저 이름, 유저 프로필, 메세지 전송
  const Info = {
    room: room,
    username: username,
    profile_img: "https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png", // userImg
    msg: msg,
    uid: uid,
  };

  const msgSubmit = () => {
    // 아무것도 입력하지 않은 경우 리턴
    if (msg === "") {
      return;
    }

    const time = new Date();
    // console.log(time);
    // 채팅 전송
    chatActions.socket.emit("send", {
      room: Info.room,
      username: Info.username,
      // profile_img: Info.profile_img,
      time: time,
      msg: Info.msg,
    });
    // 알람 전송
    chatActions.globalSocket.emit("globalSend", {
      room: Info.room,
      username: Info.username,
      uid: Info.uid,
      profile_img: Info.profile_img,
      msg: Info.msg,
    });
    // setMsg("\n");
    setMsg("");
  };

  return (
    <>
      <Desktop>
        <BtnBox>
          <Delivery
            text="주소 검색"
            onClick={() => {
              setIsPostOpen(true);
            }}
          >
            배송 정보 보내기
          </Delivery>
          <Exit>거래 종료하기</Exit>
        </BtnBox>

        <InputBox>
          <Text
            type="text"
            placeholder="대화를 입력해주세요."
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            onKeyPress={(e) => {
              if (window.event.keyCode === 13 && !e.shiftKey) {
                msgSubmit();
                e.preventDefault();
              }
            }}
            value={msg}
          />
          <Btn onClick={msgSubmit}>전송</Btn>
        </InputBox>

        {isPostOpen && (
          <Modal>
            <ModalSection>
              <DaumPostcode onComplete={handleComplete} />
            </ModalSection>
            <ModalBack onClick={() => setIsPostOpen(false)}></ModalBack>
          </Modal>
        )}
      </Desktop>

      <Tablet>Tablet</Tablet>

      <Mobile>
        <BtnBox>
          <Delivery
            text="주소 검색"
            onClick={() => {
              setIsPostOpen(true);
            }}
          >
            배송 정보 보내기
          </Delivery>
          <Exit>거래 종료하기</Exit>
        </BtnBox>

        <InputBox>
          <Text
            type="text"
            placeholder="대화를 입력해주세요."
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            onKeyPress={(e) => {
              if (window.event.keyCode === 13 && !e.shiftKey) {
                msgSubmit();
                e.preventDefault();
              }
            }}
            value={msg}
          />
          <Btn onClick={msgSubmit}>전송</Btn>
        </InputBox>

        {isPostOpen && (
          <Modal>
            <ModalSection>
              <DaumPostcode onComplete={handleComplete} />
            </ModalSection>
            <ModalBack onClick={() => setIsPostOpen(false)}></ModalBack>
          </Modal>
        )}
      </Mobile>
      
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

  @media only screen and (max-width: 767px) {
    // border: 1px solid green;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25.2px;
    width: 100vw;
    margin-bottom: 12px;
  }
`;

const Delivery = styled.button`
  width: 172.8px;
  height: 40px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  background: #ae00ff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 767px) {
    // border: 1px solid green;
    width: 120px;
    height: 30px;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    background: #ae00ff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.3);
  }
`;

const Exit = styled.button`
  width: 172.8px;
  height: 40px;
  color: rgba(0, 0, 0, 0.4);
  font-size: 16px;
  font-weight: bold;
  background: #eaeaea;
  border: none;
  border-radius: 12px;
  // cursor: pointer;
  box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 767px) {
    // border: 1px solid green;
    width: 120px;
    height: 30px;
    color: rgba(0, 0, 0, 0.4);
    font-size: 12px;
    font-weight: 500;
    background: #eaeaea;
    border: none;
    border-radius: 10px;
    // cursor: pointer;
    box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.2);
  }
`;

const InputBox = styled.div`
  display: flex;
  gap: 12px;
  width: 680px;
  margin-bottom: 19.4px;

  @media only screen and (max-width: 767px) {
    // border: 1px solid green;
    display: flex;
    justify-content: space-between;
    gap: 7px;
    width: 100vw;
    padding: 0 10px;
    margin-bottom: 8px;
  }
`;

const Text = styled.textarea`
  width: 595px;
  height: 80px;
  background: #fff;
  border-radius: 12px;
  border: 0.5px solid #c1c1c1;
  font-size: 16px;
  padding: 14px;
  white-space: normal;
  word-break: break-all;
  outline: none;
  resize: none;

  @media only screen and (max-width: 767px) {
    border: 1px solid green;
    width: 100%;
    height: 36px;
    background: #fff;
    border-radius: 12px;
    border: 0.5px solid #c1c1c1;
    font-size: 12px;
    padding: 10px 14px 0;
    white-space: normal;
    word-break: break-all;
    outline: none;
    resize: none;

    ::placeholder {
      font-size: 12px;
      font-weight: 500;
    }
  }
`;

const Btn = styled.button`
  width: 40px;
  height: 80px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  background: #ae00ff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 767px) {
    width: 57px;
    height: 36px;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    background: #ae00ff;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.2);
  }
`;

export default ChatInput;
