import React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import Slider from "react-slick";

import RelatedProduct from "components/global/RelatedProduct";
import { history } from "redux/configureStore";

import { Color } from "shared/DesignSys";
import leftIcon from "images/chevronLeftSolid.svg";
import rightIcon from "images/chevronRightSolid.svg";

function PrevArrow(props) {
    const { className, style, onClick, lowBid } = props;
    return (
        <LeftArrow
        className={className}
        style={{
            ...style,
            display: "block",
            zIndex: "999",
            left: "1%",
            color: Color.Dark_4,
            fontSize: "7rem",
            content: `url(${leftIcon})`,
        }}
        onClick={onClick}
        />
);
}

    // 오른쪽
function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <RightArrow
        className={className}
        style={{
            ...style,
            display: "block",
            zIndex: "999",
            right: "1%",
            color: Color.Dark_4,
            fontSize: "5rem",
            content: `url(${rightIcon})`,
        }}
        onClick={onClick}
        />
);
}

const Steam = () => {
    const dispatch = useDispatch();

    
    const settings = {
        infinite: true, // 마지막 장 다음에 첫번째가 나오게 할 것인지
        speed: 500, // 넘어가는 속도는 몇으로 할 것인지
        slidesToShow: 4, 
        slidesToScroll: 1,
        arrow : true,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
};

    const my_like_list = useSelector((state) => state.like.my_like_list);
    return (
        <Wrap>
            <Text h2 textAlign="left">
            찜 목록
            </Text>
        <Box>
            {my_like_list && my_like_list.length > 0 ? (
            <>
                <List>
                <Slider {...settings}>
                {my_like_list.map((r, idx) => (
                    <RelatedProduct
                    like
                    key={idx}
                    _id={r.productId}
                    img={r.productImage}
                    _onClick={() => {
                        history.push(`/product/detail/${r.productId}`);
                    }}
                    />
                ))}
                </Slider>
                </List>
            </>
            ) : (
            <Text h4 color={Color.Dark_4}>
                찜한 상품이 없습니다.
            </Text>
            )}
        </Box>
    </Wrap>
    );
};

const Wrap = styled.div`
    max-width: 1030px;
    width: 100%;
    min-height: 180px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    margin-top : 129px;
`;

const Box = styled.div`
    width: 100%;
    min-height: 180px;
    padding: 10px;
    display: flex;
    background-color: ${Color.Light_1};
    border-radius: 16px;
`;

const List = styled.div`
    justify-content: space-between;
    width: 100%;

    div {
    margin: 2px auto 2px;
    text-align: center;
  }
`;
const LeftArrow = styled.div`
position: absolute;
`;

const RightArrow = styled.div`
position: absolute;
`;

export default Steam;
