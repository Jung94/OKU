import React from "react";
import styled from "styled-components";

const Myalert = () => {

  return (
    <Wrap>
      <h2 style={{margin:"30px 0 0"}}>서비스 준비 중입니다!</h2>
    </Wrap>
  );
};

const Wrap = styled.div`
//   border: 1px solid red;
  max-width: 1030px;
  width: 1030px;
  display: flex;
  gap: 50px;
  flex-direction: column;
`;

export default Myalert;