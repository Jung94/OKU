import React from 'react';
import styled from "styled-components";
import { Timer } from "components/";
import { priceComma } from "shared/common";

const MainCard = (props) => {
    const {img, title, deadLine, sucBid, _onClick, } = props;
    return (
            <Section onClick={_onClick}> 
                <Image style={{ backgroundImage : `url(`+ img + `)` }} >
                {/* <img src={i.img[0]} /> */}
                <Desc>
                <Title>{title}</Title>
                
                <Bottom>
                <Deadline style={{ backgroundColor: "white", padding: "5px", height: "0" }}>
                <Timer all {...props} purple />
                <Timer timeProgress {...props} />
                </Deadline>
                
                {/* <Currentprice>{i.currentprice}</Currentprice> */}
                <Sucbid >
                    <span style={{fontSize: "20px"}}> 실시간 입찰가</span>
                    {priceComma(sucBid)}원
                </Sucbid>
                
                </Bottom>
            </Desc>
            </Image>
            </Section>
    );
}

const Section = styled.div`
`;
const Desc = styled.div`
z-index : 10;
position: absolute;
`;
const Title = styled.div`
  text-align : Left;
  font-size: 45px;
  font-weight: 500;
  color : #ffffff;
  margin : 62px 0 0 50px;
`;
const Image = styled.div`
    width: 700px;
    height: 700px;
    margin: 0 auto;
    cursor: pointer;
    border-radius: 50px;
`;
const Bottom = styled.div`
display :flex;
width : 600px;
justify-content : space-between;
margin : 450px 55px 44px 50px;
`;
// const Currentprice = styled.div``;
const Deadline = styled.div`
width : 252px;
`;
const Sucbid = styled.div`
font-size : 35px;
display :flex;
flex-direction : column;
text-align : right;
color : #ffffff;
`;

export default MainCard;
