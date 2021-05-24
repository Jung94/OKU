import React from 'react';
import styled from 'styled-components'

import { history } from "../redux/configureStore";

import { useMediaQuery } from "react-responsive";

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

const SellingImg = (props) => {
    const {img, _id} = props;
    return (
        <>
        <Desktop>
        <MyImage img={img} onClick={() => history.push(`/product/detail/${_id}`)} />
        </Desktop>

        <Mobile>
        <MyImage img={img} onClick={() => history.push(`/product/detail/${_id}`)} />
        </Mobile>
        </>
    );
};

const MyImage = styled.div`
background-image: ${(props) => `url(${props.img})`};
background-position: center;
background-size: cover;
width : 218px;
height : 218px;
border-radius: 16px;
box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16);
@media only screen and (max-width: 767px) {
    width :150px;
    height : 150px;
}
`;

export default SellingImg;