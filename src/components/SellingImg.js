import React from 'react';
import styled from 'styled-components'

import { history } from "../redux/configureStore";



const SellingImg = (props) => {
    const {img, _id} = props;
    return (
        <MyImage img={img} onClick={() => history.push(`/product/detail/${_id}`)} />
    );
};

const MyImage = styled.div`
width : 218px;
height : 218px;
background : #dadada;
border-radius: 16px;
box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16);
`;

export default SellingImg;