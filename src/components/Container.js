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
        left : "25%",
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
        right : "25%",
        content: "url(https://1.bp.blogspot.com/-zPYogI0ZcvA/YIv7xIest9I/AAAAAAAAPIA/Voq7TwepcsMjFb5EqjEXEf29wFPB9aM9gCLcBGAsYHQ/s320/%25ED%258C%25A8%25EC%258A%25A4%2B2.png)",
      }}
      onClick={onClick}
    />
  );
}

function _PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <_LeftArrow
      className={className}
      style={{
        ...style,
        display: "block",
        zIndex: "999",
        left : "15%",
        content: "url(https://1.bp.blogspot.com/-7PhKE4M-Mwg/YIv7w9pC5fI/AAAAAAAAPH8/9vEdlaUKVTU8WiUroBNl0V7XYBAtgcvNACLcBGAsYHQ/s320/%25ED%258C%25A8%25EC%258A%25A4%2B1.png)",
      }}
      onClick={onClick}
    />
  );
}

function _NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <_RightArrow
      className={className}
      style={{
        ...style,
        display: "block",
        zIndex: "999",
        right : "15%",
        content: "url(https://1.bp.blogspot.com/-zPYogI0ZcvA/YIv7xIest9I/AAAAAAAAPIA/Voq7TwepcsMjFb5EqjEXEf29wFPB9aM9gCLcBGAsYHQ/s320/%25ED%258C%25A8%25EC%258A%25A4%2B2.png)",
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow_(props) {
  const { className, style, onClick } = props;
  return (
    <LeftArrow_
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

function NextArrow_(props) {
  const { className, style, onClick } = props;
  return (
    <RightArrow_
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

  // 렌더될 때 ~ 한다
  useEffect(() => {
    // useEffect 랑 친한 얘
    dispatch(postActions.getPopularProductsAPI());
  }, []);
  const _popular_product = useSelector((state) => state.post.popular_product);

  const { title, img, deadLine, currentprice } = props;

  const settings = {
    dotsClass: "slick-dots slick-thumb",
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    draggable: false,
    className: "center",
    centerMode: true,
    centerPadding: "23%",
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,

    responsive: [ // 반응형 웹 구현 옵션
      {
        breakpoint: 1550, // 화면 사이즈 1200px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: <_NextArrow/>,
          prevArrow: <_PrevArrow/>,
        }
    },
      {
          breakpoint: 1200, // 화면 사이즈 1200px
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextArrow_/>,
            prevArrow: <PrevArrow_/>,
          }
      },
    ]
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
                      <Title>{i.title}</Title>
                    </Image>
                    <Desc>
                      <Deadline>경매마감까지 {i.deadLine} 남았습니다.</Deadline>
                      <Currentprice>{i.currentprice}원</Currentprice>
                      <Sucbid>{i.sucBid}원</Sucbid>
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

const _LeftArrow = styled.div`
  position: absolute;
  top: 50%;
`;

const _RightArrow = styled.div`
  position: absolute;
  top: 50%;
`;

const LeftArrow_ = styled.div`
  position: absolute;
  top: 50%;
`;

const RightArrow_ = styled.div`
  position: absolute;
  top: 50%;
`;
const Main = styled.div`
  text-align: center;
  margin: 242px 0;
  .slick-dots li button:before {
      color : #AE00FF;
  }

`;

const Box = styled.div`
`;

const Slide = styled.div`
  
`;
const Section = styled.div`
  display: flex;
`;
const Desc = styled.div`

`;
const Title = styled.div`
  font-size: 45px;
  margin 0 0 0 100px;
  height : 64px;
  font-weight: bold;
  text-align : left;
  top : 30%;
  width: 300px;
  position : relative;
`;
const Image = styled.div`
overflow : hidden;
  & > img {
    position : relative;
    width: 700px;
    height: 700px; 
    margin : 0 auto;
    cursor : pointer;
    border-radius: 50px;
  }
  // & : hover {
  //   transform : scale(1.05);
  //   transition : transform 0.5s;
  // }
`;
const Currentprice = styled.div``;
const Deadline = styled.div``;
const Sucbid = styled.div`
`;

export default Container;
