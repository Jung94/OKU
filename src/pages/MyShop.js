import React, { useEffect } from "react";
import styled from "styled-components";
import { Input, Line, Button, Tag, Modal, Text, Profile } from "elements/"


import Selling from "components/myshop/Selling"
import ShopInfomation from "components/myshop/ShopInfo"
import Review from "components/myshop/Review";


const MyShop = () => {

    return (
    <Wrap>
        <Backgound>
        </Backgound>
        <ShopInfomation/>
        <Selling/>
        <Review/>
    </Wrap>
    );
};


const Wrap = styled.div`
margin : 0px 0px 132px 0px;
`;

const Backgound = styled.div`
width : 100%;
height : 280px;
background : #eee;
`;


export default MyShop;