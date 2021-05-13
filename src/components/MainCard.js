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
  return (
    <Section onClick={() => history.push(`/product/detail/${_id}`)}>
      <Image style={{ backgroundImage: `url(` + img + `)` }}>
        {/* <img src={i.img[0]} /> */}
        <Desc>
          <Title>{title}</Title>

          <Bottom>
            <TimerWrap>
              <Text h2>
                <Timer all {...props} purple />
              </Text>
              <Timer timeProgress {...props} />
            </TimerWrap>
            {/* <Currentprice>{i.currentprice}</Currentprice> */}
            <Sucbid>
              <div>
                <FontAwesomeIcon icon={faCircle} />
                <span style={{ fontSize: "20px", textShadow: "0 1.5px 3px rgba(0, 0, 0, 0.16)" }}> 실시간 입찰가</span>
              </div>
              {priceComma(sucBid)}원
            </Sucbid>
          </Bottom>
        </Desc>
      </Image>
    </Section>
  );
};

const Section = styled.div``;
const Desc = styled.div`
  z-index: 10;
  position: absolute;
  width: 600px;
`;
const Title = styled.div`
  text-align: Left;
  font-size: 45px;
  font-weight: 500;
  color: #ffffff;
  margin: 62px 0 0 50px;
  text-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.16);
`;
const Image = styled.div`
  width: 700px;
  height: 700px;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 50px;
  object-fit: cover;
`;
const Bottom = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 450px 0 0 50px;
`;

// const Currentprice = styled.div``;
const Deadline = styled.div`
  width: 252px;
  text-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.16);
`;
const Sucbid = styled.div`
  font-size: 35px;
  display: flex;
  flex-direction: column;
  text-align: right;
  color: #ffffff;
  text-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.16);
  margin-bottom: 10px;
  & > div > {
    align-items: center;
    svg {
      font-size: 16px;
      color: ${Color.Primary};
      vertical-align: 0.6px;
    }
  }
`;

const TimerWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
  vertical-align: baseline;
`;

export default MainCard;
