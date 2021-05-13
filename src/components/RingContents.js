import React from 'react';
import styled from 'styled-components'

import { history } from "../redux/configureStore";
 
const RingContents = (props) => {
    const {alertType, title, productId} = props;
    return (
        <Box>
            <Desc onClick={() => history.push(`/product/detail/${productId}`)}>
                <AlertTitle>
                <TitleLeft>{alertType}</TitleLeft>
                <TitleRight>
                    1분전
                </TitleRight>
                </AlertTitle>
                <AlertCotents>{title}의 낙찰이 성사되었습니다.</AlertCotents>
            </Desc>
            <Line/>
        </Box>
    )
}

const Box = styled.div`
    cursor : pointer;

`;
const Desc = styled.div`
    margin: 9.2px 29px 9.2px 15px;
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

export default RingContents;