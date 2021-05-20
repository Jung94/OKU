import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

import { Timer } from "components/";
import { priceComma } from "shared/common";
import { history } from "../redux/configureStore";

import { Color } from "shared/DesignSys";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return isDesktop ? children : null;
};

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  return isTablet ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

const MainCard = (props) => {
  const { img, title, deadLine, sucBid, _id } = props;
  console.log(img);
  const imgl = Math.floor(Math.random() * img.length);
  return (
    <>
      <Desktop>
        <Section>
          <Image img={img[imgl]} className="img" onClick={() => history.push(`/product/detail/${_id}`)}>
            {/* <img src={i.img[0]} /> */}
            <Desc>
              <Title className="title">
                <Text h0> {title} </Text>
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
      </Desktop>

      <Mobile>
        <Section>
          <Image img={img[imgl]} className="img" onClick={() => history.push(`/product/detail/${_id}`)}>
            {/* <img src={i.img[0]} /> */}
            <Desc>
              <Title className="title">
                <Text h1>{title}</Text>
              </Title>

              <MobileTimerSucbid className="text">
                <Text h2>
                  <Timer all {...props} white />
                </Text>
                <Timer timeProgress white {...props} />
                {/* <Currentprice>{i.currentprice}</Currentprice> */}
                <div className="price">
                  <span className="text">&thinsp;{priceComma(sucBid)}&thinsp;</span>원&thinsp;
                </div>
              </MobileTimerSucbid>
            </Desc>
            <Screen className="screen" />
          </Image>
        </Section>
      </Mobile>
    </>
  );
};

const H0 = "40px";
const H1 = "30px";
const H2 = "20px";
const Body = "14px";
const Sub = "12px";

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
      border-radius: 12px;
      background-color: ${Color.Primary}99;
    }
  }
  @media only screen and (max-width: 767px) {
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
  }
`;

const Desc = styled.div`
  z-index: 10;
  position: absolute;
  width: 0px;

  /* height: 500px; */
`;

const Image = styled.div`
  width: 550px;
  height: 550px;
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

  @media only screen and (max-width: 767px) {
    width: 332px;
    height: 332px;
    border-radius: 30px;
    background-position: center;
    background-size: cover;
    overflow: hidden;
  }
`;

const Title = styled.div`
  text-align: Left;
  color: #ffffff;
  margin: 40px 0 0 40px;
  text-shadow: 0 1.5px 10px rgba(0, 0, 0, 0.2);

  display: flex;
  width: 470px;

  @media only screen and (max-width: 767px) {
    width: 300px;
    font-size: 10px;
    margin: 20px 0 0 20px;
    color: #ffffff;
  }
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

const Bottom = styled.div`
  position: absolute;

  display: flex;
  top: 370px;
  width: 470px;
  margin: 40px;
  height: min-content;
  justify-content: space-between;

  @media only screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    top: 215px;
    width: 290px;
    margin: 20px;
    background-color: blue;
  }
`;

const TimerWrap = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  text-align: left;
  max-width: 200px;

  text-shadow: 0 1.5px 10px rgba(0, 0, 0, 0.25);
`;

const Sucbid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: flex-end;
  color: #ffffff;
  font-size: ${H1};
  font-weight: 700;
  text-align: right;
  span {
    text-align: right;
    font-size: ${H2};
    font-weight: 500;
  }

  text-shadow: 0 1.5px 10px rgba(0, 0, 0, 0.25);

  .text {
    display: inline-block;
    font-size: ${H0};
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

const MobileTimerSucbid = styled.div`
  width: max-content;

  display: flex;
  flex-direction: column;
  align-self: flex-end;
  max-width: 200px;
  font-weight: 700;

  margin-top: 130px;
  margin-left: 20px;
  position: absolute;

  color: #ffffff;

  text-shadow: 0 1.5px 10px rgba(0, 0, 0, 0.25);
  font-size: ${H2};

  .text {
    font-size: ${H1};
    display: inline-block;
  }
  :hover {
    /* color: ${Color.Primary}; */
  }
`;

export default MainCard;
