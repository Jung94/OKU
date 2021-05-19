import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import { Timer } from "components/";
import { priceComma } from "shared/common";
import { history } from "../redux/configureStore";

import { Color } from "shared/DesignSys";

const MainCard = (props) => {
  const { img, title, deadLine, sucBid, _id } = props;
  console.log(img);
  const imgl = Math.floor(Math.random() * img.length);
  return (
    <Section>
      <Image img={img[imgl]} className="img" onClick={() => history.push(`/product/detail/${_id}`)}>
        {/* <img src={i.img[0]} /> */}
        <Desc>
          <Title className="title">
            <Text h1>{title}</Text>
          </Title>

          <Bottom className="text">
            <TimerWrap>
              <Text h2>
                <Timer all {...props} white />
              </Text>
              <Timer timeProgress white {...props} />
            </TimerWrap>
            {/* <Currentprice>{i.currentprice}</Currentprice> */}
            <Sucbid>
              <div>
                <FontAwesomeIcon icon={faCircle} />
                <span> 최소 입찰가&ensp;</span>
              </div>
              <div className="price">
                <span className="text">&thinsp;{priceComma(sucBid)}&thinsp;</span>원&thinsp;
              </div>
            </Sucbid>
          </Bottom>
        </Desc>
        <Screen className="screen" />
      </Image>
    </Section>
  );
};

const Section = styled.div`
  .img {
    transition: all 500ms ease-in-out;
    box-shadow: 0 0 0px ${Color.Light_4};
    border: 0.5px solid ${Color.Light_4};
  }
  .price {
    transition: all 200ms ease-in-out;
  }
  :hover {
    .title {
      color: ${Color.Primary};
      text-shadow: none;
    }
    .screen {
      opacity: 0;
    }
    .img {
      box-shadow: 0 0 10px ${Color.Light_4};
      border: 0.5px solid ${Color.Light_4};
      transform: scale(1.01);
    }
    .text {
    }
    .price {
      border-radius: 16px;
      background-color: ${Color.Primary}99;
    }
  }
`;

const Desc = styled.div`
  z-index: 10;
  position: absolute;
  width: 0px;

  /* height: 500px; */
`;

const Title = styled.div`
  text-align: Left;
  width: 600px;
  color: #ffffff;
  margin: 50px 0 0 50px;
  text-shadow: 0 1.5px 10px rgba(0, 0, 0, 0.2);
`;

const Screen = styled.div`
  z-index: 12;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 30px;
  object-fit: cover;
  overflow: hidden;
  background-color: ${Color.Dark_1};
  background-position: center;
  background-size: cover;
  transition: 400ms ease-in-out;
  opacity: 0.4;
`;

const Image = styled.div`
  width: 522px;
  height: 522px;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 30px;
  object-fit: cover;
  overflow: hidden;
  background-color: ${Color.Light_1};
  background: url(${(props) => props.img}) no-repeat;
  background-position: center;
  background-size: cover;

  /* background-color: #00000022; */
`;

const Bottom = styled.div`
  position: absolute;

  display: flex;
  top: 500px;
  width: 700px;
  height: min-content;
  justify-content: space-between;
  padding: 50px;
`;

const TimerWrap = styled.div`
  width: max-content;

  display: flex;
  flex-direction: column;
  align-self: flex-end;

  text-shadow: 0 1.5px 10px rgba(0, 0, 0, 0.25);
`;

const Sucbid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: flex-end;

  color: #ffffff;
  font-size: 35px;
  font-weight: 700;
  span {
    font-size: 20px;
    font-weight: 500;
  }

  text-shadow: 0 1.5px 10px rgba(0, 0, 0, 0.25);

  .text {
    display: inline-block;
    font-size: 40px;
    font-weight: 700;
    vertical-align: -2px;
  }
  & > div > {
    svg {
      align-items: center;
      vertical-align: 0.2px;
      font-size: 15px;
      color: ${Color.Primary};
    }
  }
`;

// const Currentprice = styled.div``;
const Deadline = styled.div`
  width: 252px;
  text-shadow: 0 1.5px 10px rgba(0, 0, 0, 0.25);
`;

export default MainCard;
