import React from 'react';
import styled from 'styled-components'

import { history } from "../redux/configureStore";

import moment from "moment";
import 'moment/locale/ko'

const RingContents = (props) => {
    const {alertType, productTitle, productId, creatAt} = props;
    return (
        <Box>
            <Desc onClick={() => history.push(`/product/detail/${productId}`)}>
                <AlertTitle>
                <TitleLeft>{alertType}</TitleLeft>
                <TitleRight>
                {moment(creatAt).fromNow()}
                </TitleRight>
                </AlertTitle>
                <AlertCotents>"{productTitle}"의 낙찰이 성사되었습니다.</AlertCotents>
                <Chatting>거래 채팅 진행하기</Chatting>
            </Desc>
            <Line/>
        </Box>
    )
}

const Box = styled.div`

`;
const Desc = styled.div`
    margin: 9.2px 29px 9.2px 15px;
    
    cursor : pointer;
`;


const AlertTitle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TitleLeft = styled.span`
    color: #ae00ff;
    font-size: 14px;
`;
const TitleRight = styled.span`
    color: #cacaca;
    font-size: 12px;
`;
const AlertCotents = styled.div`
    color: #707070;
    font-size: 13px;
    margin-top : 3px;
    font-weight : 400;
`;
const Line = styled.div`
    border-bottom : 1px solid #d0d0d0;
    cursor : default;
`;

const Chatting = styled.button`
    display: block;
    margin: 3px auto 0;
    width: 217.8px;
    height: 25px;
    border-radius: 7px;
    color: #ffffff;
    background: #ae00ff;
    border: none;
    cursor: pointer;
    font-size: 12px;
`;

export default RingContents;