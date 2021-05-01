import React from "react";
import styled from "styled-components";
import {Slide, Section, Title,  Image, Currentprice, Deadline} from "components/Container"
import Slider from "react-slick";

import T_1 from "images/T_1.jpg"
import T_2 from "images/T_2.jpeg"
import T_3 from "images/T_3.jpg"
import T_4 from "images/T_4.jpg"
import T_5 from "images/T_5.jpeg"
import T_6 from "images/T_6.jpeg"
import T_7 from "images/T_7.jpg"

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "block", width : "15px", margin : "0 5px",zIndex : '1', content : "url(https://lh3.googleusercontent.com/-wYKZN7vWqEQ/YIhJGNP9-TI/AAAAAAAAPHk/QcGq6GAj57Yy3IJZ4vU8W5c_aKC-ZYEOwCLcBGAsYHQ/Right_2.png)"}}
        onClick={onClick}
        />
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "block", width : "15px",margin : "0 0 0 5px", content : "url(https://lh3.googleusercontent.com/-0oSZLhu_OCI/YIhJGLxZmSI/AAAAAAAAPHo/0GISg_LjRY8XlReu0kv48mEvEqhRici1QCLcBGAsYHQ/Left_2.png)"}}
        onClick={onClick}
        />
    );
}

// 마감임박상품
const DeadlineP = (props) => {
    const {
        title,
        img,
        currentprice

    } = props;

    const settings = {
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: false,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />  
    }
    return (    
        <Box>
            <h2>마감 임박상품</h2>
                <Slide>
                <Slider {...settings}>
                    <Section>
                        <Image width="300px" height="300px" >
                            <img src={T_5} />
                        </Image>
                        <Title>
                            프라이탁 하와이파이브오 
                        </Title>
                        <Deadline>
                            마감까지 00 : 57 : 30 초!
                        </Deadline>
                        <Currentprice>
                            198,000원
                        </Currentprice>
                    </Section>

                    <Section>
                        <Image  width="300px" height="300px">
                            <img src={T_6} />
                        </Image>
                        <Title>
                            프라이탁 페테
                        </Title>
                        <Deadline>
                            마감까지 00 : 57 : 30 초!
                        </Deadline>
                        <Currentprice>
                            295,000원
                        </Currentprice>
                    </Section>

                    <Section>
                        <Image  width="300px" height="300px">
                            <img src={T_7} />
                        </Image>
                        <Title>
                            프라이탁 제품 3종
                        </Title>
                        <Deadline>
                            마감까지 00 : 57 : 30 초!
                        </Deadline>
                        <Currentprice>
                            138,000원
                        </Currentprice>
                    </Section>

                    <Section>
                        <Image  width="300px" height="300px">
                            <img src={T_5} />
                        </Image>
                        <Title>
                            프라이탁 하와이파이브오 블랙
                        </Title>
                        <Deadline>
                            마감까지 00 : 57 : 30 초!
                        </Deadline>
                        <Currentprice>
                            295,000원
                        </Currentprice>
                    </Section>

                    <Section>
                        <Image  width="300px" height="300px">
                            <img src={T_4} />
                        </Image>
                        <Title>
                            프라이탁 키링
                        </Title>
                        <Deadline>
                            마감까지 00 : 57 : 30 초!
                        </Deadline>
                        <Currentprice>
                            138,000원
                        </Currentprice>
                    </Section>

                    <Section>
                        <Image width="300px" height="300px">
                            <img src={T_3} />
                        </Image>
                        <Title>
                            프라이탁 문의주세요 
                        </Title>
                        <Deadline>
                            마감까지 00 : 57 : 30 초!
                        </Deadline>
                        <Currentprice>
                            198,000원
                        </Currentprice>
                    </Section>

                    <Section>
                        <Image  width="300px" height="300px">
                            <img src={T_2} />
                        </Image>
                        <Title>
                            프라이탁 3종 제품
                        </Title>
                        <Deadline>
                            마감까지 00 : 57 : 30 초!
                        </Deadline>
                        <Currentprice>
                            295,000원
                        </Currentprice>
                    </Section>

                    <Section>
                        
                        <Image  width="300px" height="300px">
                            <img src={T_1} />
                        </Image>
                        <Title>
                            프라이탁 아이패드 슬리브
                        </Title>
                        <Deadline>
                            마감까지 00 : 57 : 30 초 !
                        </Deadline>
                        <Currentprice>
                            138,000원
                        </Currentprice>
                    </Section>
                </Slider>
            </Slide>
        </Box>
    )
}

const Box = styled.div`
margin : 30px auto;
max-width : 1030px;
height : 460px;
background : #eee;
`;


export default DeadlineP