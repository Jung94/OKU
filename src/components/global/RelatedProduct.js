import React from 'react';
import styled from 'styled-components';
import { priceComma } from "shared/common";
import { Color } from "shared/DesignSys";

const RelatedProduct = (props) => {
    const { title, img, lowBid, _onClick } = props;

    return(
        <ImgWrap onClick={_onClick}>
          <TitlePrice><div>{title}</div><div>{priceComma(lowBid)}원</div></TitlePrice>
          <RelatedImg img={img}></RelatedImg>
        </ImgWrap>
    );
};

RelatedProduct.defaultProps = {
    img : 'https://movie-phinf.pstatic.net/20210308_97/1615182990261ekXlL_JPEG/movie_image.jpg',
};

const ImgWrap = styled.div`
  // z-index: 99;
  position: relative;
  width: 10rem;
  height: 10rem;
  flex-grow: 1;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: 1%;
  border-radius: 16px;
  cursor: pointer;
  // border: 1px solid red;

  :hover {
    transition: 0.2s;
    transform: scale(1.05);
  }

  &:not(hover) {
    transition: 0.2s;
  }
  
`

const TitlePrice = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 98%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  overflow: hidden;
  word-break: break-all;
  opacity: 0;
  transition: 0.2s;
  text-align: center;
  color: #fff;
  font-weight: 500;
  padding: 10px;
  border-radius: 16px;

  :hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.6);
  }
`

const RelatedImg = styled.div`
  display: flex;
  background: url(${(props) => props.img}) no-repeat;
  background-size: cover;
  background-position: center;
  flex-grow: 1;
  height: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: 1%;
  border-radius: 16px;
  border: 0.5px solid ${Color.Light_3};

  :hover {
    transition: 0.2s;
    opacity: 0;
  }

  &:not(hover) {
    transition: 0.2s;
  }
`;

export default RelatedProduct;