import React from "react";
import styled from "styled-components";

import { Color } from "shared/DesignSys";

const Text = (props) => {
  const {
    children,
    onClick,
    color,
    size,
    bold,
    flexGrow,
    margin,
    marginB,
    marginT,
    textAlign,
    center,
    full,
    lineHeight,
    weight,
    h0,
    h1,
    h2,
    h3,
    h4,
    body,
    subBody,
    price,
    won,
    span,
    width,
    border,
    pointer,
  } = props;

  const styles = {
    color: color,
    flexGrow: flexGrow,
    margin: margin,
    marginB: marginB,
    marginT: marginT,
    textAlign: textAlign,
    lineHeight: lineHeight,
    weight: weight,
    width: width,
    border: border,
    pointer: pointer,
  };

  const preSetting = {
    bold: bold,
    center: center,
    full: full,
    // pointer: pointer,
  };

  // h1, h2, h3, SubHeading(h4) 디자인 시스템에 맞춘 폰트
  // h1 : 메인배너
  if (h0) {
    return (
      <TextBox size="40px" onClick={onClick} {...styles} bold>
        {children}
      </TextBox>
    );
  }
  // h2 : 카테고리 제목 / 상세페이지 상품명
  if (h1) {
    return (
      <TextBox size="30px" onClick={onClick} {...styles} bold>
        {children}
      </TextBox>
    );
  }
  // h3 : 상세페이지 카테고리 제목
  if (h2) {
    return (
      <TextBox size="20px" onClick={onClick} {...styles} bold>
        {children}
      </TextBox>
    );
  }

  //
  if (h3) {
    return (
      <TextBox size="18px" onClick={onClick} {...styles} bold>
        {children}
      </TextBox>
    );
  }

  // sub h4: 가격명
  if (h4) {
    return (
      <TextBox size="14px" onClick={onClick} {...styles} {...preSetting}>
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
      <TextBox size="12px" onClick={onClick} {...styles} {...preSetting}>
        {children}
      </TextBox>
    );
  }

  // 가격, 디자인 시스템에는 따로 없으나 코드에서 따로 뺌
  if (price) {
    return (
      <TextBox size="30px" bold onClick={onClick} {...styles}>
        {children}
      </TextBox>
    );
  }
  // 원
  if (won || span) {
    return (
      <SpanBox onClick={onClick} {...styles}>
        {children}
      </SpanBox>
    );
  }

  return (
    <TextBox size={size} onClick={onClick} {...styles} {...preSetting}>
      {children}
    </TextBox>
  );
};

// body 기준 default임
// defaultProps P대문자!!!
Text.defaultProps = {
  color: "black",
  size: "14px",
  weight: "400",
  flexGrow: false,
  margin: false,
  marginB: false,
  marginT: false,
  width: false,
  border: false,
  children: "",
  onClick: null,
  pointer: false,
};

const TextBox = styled.div`
  ${(props) => (props.full ? "display: flex; flex-direction: row; width: 100%;" : "")}
  flex-grow:${(props) => (props.flexGrow ? props.flexGrow : "")};

  align-items: center;

  height: fit-content;
  width: ${(props) => props.width};
  border: ${(props) => props.border};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginB};
  margin-top: ${(props) => props.marginT};

  color: ${(props) => props.color};

  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "700" : "400")};

  line-height: ${(props) => (props.lineHeight ? props.lineHeight : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")}

  word-spacing : -1.5px;
  letter-spacing: 0.25px;

  cursor: ${(props) => (props.onClick ? "pointer" : "")};
`;

const SpanBox = styled.span`
  font-size: 18px;
  margin-left: 5px;
`;

export default Text;
