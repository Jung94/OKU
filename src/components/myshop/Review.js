import React, { useEffect } from 'react';
import styled from "styled-components";

import { Input, Line, Button, Tag, Modal, Text, Profile } from "elements/"
import DetailRing from 'components/DetailRing';


import { useDispatch, useSelector } from "react-redux";

const Review = () => {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(shopActions.getShopDescAPI());
    // }, []);

    //   const ShopDesc = useSelector((state) => state.post.desc_shop);

    return (
        <Wrap>
            <ReviewInfo>
                <Head>
                <Text h1 textAlign="left">
                    내 상점 후기
                </Text>
                </Head>
                <Detail>
                    <InnerBox>
                        <Nickname>
                            최용현
                        </Nickname>
                        <Content>
                            친절하네요
                        </Content>
                    </InnerBox>
                </Detail>
            </ReviewInfo>
        </Wrap>


    );
};

const Wrap = styled.div`
    max-width: 1030px;
    margin: 239px auto 0;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    co

    @media only screen and (max-width: 767px) {
    }
`;

const ReviewInfo = styled.div`
justify-content: space-between;
width : 100%;
height : 250px;
`;

const Head = styled.div`
justify-content: space-between;
display :flex;
align-items: flex-end;
`;

const Detail = styled.div`
width : 100%;
margin-top : 19px;
background : #f8f8f8;
min-height : 172px;
max-height : 500px;
border-radius: 16px;
box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16);
padding : 20px 63px ;
`;

const InnerBox = styled.div`
display : flex;
flex-direction : column;
text-align : left;
justify-content: space-between;
width : 100%;
margin-top : 19px;
background : #ffffff;
min-height : 89px;
max-height : 380px;
border-radius: 16px;
box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16);
padding : 10px 19px;
gap : 15px;
`;
const Nickname = styled.div`
font-size : 16px;
`;
const Content = styled.div`
font-size : 14px;
`;


export default Review;