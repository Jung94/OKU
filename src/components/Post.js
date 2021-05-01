import React from 'react';
import styled from "styled-components";
import {Slide, Section, Title,  Image, Currentprice, Deadline} from "components/Container"


import T_1 from "images/T_1.jpg"
import T_2 from "images/T_2.jpeg"
import T_3 from "images/T_3.jpg"
import T_4 from "images/T_4.jpg"
import T_5 from "images/T_5.jpeg"
import T_6 from "images/T_6.jpeg"
import T_7 from "images/T_7.jpg"

import Slider from "react-slick";

// MD 추천
const Post = (props) => {
    const {
        title,
        img,
        currentprice,
        desc

    } = props;

    const settings = {
        dots: true,
        arrows:false,
        fade : true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
    }
    return (
        <Wrap>
            <Slide>
                <Slider {...settings}>
                    <Section>
                        <Information>
                        <Image width="300px" height="300px" margin="40px 40px;">
                            <img src={T_5} />
                        </Image>
                        <Desc>
                            <div>
                        <h2>{desc}</h2>
                            </div>
                        <Title>
                            프라이탁 하와이파이브오 
                        </Title>
                        <Deadline>
                            경매마감까지 00 : 57 : 30 초 남았습니다
                        </Deadline>
                        <Currentprice>
                            198,000원
                        </Currentprice>
                        </Desc>
                        </Information>
                    </Section>

                    <Section>
                        <Information>
                        <Image  width="300px" height="300px" margin="40px 40px;">
                            <img src={T_6} />
                        </Image>
                        <Desc>
                        <div>
                            <h2>{desc}</h2>
                        </div>
                        <Title>
                            프라이탁 페테
                        </Title>
                        <Deadline>
                            경매마감까지 00 : 57 : 30 초 남았습니다
                        </Deadline>
                        <Currentprice>
                            295,000원
                        </Currentprice>
                        </Desc>
                        </Information>
                    </Section>

                    <Section>
                        <Information>
                        <Image  width="300px" height="300px" margin="40px 40px;">
                            <img src={T_7} />
                        </Image>
                        <Desc>
                        <div>
                            <h2>{desc}</h2>
                        </div>
                        <Title>
                            프라이탁 제품 3종
                        </Title>
                        <Deadline>
                            경매마감까지 00 : 57 : 30 초 남았습니다
                        </Deadline>
                        <Currentprice>
                            138,000원
                        </Currentprice>
                        </Desc>
                        </Information>
                    </Section>

                </Slider>
            </Slide>
        </Wrap>
    )
}
Post.defaultProps = {
    desc : "MD 추천 아이템"
}


const Wrap = styled.div`
margin : 0 auto;
max-width : 1030px;
height : 415px;
background : #FCCCD4;

`;

export const Information = styled.div`
display : flex;
`;

export const Desc  = styled.div`
margin-top : 100px;
text-align : left;
`;


export default Post;
