import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight as fasCRight, faCaretLeft as fasCLeft } from "@fortawesome/free-solid-svg-icons";

import { Color } from "shared/DesignSys";

const Slider = (props) => {
  const { imgList, flexGrow, noRadius, onSale } = props;
  const [sliderFigure, setSliding] = useState(0);

  // image 배열 시도
  const qweList = [
    "https://images.pexels.com/photos/7214940/pexels-photo-7214940.png?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    "https://images.pexels.com/photos/7144919/pexels-photo-7144919.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/7024051/pexels-photo-7024051.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  ];

  return (
    <SliderWrap {...props}>
      <Slides>
        {/* 슬라이드사진 */}
        <Slide sliderFigure={sliderFigure}>
          {imgList &&
            imgList.map((i, idx) => {
              return <Carousel key={idx} img={i} alt="상품 이미지" />;
            })}
        </Slide>
      </Slides>
      {/* 순서 버튼 (radio button) */}
      <BtnBox sliderFigure={sliderFigure}>
        {imgList &&
          imgList.map((i, idx) => {
            return (
              <BtnLabel key={idx}>
                <Btn
                  type="radio"
                  onClick={() => {
                    setSliding(idx * 200);
                  }}
                ></Btn>
              </BtnLabel>
            );
          })}
      </BtnBox>
      {/* 방향키 */}
      {imgList && imgList.length && (
        <ArrBox>
          <FontAwesomeIcon
            icon={fasCLeft}
            onClick={() => {
              if (sliderFigure > 0) {
                setSliding(sliderFigure - 200);
              } else {
                setSliding(200 * (imgList.length - 1));
              }
            }}
          />
          <FontAwesomeIcon
            icon={fasCRight}
            onClick={() => {
              if (sliderFigure < 200 * (imgList.length - 1)) {
                setSliding(sliderFigure + 200);
              } else {
                setSliding(0);
              }
            }}
          />
        </ArrBox>
      )}
    </SliderWrap>
  );
};

Slider.defaultProps = {};

const SliderWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  ${(props) => (props.noRadius ? "" : "border-radius: 32px;")}

  box-sizing: border-box;
`;

const Slides = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 100%;
`;

const Slide = styled.div`
  display: flexbox;

  width: 100%;
  transition: 700ms ease;

  margin-left: ${(props) => (props.sliderFigure ? `-${props.sliderFigure}%;` : "0%;")};
`;

const Carousel = styled.div`
  background: ${(props) => `url(${props.img})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  transition: transform 700ms ease;
  /* :hover {
    transform: scale(1.2);
  } */
`;

const BtnBox = styled.div`
  z-index: 10;
  margin-top: -40px;
  height: 0;
  display: flex;
  /* 다음 두줄이 핵심 */
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.sliderFigure === 0
      ? `& > label:nth-child(1) {background-color: ${Color.Primary};}`
      : props.sliderFigure === 200
      ? `& > label:nth-child(2) {background-color: ${Color.Primary};}`
      : `& > label:nth-child(3) {background-color: ${Color.Primary};}`};
`;

const Btn = styled.input`
  cursor: pointer;
  display: none;
`;

const BtnLabel = styled.label`
  z-index: 99;
  border-radius: 10rem;
  padding: 0;
  width: 8px;
  height: 8px;
  transition: 300ms;
  cursor: pointer;
  margin: auto 8px 20px 8px;
  background-color: #ffffff;
  :hover {
    background-color: ${Color.Primary};
  }
`;

// 화살표
const ArrBox = styled.div`
  background-color: transparent;
  display: flex;
  flex-wrap: wrap;
  z-index: 10;
  height: 0;
  justify-content: space-between;
  align-content: center;
  svg {
    -webkit-filter: saturate(2%);
    filter: saturate(20%);
    margin: 1%;
    margin-bottom: 80%;
    min-height: 30px;
    min-width: 30px;
    height: 90px;
    width: 60px;
    text-align: center;
    padding: 1%;
    font-size: 180px;
    color: rgba(0, 0, 0, 0.24);
    z-index: 99;
    cursor: pointer;
    transition: 300ms;
    :hover {
      color: ${Color.Primary}88;
    }
  }
`;

export default Slider;
