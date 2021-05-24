import React, { useState } from "react";
import List from "images/list.png";
import styled from "styled-components";

// 버튼식
const ListBtn = (props) => {
  const [showing, setShowing] = useState(false);
  const ListShowing = () => setShowing(!showing);
  if (showing) {
    return (
      <Wrapper>
        <CategoryBox>
          <_Left>
            <_Main>2D</_Main>
            <_Sub>3D</_Sub>
          </_Left>
        </CategoryBox>
      </Wrapper>
    );
  } else {
    return <Wrapper></Wrapper>;
  }
};
const Wrapper = styled.div`
  position: absolute;
  z-index: 100;
  background: #eee;
`;
const CategoryBox = styled.div`
  display: flex;
  width: 1000px;
  height: 100%;
  box-sizing: border-box;
`;
const _Left = styled.div``;

const _Main = styled.div`
  margin: 60px;
`;

const _Sub = styled.div`
  margin: 60px;
`;

export default ListBtn;
