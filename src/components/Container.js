import React from 'react';
import styled from 'styled-components';

import Slider from "react-slick";

import Pig_1 from "images/pig_1.jpg"
import Pig_2 from "images/pig_2.jpg"
import Pig_3 from "images/pig_3.jpg"


const Container = (props) => {
    const settings = {
        // 아래 dots 줄 것인가
        dots: true,
        // 좌우 화살표 줄 것인가
        arrows: true,
        // 마지막 슬라이드에서 처음 슬라이스로
        infinite: true,
        // 속도
        speed: 500,
        // 한 번에 스크롤 몇 개 보여줄 건가(대개 1을 사용함)
        slidesToShow: 1,
        // 스크롤 할 때마다 몇 장씩 넘길 것인가
        slidesToScroll: 1,
        // 자동 넘김을 할 것인가. 한다면 스피드는?
        autoplay: false,
        autoplaySpeed: 2500,
        // 화면에 올리면 슬라이더가 자동으로 넘어가지 않음
        pauseOnHover: true,
    }
    return (
        <Main>
            <Slide>
                <Slider {...settings}>
                    <Section>
                        <Title>
                            미니돼지
                        </Title>
                        <Image>
                            <img style ={{width: "300px", height:'300px'}} src={Pig_1}/>
                        </Image>
                        <Seller>
                            최용현
                        </Seller>
                        <Lowbid>
                            1,000원
                        </Lowbid>
                        <Category>
                            피규어
                        </Category>
                        <Deadline>
                            00 : 57 : 30 초 남았습니다
                        </Deadline>
                    </Section>
                    <Section>
                        <Title>
                            미니돼지2
                        </Title>
                        <Image>
                            <img style ={{width: "300px", height:'300px'}} src={Pig_2}/>
                        </Image>
                        <Seller>
                            최용현
                        </Seller>
                        <Lowbid>
                            2,000원
                        </Lowbid>
                        <Category>
                            피규어
                        </Category>
                        <Deadline>
                            00 : 57 : 30 초 남았습니다
                        </Deadline>
                    </Section>
                    <Section>
                    <Deadline>
                            경매마감까지 <br/>
                            00 : 57 : 30 초 남았습니다
                        </Deadline>
                        <Image>
                            <img style ={{width: "300px", height:'300px'}} src={Pig_3} />
                        </Image>
                        <Title>
                            최용현을 팝니다
                        </Title>
                        <Seller>
                            최용현
                        </Seller>
                        <Lowbid>
                            2,000원
                        </Lowbid>
                        <Category>
                            피규어
                        </Category>
                    </Section>
                    <Section>
                        <h3>4번째 섹션</h3>
                    </Section>
                    <Section>
                        <h3>5번째 섹션</h3>
                    </Section>
                    <Section>
                    <h3>6번째 섹션</h3>
                    </Section>
                </Slider>
            </Slide>
            
        </Main>
    )
};

const Main = styled.div`
    height : 700px;
    background : #FAF1D6;
    border: 1px solid #000;
`;


const Slide = styled.div`
    border: 1px solid #000;
`;
const Section= styled.div`
text-align : center;
`;

const Title = styled.div`
`;
const Image = styled.div`

    & > img {
        margin : 0 auto;
    }
`;
const Seller = styled.div`
`;
const Lowbid = styled.div`
`;
const Category = styled.div`
`;
const Deadline = styled.div`
`;

export default Container;