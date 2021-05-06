import React from "react";
import styled from "styled-components";
import FLogo from 'images/FooterLogo.png'

const Footer = (props) => {
    return (
        <AboutUs>
            <Main>
            <Image>
                <img src={FLogo} />
            </Image>
            <Slogan>
                0부터 9까지 모든 It's OK! OKU
            </Slogan>

            </Main>
        </AboutUs>
    )
};

const AboutUs = styled.div`
height: 151px;
background : #f5f5f5;
max-width: 1920px;
`;

const Main = styled.div`
display : flex;
justify-content: space-between;
margin : 0 auto;
width : 1400px;

`;
const Slogan =styled.div`
font-size : 20px;
color : #a7a7a7;
margin-top : 59px;
`;

const Image = styled.div`

margin : 55px 0 0 0;
& > img{
width: 105.2px;
height : 52.6px;
}
`;

export default Footer;
