import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { children, onClick, color, size, weight, flexGrow, marginB, marginT, h1, h2, h3, h4, h5, h6, title, subTitle, note, price, priceSm, textAlign } = props;
  console.log(props);
  // h1, h2, h3, h4, h5, h6 디자인 시스템에 맞춘 폰트 크기
  if (h1) {
    return <TextBox size="24px">{children}</TextBox>;
  }

  // 가격
  if (price) {
    return (
      <TextBox size="24px" weight="700" onClick={onClick} color={color} flexGrow={flexGrow} textAlign={textAlign} marginB="1%" marginT="1%" {...props}>
        {children}
      </TextBox>
    );
  }

  // 제목
  if (title) {
    return (
      <TextBox full size="24px" weight="700" onClick={onClick} color={color} flexGrow={flexGrow} textAlign={textAlign} marginB="1%" marginT="1%" {...props}>
        {children}
      </TextBox>
    );
  }

  // 부제목
  if (subTitle) {
    return (
      <TextBox size="14px" weight="600" onClick={onClick} color="#9e9e9e" full flexGrow={flexGrow} textAlign={textAlign} marginB="1%" marginT={marginT} {...props}>
        {children}
      </TextBox>
    );
  }

  // 주석
  if (note) {
    console.log(textAlign);
    return (
      <TextBox size="12px" weight="600" onClick={onClick} color="#808080" flexGrow={flexGrow} textAlign={textAlign} marginB="1%" marginT={marginT} {...props}>
        {children}
      </TextBox>
    );
  }

  // props
  if (children) {
    return <TextBox {...props}>{children}</TextBox>;
  }
};

Text.defaultprops = {
  color: false,
  size: "16px",
  weight: "500",
  flexGrow: false,
  marginB: false,
  marginT: false,
  textAlign: "left",
  onClick: () => {},
};

const TextBox = styled.div`
  ${(props) => (props.full ? "display: flex; flex-direction: row; width: 100%;" : "")}
  flex-grow:${(props) => (props.flexGrow ? props.flexGrow : "")};

  height: fit-content;
  margin-bottom: ${(props) => (props.marginB ? props.marginB : "")};
  margin-top: ${(props) => (props.marginT ? props.marginT : "")};
  /* border-bottom: 2px solid grey; */

  color: ${(props) => (props.color ? props.color : "")};

  font-size: ${(props) => (props.size ? props.size : "")};
  font-weight: ${(props) => (props.weight ? props.weight : "")};
  line-height: ${(props) => (props.flexGrow ? props.flexGrow : "")};
  ${(props) => (props.textAlign ? `text-align:${props.textAlign};` : "")}
`;

export default Text;
