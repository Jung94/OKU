import React from "react";
import styled from "styled-components";
import MainChat from "./MainChat";

const Main = ({ targetName, productName }) => {
  // 채팅 리스트 상위 컴포넌트
  return (
    <>
      <Wrap>
        <MainChat targetName={targetName} productName={productName} />
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  // border: 1px solid red;
  width: 680px;
  height: 468px;
  border-radius: 16px;
//   position: relative;
//   ::-webkit-scrollbar {
//     width: 12px; /* width of the entire scrollbar */
//   }
//   ::-webkit-scrollbar-track {
//     background: white; /* color of the tracking area */
//   }
//   ::-webkit-scrollbar-thumb {
//     background-color: #d8d9dc; /* color of the scroll thumb */
//     border-radius: 20px; /* roundness of the scroll thumb */
//   }

  @media only screen and (max-width: 767px) {
    // border: 1px solid red;
    width: 100vw;
    height: 70%;
    border-radius: 0;
  }
`;

export default Main;
