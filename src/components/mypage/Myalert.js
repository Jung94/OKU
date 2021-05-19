import React from "react";
import styled from "styled-components";

import { Color } from "shared/DesignSys";

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

const Box = styled.div`
  width: 100%;
  min-height: 180px;
  padding: 30px 40px 30px 30px;
  display: flex;
  flex-direction: column;
  background-color: ${Color.Light_1};
  border-radius: 12px;
  & button {
    align-items: center;
    margin: 20px auto 0;
    padding: 0 30px;
    width: 14rem;
  }
`;

export default Myalert;
