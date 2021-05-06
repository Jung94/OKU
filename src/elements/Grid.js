import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    children,

    width,
    height,

    padding,
    is_flex,
    dp_flex,
    __click,
    bg,
    bdr,
    bgimg,
    bgposition,
    margin,
    align,
    zIndex,
    overflow,
    size,
    opacity,
    position,
    column,
    textAlign,
    color,
    top,
    right,
    left,
    borderRadius,
    wrap,
    justify,
    flexGrow,
  } = props;

  const styles = {
    padding: padding,
    is_flex: is_flex,
    dp_flex: dp_flex,
    bg: bg ? bg : false,
    bdr: bdr ? bdr : false,
    bgimg: bgimg ? bgimg : false,
    bgposition: bgposition,
    width: width,
    height: height,
    margin: margin,
    align: align,
    zIndex: zIndex,
    overflow: overflow,
    size: size,
    opacity: opacity,
    position: position,
    column: column,
    textAlign: textAlign,
    color: color,
    top: top,
    right: right,
    left: left,
    borderRadius: borderRadius,
    wrap: wrap,
    justify: justify,
    flexGrow: flexGrow,
  };

  if (__click) {
    return (
      <GridBox
        onClick={() => {
          __click();
        }}
        {...styles}
      >
        {children}
      </GridBox>
    );
  }
  return <GridBox {...styles}>{children}</GridBox>;
};

Grid.defaultProps = {
  isRoot: false,
  children: null,
  is_flex: false,
  dp_flex: false,
  __click: null,
  bg: false,
  bdr: false,
  bgimg: false,
  width: "100%",
  height: null,
  margin: false,
  align: false,
  zIndex: false,
  back_center: false,
  opacity: null,
  position: false,
  bgposition: false,
  textAlign: false,
  top: false,
  right: false,
  left: false,
  borderRadius: false,
  color: "#5A5656",
  wrap: null,
  justify: false,
  flexGrow: false,
};

const GridBox = styled.div`
  z-index: ${(props) => props.zIndex};
  ${(props) => (props.flexGrow ? `flex-grow:${props.flexGrow};` : `width: ${props.width};`)}

  height: ${(props) => (props.height ? props.height : "")};

  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};

  border-radius: ${(props) => props.borderRadius};
  border: ${(props) => props.bdr};

  background-color: ${(props) => props.bg};
  background-image: ${(props) => `url(${props.bgimg})`};
  background-size: ${(props) => props.size};
  background-repeat: no-repeat;
  background-position: ${(props) => props.bgposition};
  opacity: ${(props) => (props.opacity ? props.opacity : "")};

  position: ${(props) => props.position};
  ${(props) => (props.is_flex ? `display:flex; align-items: center;` : "")};
  ${(props) => (props.dp_flex ? `display:flex;` : "")};
  justify-content: ${(props) => (props.justify ? props.justify : "")};

  ${(props) => (props.column ? `flex-direction: column;` : `flex-direction: row;`)}
  flex-wrap: ${(props) => (props.wrap ? "wrap" : "")};

  text-align: ${(props) => props.textAlign};

  top: ${(props) => props.top};
  right: ${(props) => props.right};
  left: ${(props) => props.left};

  box-sizing: border-box;

  svg {
    cursor: pointer;
  }
`;

export default Grid;
