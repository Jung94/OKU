import React, { useState, useEffect }  from 'react';
import styled from 'styled-components';
import { Input, Line, Button, Tag, Modal, Text, Profile } from "elements/"

import { actionCreators as shopActions } from "redux/modules/myshop";
import { useDispatch, useSelector } from "react-redux";

const Selling = () => {
    const dispatch = useDispatch();
    const SellingProduct = useSelector((state) => state.myshop.Product_selling);
    
    useEffect(() => {
        dispatch(shopActions.getMyProductAPI());
    }, []);
    return (
        <Wrap>
            <SellInfo>
                <Head>
                    <Text h1 textAlign="left">
                        판매상품
                    </Text>
                    <More>
                        더보기
                    </More>
                </Head>
                <Detail>
                        <List>
                            <MyImage/>
                            <MyImage/>
                            <MyImage/>
                            <MyImage/>
                        </List>
                </Detail>
            </SellInfo>
        </Wrap>
    );
};

const H2 = "20px";
const Body = "14px";
const Sub = "12px";

const Wrap = styled.div`
    max-width: 1030px;
    margin: 129px auto 100px;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    text-align: center;
    align-items: center;
    justify-content: space-between;

    @media only screen and (max-width: 767px) {
    }
`;

const SellInfo = styled.div`
justify-content: space-between;
width : 100%;
height : 250px;
`;

const Head = styled.div`
justify-content: space-between;
display :flex;
align-items: flex-end;
`;
const More = styled.div`
justify-content: space-between;
display :flex;
align-items: flex-end;
`;


const Detail = styled.div`
width : 100%;
margin-top : 19px;
background : #f8f8f8;
min-height : 301px;
border-radius: 16px;
box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16);
padding : 43px 55px;
`;

const List = styled.div`
display : grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
column-gap: 16px;
row-gap : 21px;

`;
const MyImage = styled.div`
width : 218px;
height : 218px;
background : #dadada;
border-radius: 16px;
box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16);
`;

export default Selling;