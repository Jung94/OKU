import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import Slider from "react-slick";

// 왼쪽
function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <LeftArrow
      className={className}
      style={{
        ...style,
        display: "block",
        zIndex: "999",
        content: "url(https://1.bp.blogspot.com/-7PhKE4M-Mwg/YIv7w9pC5fI/AAAAAAAAPH8/9vEdlaUKVTU8WiUroBNl0V7XYBAtgcvNACLcBGAsYHQ/s320/%25ED%258C%25A8%25EC%258A%25A4%2B1.png)",
      }}
      onClick={onClick}
    />
  );
}
// 오른쪽
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <RightArrow
      className={className}
      style={{
        ...style,
        display: "block",
        zIndex: "999",
        content: "url(https://1.bp.blogspot.com/-zPYogI0ZcvA/YIv7xIest9I/AAAAAAAAPIA/Voq7TwepcsMjFb5EqjEXEf29wFPB9aM9gCLcBGAsYHQ/s320/%25ED%258C%25A8%25EC%258A%25A4%2B2.png)",
      }}
      onClick={onClick}
    />
  );
}

// 실시간 인기상품
const Container = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.getPopularProductsAPI());
  }, []);
  const _popular_product = useSelector((state) => state.post.popular_product);
  console.log(_popular_product)

  const { title, img, deadLine, currentprice } = props;

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    draggable: false,
    className: "center",
    centerMode: true,
    centerPadding: "25%",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Main>
      <Box>
        <div style={{ margin: "0px 50px 50px" }}>
          <Slide>
            <Slider {...settings}>
              {_popular_product.map((i, idx) => {
                return (
                  <Section key={idx}>
                    <Image>
                      <img src={i.img[0]} />
                    </Image>
                    <Desc>
                      <h2>실시간 인기상품 </h2>
                      <Title>{i.title}</Title>
                      <Deadline>경매마감까지 {i.deadLine} 남았습니다.</Deadline>
                      <Currentprice>{i.currentprice}원</Currentprice>
                    </Desc>
                  </Section>
                );
              })}
            </Slider>
          </Slide>
        </div>
      </Box>
    </Main>
  );
};

Container.defaultProps = {
  title: "나는 용현",
  img: `https://1.bp.blogspot.com/-L1wiwQpwSMk/YItec1CE7MI/AAAAAAAAPH0/BwLwXf53LIQnaTGQuE6ilAwR31wsYVwMACLcBGAsYHQ/s0/KakaoTalk_20210416_144309208.png`,
  currentprice: "10,000",
};

const LeftArrow = styled.div`
  position: absolute;
  top: 50%;
`;

const RightArrow = styled.div`
  position: absolute;
  top: 50%;
`;

const Main = styled.div`
  text-align: center;
  margin-top: 92px;
`;

const Box = styled.div`
margin: 0 auto;
`;

export const Slide = styled.div`
  margin-top: 20px;
`;
export const Section = styled.div`
  display: flex;
`;
const Desc = styled.div``;
export const Title = styled.div`
  font-size: 24px;
`;
export const Image = styled.div`
  & > img {
    ${(props) => (props.width ? `width : ${props.width};` : "width: 600px;")}
    ${(props) => (props.height ? `height : ${props.height};` : "height: 600px;")} 
    ${(props) => (props.margin ? `margin : ${props.margin};` : "margin : 0 auto;")}
    cursor : pointer;
    border-radius: 50px;
  }
`;
export const Currentprice = styled.div``;
export const Deadline = styled.div``;

export default Container;
