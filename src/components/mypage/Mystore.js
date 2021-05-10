import React from "react";
import styled from "styled-components";

const Mystore = () => {

  return (
    <Wrap>
      <StoreBox>
        <h2 style={{textAlign: "left"}}>상점</h2>
        <StoreList>
        </StoreList>
      </StoreBox>
      <ProductBox>
        <h2 style={{textAlign: "left"}}>판매 중인 상품</h2>
        <ProductList>
        </ProductList>
      </ProductBox>
      <ReviewBox>
        <h2 style={{textAlign: "left"}}>내 상점 후기</h2>
        <ReviewList>
        </ReviewList>
      </ReviewBox>
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

const StoreBox = styled.div`
  border: 1px solid red;
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: 1030px;
  height: 300px;
  padding: 30px;
  background: #eee;
`;

const StoreList = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 100%;
  background: #fff;
`;

const ProductBox = styled.div`
  border: 1px solid red;
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: 1030px;
  height: 300px;
  padding: 30px;
  background: #eee;
`;

const ProductList = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 100%;
  background: #fff;
`;

const ReviewBox = styled.div`
  border: 1px solid red;
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: 1030px;
  height: 300px;
  padding: 30px;
  background: #eee;
`;

const ReviewList = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 100%;
  background: #fff;
`;

export default Mystore;