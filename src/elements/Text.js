import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { children, onClick, color, size, flexGrow, marginB, marginT, textAlign, h1, h2, h3, h4, body, subBody, price } = props;
  const styles = { flexGrow: flexGrow, marginB: marginB, marginT: marginT, textAlign: textAlign };

  // h1, h2, h3, SubHeading(h4) 디자인 시스템에 맞춘 폰트
  // h1 : 메인배너
  if (h1) {
    return (
      <TextBox full size="45px" bold onClick={onClick} {...styles}>
        {children}
      </TextBox>
    );
  }
  // h2 : 카테고리 제목 / 상세페이지 상품명
  if (h2) {
    return (
      <TextBox full size="35px" bold onClick={onClick} {...styles}>
        {children}
      </TextBox>
    );
  }
  // h3 : 상세페이지 카테고리 제목 / 버튼 폰트 크기와 동일
  if (h3) {
    return (
      <TextBox full size="20px" bold onClick={onClick} {...styles}>
        {children}
      </TextBox>
    );
  }
  // sub h4: 가격명
  if (h4) {
    return (
      <TextBox full size="16px" onClick={onClick} {...styles}>
        {children}
      </TextBox>
    );
  }

  // 조회수, 카테고리 설명
  if (body) {
    return (
      <TextBox onClick={onClick} {...styles}>
        {children}
      </TextBox>
    );
  }
  // 조회수, 카테고리 설명
  if (subBody) {
    return (
      <TextBox size="12px" onClick={onClick} {...styles}>
        {children}
      </TextBox>
    );
  }

  // 가격, 디자인 시스템에는 따로 없으나 코드에서 따로 뺌
  if (price) {
    return (
      <TextBox size="20px" onClick={onClick} {...styles}>
        {children}
      </TextBox>
    );
  }
};

// body 기준 default임
Text.defaultprops = {
  color: false,
  size: "14px",
  weight: "400",
  flexGrow: false,
  marginB: false,
  marginT: false,
  textAlign: "left",
  children: "",
  onClick: () => {},
};

const TextBox = styled.div`
  ${(props) => (props.full ? "display: flex; flex-direction: row; width: 100%;" : "")}
  flex-grow:${(props) => (props.flexGrow ? props.flexGrow : "")};

  height: fit-content;
  margin-bottom: ${(props) => (props.marginB ? props.marginB : "")};
  margin-top: ${(props) => (props.marginT ? props.marginT : "")};

  color: ${(props) => (props.color ? props.color : "")};

  font-size: ${(props) => (props.size ? props.size : "")};
  font-weight: ${(props) => (props.bold ? "700" : props.light ? "300" : "")};
  line-height: ${(props) => (props.flexGrow ? props.flexGrow : "")};
  ${(props) => (props.textAlign ? `text-align:${props.textAlign};` : "")}

  word-spacing:-1.5px;
  letter-spacing: 0.25px;
`;

export default Text;
