import React from 'react';
import styled from "styled-components";

import Seller_Selling from "components/sellershop/Seller_Selling"
import Seller_ShopInfomation from "components/sellershop/Seller_ShopInfo"
import Seller_Review from "components/sellershop/Seller_Review";

const SellerShop = () => {
    return (
        <Wrap>
        <Seller_ShopInfomation/>
        <Seller_Selling/>
        <Seller_Review/>
        </Wrap>
    );
};

const Wrap = styled.div`
margin : 0px 0px 132px 0px;
`;



export default SellerShop;