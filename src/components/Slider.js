import React from "react";
import styled from "styled-components";

const Slider = (props) => {
  const { children, top, bottom, margin, color } = props;
  return (
    <SliderWrap {...props}>
      <Slides>
        {/* 슬라이드사진 */}
        <SlideDiv className="first">
          <SlideImg src="https://images.pexels.com/photos/7214940/pexels-photo-7214940.png?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
        </SlideDiv>
        <SlideDiv>
          <SlideImg src="https://images.pexels.com/photos/7144919/pexels-photo-7144919.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
        </SlideDiv>
        <SlideDiv>
          <SlideImg src="https://images.pexels.com/photos/7024051/pexels-photo-7024051.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
        </SlideDiv>
        <BtnBox>
          <BtnLabel>
            <Btn type="radio" className="radio" id="button1"></Btn>
          </BtnLabel>
          <BtnLabel>
            <Btn type="radio" className="radio" id="button2"></Btn>
          </BtnLabel>
          <BtnLabel>
            <Btn type="radio" className="radio" id="button3"></Btn>
          </BtnLabel>
        </BtnBox>
      </Slides>
    </SliderWrap>
  );
};

Slider.defaultProps = {
  color: "#d2d2d2",
};

const SliderWrap = styled.div``;
const Slides = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 400px;
  width: 300%;
`;

//원형
const Btn = styled.input`
  border: 1px transparent white;
  cursor: pointer;

  background-color: purple;
  opacity: 0;
`;

const BtnLabel = styled.label`
  border: 2px solid black;
  border-radius: 10rem;
  padding: 0;
  width: 10px;
  transition: 300ms;
  cursor: pointer;
  margin: 0 10px;
  :hover {
    background-color: black;
  }
`;

const BtnBox = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 10px;

  #button1:checked ~ .first {
    margin-left
  } ;
`;

const SlideDiv = styled.div`
  transition: 2s;
`;
const SlideImg = styled.img`
  object-fit: cover;
  max-height: 400px;
  width: 100%;
`;

export default Slider;
