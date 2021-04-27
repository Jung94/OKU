import React from 'react';
import styled from 'styled-components';
import { history } from "../redux/configureStore";

import Slider from "react-slick";

import T_1 from "images/T_1.jpg"
import T_2 from "images/T_2.jpeg"
import T_3 from "images/T_3.jpg"
import T_4 from "images/T_4.jpg"
import T_5 from "images/T_5.jpeg"
import T_6 from "images/T_6.jpeg"
import T_7 from "images/T_7.jpg"
import { flatMap } from 'lodash';

// 왼쪽
function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "block", background: "red",zIndex : "1" }}
        onClick={onClick}
        />
    );
}
// 오른쪽
function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "block", background: "#111",  zIndex : "1"}}
        onClick={onClick}
        />
    );
}

// 실시간 인기상품
const Container = (props) => {
    const {
        title,
        img,
        currentprice

    } = props;

    const settings = {
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
        draggable : false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />  
        
    };
    return (
        <Main>
            
            <div style={{margin : "0px 50px 50px"}}>
            <Slide>
                <Slider {...settings}>
                    <Section>
                        <Image>
                            <img src={T_1} />
                            <Desc>
                            <h2>실시간 인기상품 </h2>
                            <Title>
                            프라이탁 아이패드 슬리브
                        </Title>
                        <Deadline>
                            경매마감까지 00 : 57 : 30 초 남았습니다
                        </Deadline>
                        <Currentprice>
                            138,000원
                        </Currentprice>
                        </Desc>
                        </Image>
                        
                    </Section>

                    <Section>
                        <Image>
                            <img src={T_2} />
                        </Image>
                        
                        <Title>
                            프라이탁 케이크백 
                        </Title>
                        <Deadline>
                            경매마감까지 00 : 57 : 30 초 남았습니다
                        </Deadline>
                        <Currentprice>
                            140,000원
                        </Currentprice>
                    </Section>

                    <Section>
                        <Image>
                            <img src={T_3} />
                        </Image>
                        <Title>
                            프라이탁 모음 문의주세요
                        </Title>
                        <Deadline>
                            경매마감까지 00 : 57 : 30 초 남았습니다
                        </Deadline>
                        <Currentprice>
                            0원
                        </Currentprice>
                    </Section>
                    
                    <Section>
                        <Image>
                            <img src={T_4} />
                        </Image>
                        <Title>
                            프라이탁 키링 
                        </Title>
                        <Deadline>
                            경매마감까지 00 : 57 : 30 초 남았습니다
                        </Deadline>
                        <Currentprice>
                            20,000원
                        </Currentprice>
                    </Section>

            </Slider>
            </Slide>
            </div>
        </Main>
    )
};

// Container.defaultProps = {
//     title : "",
//     img : "",
//     currentprice : ""
// }

const Main = styled.div`
text-align : center;
`;


export const Slide = styled.div`
margin-top : 20px;
`;
export const Section= styled.div`
display : flex;

`;
const Desc = styled.div`
text-align : left
margin : 0px 0px 600px 0px;
`;
export const Title = styled.div`
font-size : 24px;
`;
export const Image = styled.div`
    & > img {
        ${(props)=>props.width? `width : ${props.width};` : "width: 600px;" }
        ${(props)=>props.height? `height : ${props.height};` : "height: 600px;" } 
        ${(props)=> props.margin? `margin : ${props.margin};`: "margin : 0 auto;"}
        cursor : pointer;
    }
    
`;
export const Currentprice = styled.div`
`;
export const Deadline = styled.div`
`;

export default Container;