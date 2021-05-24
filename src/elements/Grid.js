import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    children,

    width,
    max_width,
    height,
    max_height,

    padding,
    is_flex,
    dp_flex,
    end_flex,
    __click,
    bg,
    bdr,
    bdrTop,
    bdrBottom,
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
    flexShrink,
    wordBreak,
    display,
    grids,
    rowGap,

    gap,

    className,
  } = props;

  const styles = {
    padding: padding,
    is_flex: is_flex,
    dp_flex: dp_flex,
    end_flex: end_flex,
    bg: bg ? bg : false,
    bdr: bdr ? bdr : false,
    bdrTop: bdrTop ? bdrTop : false,
    bdrBottom: bdrBottom ? bdrBottom : false,
    bgimg: bgimg ? bgimg : false,
    bgposition: bgposition,
    width: width,
    max_width: max_width,
    height: height,
    max_height: max_height,
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
    flexShrink: flexShrink,
    wordBreak: wordBreak,
    display: display,
    gap: gap,
    grids: grids,
    rowGap: rowGap,

    className: className,
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
  bdrTop: false,
  bdrBottom: false,
  bgimg: false,
  width: "100%",
  max_width: null,
  height: null,
  max_height: null,
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
  flexShrink: false,
  gap: false,
  className: false,
  overflow: null,
  wordBreak: false,
  display: false,
  grids: false,
  rowGap: false,
};

const GridBox = styled.div`
  z-index: ${(props) => props.zIndex};
  ${(props) => (props.flexShrink ? `flex-shrink:${props.flexShrink};` : `width: ${props.width};`)}
  gap: ${(props) => props.gap};
  overflow: ${(props) => props.overflow};
  word-break: ${(props) => props.wordBreak};
  display: ${(props) => props.display};

  max-width: ${(props) => (props.max_width ? props.max_width : "")};

  height: ${(props) => (props.height ? props.height : "")};
  max-height: ${(props) => (props.max_height ? props.max_height : "")};

  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};

  border-radius: ${(props) => props.borderRadius};
  border: ${(props) => props.bdr};
  border-top: ${(props) => props.bdrTop};
  border-bottom: ${(props) => props.bdrBottom};

  background-color: ${(props) => props.bg};
  background-image: ${(props) => `url(${props.bgimg})`};
  background-size: ${(props) => props.size};
  background-repeat: no-repeat;
  background-position: ${(props) => props.bgposition};
  opacity: ${(props) => (props.opacity ? props.opacity : "")};

  position: ${(props) => props.position};
  ${(props) => (props.is_flex ? `display:flex; align-items: center;` : "")};
  ${(props) => (props.dp_flex ? `display:flex;` : "")};
  ${(props) => (props.end_flex ? `display:flex; align-items: flex-end;` : "")};
  justify-content: ${(props) => (props.justify ? props.justify : "")};
  align-items: ${(props) => (props.align ? props.align : "")};

  ${(props) => (props.column ? `flex-direction: column;` : `flex-direction: row;`)}
  flex-flow: ${(props) => (props.wrap ? props.wrap : "")};
  row-gap: ${(props) => (props.rowGap ? props.rowGap : "")};

  grid-template-columns: ${(props) => (props.grids ? props.grids : "")};

  text-align: ${(props) => props.textAlign};

  top: ${(props) => props.top};
  right: ${(props) => props.right};
  left: ${(props) => props.left};

  box-sizing: border-box;

  white-space: pre-line;

  svg {
    cursor: pointer;
  }
`;

export default Grid;
