import React from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { Timer } from "components/";
import { priceComma } from "shared/common";
import { history } from "../redux/configureStore";

const MainCard = (props) => {

    const {img, title, deadLine, sucBid, _id } = props;
    return (
            <Section onClick={() => history.push(`/product/detail/${_id}`)}> 
                <Image style={{ backgroundImage : `url(`+ img + `)` }} >
                {/* <img src={i.img[0]} /> */}
                <Desc>
                <Title>{title}</Title>
                
                <Bottom>
                <div style={{ backgroundColor: "white", padding: "5px", height: "0" }}>
                    <Timer all {...props} purple />
                    <Timer timeProgress {...props} />
                </div>
                {/* <Currentprice>{i.currentprice}</Currentprice> */}
                <Sucbid >
                    <span style={{fontSize: "20px", textShadow: "0 1.5px 3px rgba(0, 0, 0, 0.16)"}}> 실시간 입찰가</span>
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
    text-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.16);
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
position : relative;
`;
// const Currentprice = styled.div``;
const Deadline = styled.div`
width : 252px;
text-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.16);
`;
const Sucbid = styled.div`
font-size : 35px;
display :flex;
flex-direction : column;
text-align : right;
color : #ffffff;
text-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.16);
`;  

export default MainCard;