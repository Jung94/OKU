import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight as fasCRight, faChevronLeft as fasCLeft } from "@fortawesome/free-solid-svg-icons";

const Slider = (props) => {
  const { imgList } = props;
  const [sliderFigure, setSliding] = useState(0);

  // image 배열 시도
  // const tryList = [
  //   "https://images.pexels.com/photos/7214940/pexels-photo-7214940.png?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  //   // "https://images.pexels.com/photos/7144919/pexels-photo-7144919.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  //   // "https://images.pexels.com/photos/7024051/pexels-photo-7024051.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  // ];

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
        {/* 순서 버튼 (radio button) */}
        <BtnBox sliderFigure={sliderFigure}>
          <BtnLabel>
            {imgList &&
              imgList.map((i, idx) => {
                return (
                  <Btn
                    key={idx}
                    type="radio"
                    onClick={() => {
                      setSliding(idx * 200);
                    }}
                  ></Btn>
                );
              })}
          </BtnLabel>
        </BtnBox>
        {/* 방향키 */}
        <ArrBox>
          {imgList &&
            imgList.map((i, idx) => {
              return (
                <FontAwesomeIcon
                  key={idx}
                  icon={fasCLeft}
                  onClick={() => {
                    if (sliderFigure > 0) {
                      setSliding(sliderFigure - 200);
                    } else {
                      setSliding(200 * idx);
                    }
                  }}
                />
              );
            })}
          {imgList &&
            imgList.map((i, idx) => {
              return (
                <FontAwesomeIcon
                  key={idx}
                  icon={fasCRight}
                  onClick={() => {
                    if (sliderFigure <= 200 * (idx - 1)) {
                      setSliding(sliderFigure + 200);
                    } else {
                      setSliding(0);
                    }
                  }}
                />
              );
            })}
        </ArrBox>
      </Slides>
    </SliderWrap>
  );
};

Slider.defaultProps = {};

const SliderWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Slides = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 500px;
`;

const Slide = styled.div`
  display: flexbox;
  height: 500px;
  width: 100%;
  transition: 700ms ease;

  margin-left: ${(props) => (props.sliderFigure ? `-${props.sliderFigure}%;` : "0%;")};
`;

const Carousel = styled.div`
  background: ${(props) => `url(${props.img})`};
  background-size: cover;
  background-position: center;
  width: 100%;
  transition: 700ms ease;
`;

//원형
const ArrBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  height: inherit;
  //손보기
  width: 50%;
  padding: 1%;
  justify-content: space-between;
  align-content: center;
  svg {
    width: 100%;
    font-size: 3rem;
    color: #ffffff88;
    z-index: 99;
    cursor: pointer;
    :hover {
      color: whitesmoke;
    }
  }
`;

const BtnBox = styled.div`
  display: flex;
  position: absolute;
  height: inherit;
  width: inherit;
  ${(props) =>
    props.sliderFigure === 0
      ? "& > label:nth-child(1) {background-color: whitesmoke;}"
      : props.sliderFigure === 200
      ? "& > label:nth-child(2) {background-color: whitesmoke;}"
      : "& > label:nth-child(3) {background-color: whitesmoke;}"}
`;

const Btn = styled.input`
  cursor: pointer;
  display: none;
`;

const BtnLabel = styled.label`
  background-color: #ffffff88;
  z-index: 99;
  border-radius: 10rem;
  padding: 0;
  width: 10px;
  height: 10px;
  transition: 300ms;
  cursor: pointer;
  margin: auto 10px 20px 10px;
  :hover {
    background-color: whitesmoke;
  }
`;

export default Slider;
