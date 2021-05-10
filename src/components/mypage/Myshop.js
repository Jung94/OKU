import React from "react";
import styled from "styled-components";

const Myshop = () => {

  return (
    <Wrap>
      <LikeBox>
        <h2 style={{textAlign: "left"}}>찜 목록</h2>
        <LikeList>
        </LikeList>
      </LikeBox>
      <BuyBox>
        <h2 style={{textAlign: "left"}}>구매 목록</h2>
        <BuyList>
        </BuyList>
      </BuyBox>
    </Wrap>
  );
};

const Wrap = styled.div`
//   border: 1px solid red;
  max-width: 1030px;
  display: flex;
  gap: 50px;
  flex-direction: column;
`;

const LikeBox = styled.div`
  border: 1px solid red;
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: 1030px;
  height: 300px;
  padding: 30px;
  background: #eee;
`;

const LikeList = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 100%;
  background: #fff;
`;

const BuyBox = styled.div`
  border: 1px solid red;
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: 1030px;
  height: 300px;
  padding: 30px;
  background: #eee;
`;

const BuyList = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 100%;
  background: #fff;
`;

export default Myshop;