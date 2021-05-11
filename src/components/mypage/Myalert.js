import React from "react";
import styled from "styled-components";

const Myalert = () => {
  return (
    <Wrap>
      <h2 style={{ margin: "30px 0 0" }}>서비스 준비 중입니다!</h2>
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 1030px;
  width: 100%;
  min-height: 180px;
  display: flex;
  gap: 50px;
  flex-direction: column;
`;

export default Myalert;
