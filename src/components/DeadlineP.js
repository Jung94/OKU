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
        style={{ ...style, display: "block", width : "15px", margin : "0 5px",zIndex : '1', content : "url(https://1.bp.blogspot.com/-h_s3Bjrcw84/YIf7ZRav-eI/AAAAAAAAPHA/VfoAtzu6CTsXNbBvR6b5Hb6T9i-qB5YrQCLcBGAsYHQ/s63/%25ED%258C%25A8%25EC%258A%25A4%2B5.png)"}}
        onClick={onClick}
        />
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "block", width : "15px",margin : "0 0 0 5px", content : "url(https://1.bp.blogspot.com/-BYqk1dJWzyc/YIf7Zcj00oI/AAAAAAAAPG8/g36K75wjqZ0BLxqgwUDgGTJuiuofQhKyACLcBGAsYHQ/s63/%25ED%258C%25A8%25EC%258A%25A4%2B6.png)"}}
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
        // 좌우 화살표 줄 것인가
        arrows: true,
        // 마지막 슬라이드에서 처음 슬라이스로
        infinite: true,
        // 속도
        speed: 500,
        // 한 번에 스크롤 몇 개 보여줄 건가(대개 1을 사용함)
        slidesToShow: 3,
        // 스크롤 할 때마다 몇 장씩 넘길 것인가
        slidesToScroll: 3,
        // 자동 넘김을 할 것인가. 한다면 스피드는?
        autoplay: false,
        autoplaySpeed: 2500,
        // 화면에 올리면 슬라이더가 자동으로 넘어가지 않음
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