import React from 'react';
import styled from 'styled-components'
import {Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

const Myinfo = () => {
    return (
        <Grid>
            <Head>
            <Text h2 textAlign="left">
            회원정보
            </Text>
                <Modify>수정하기</Modify>
            </Head>
            <InfoBox>
                <Info>
                    <Title>
                        닉네임
                    </Title>
                    <Blank>
                        <input/>
                    </Blank>
                </Info>
                <Info>
                    <Title>
                        아이디
                    </Title>
                    <Blank>
                        <input/>
                    </Blank>
                </Info>
                <Info>
                    <Title>
                        비밀번호
                    </Title>
                    
                    <Blank>
                        <input/>    
                    </Blank>
                </Info>
                <Info>
                    <Title>
                        전화번호
                    </Title>
                    <Blank>
                        <input/>
                    </Blank>
                </Info>
            </InfoBox>
        </Grid>
    )
}

const Grid = styled.div`

`;

const Head = styled.div`
display : flex;
justify-content : space-between;
width : 1030px;
margin : 25px auto 19px ;
`;

const Modify = styled.div`
font-size : 16px;
margin : 20px;
`;
const InfoBox = styled.div`
width : 1030px;
background : #f8f8f8;
border-radius: 16px;
`;

const Info = styled.div`
display :flex;
`;

const Title = styled.p`
font-size : 16px;
margin : 45px 70px 23.5px 55px;
`;

const Blank = styled.p`
margin-top : 25px;
& > input {
    border : 1px solid #ffffff;
    border-radius : 8px;
    width : 806px;
    height : 50px;
    font-size : 16px;
}
& : focus {
outline:none;
}

`;


export default Myinfo