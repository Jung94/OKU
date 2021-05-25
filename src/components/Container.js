import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

import MainCard from "components/MainCard";

import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import { Timer } from "components/";
import Slider from "react-slick";
import { input_priceComma } from "shared/common";

import { useMediaQuery } from "react-responsive";

import leftIcon from "images/chevronLeftSolid.svg";
import rightIcon from "images/chevronRightSolid.svg";
import { Color } from "shared/DesignSys";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return isDesktop ? children : null;
};

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  return isTablet ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

// 왼쪽
function PrevArrow(props) {
  const { className, style, onClick, lowBid } = props;
  return (
    <LeftArrow
      className={className}
      style={{
        ...style,
        display: "block",
        zIndex: "99",
        left: "30%",
        color: Color.Dark_4,
        fontSize: "5rem",
        content: `url(${leftIcon})`,
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
        zIndex: "99",
        right: "30%",
        color: Color.Dark_4,
        fontSize: "5rem",
        content: `url(${rightIcon})`,
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
        zIndex: "99",
        left: "15%",
        content: `url(${leftIcon})`,
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
        zIndex: "99",
        right: "15%",
        content: `url(${rightIcon})`,
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
        zIndex: "99",
        content: `url(${leftIcon})`,
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
        zIndex: "99",
        content: `url(${rightIcon})`,
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
    centerPadding: "25%",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 767, // 화면 사이즈 767px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          nextArrow: <NextArrow_ />,
          prevArrow: <PrevArrow_ />,
        },
      },
    ],
  };
  return (
    <>
      <Desktop>
        <Main>
          <Box>
            <div style={{ margin: "0px 50px 50px" }}>
              <Slide>
                <Slider {...settings}>
                  {_popular_product.map((i, idx) => {
                    let real = input_priceComma(`${i.lowBid}`);
                    return (
                      <MainCard
                        lowBid={real}
                        key={idx}
                        {...i}
                        _onClick={() => {
                          history.push(`product/detail/${i._id}`);
                        }}
                      />
                    );
                  })}
                </Slider>
              </Slide>
            </div>
          </Box>
        </Main>
      </Desktop>

      {/* <Tablet>

    </Tablet> */}

      <Mobile>
        <Main>
          <Slide>
            <Slider {...settings}>
              {_popular_product.map((i, idx) => {
                let real = input_priceComma(`${i.lowBid}`);
                return (
                  <MainCard
                    lowBid={real}
                    key={idx}
                    {...i}
                    _onClick={() => {
                      history.push(`product/detail/${i._id}`);
                    }}
                  />
                );
              })}
            </Slider>
          </Slide>
        </Main>
      </Mobile>
    </>
  );
};

Container.defaultProps = {
  title: "나는 용현",
  img: `https://1.bp.blogspot.com/-L1wiwQpwSMk/YItec1CE7MI/AAAAAAAAPH0/BwLwXf53LIQnaTGQuE6ilAwR31wsYVwMACLcBGAsYHQ/s0/KakaoTalk_20210416_144309208.png`,
  currentprice: 10000,
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
  justify-content: center;
  text-align: center;
  margin: 180px auto;
  max-width: 1920px;

  .slick-dots {
    /* margin: 10px 0; */
  }
  .slick-dots li button:before {
    color: #ae00ff;
  }
  .slick-center {
    transition: all 1000ms ease-in-out;
    -webkit-transform: scale(0.95) !important;
    -moz-transform: scale(0.95) !important;
    transform: scale(0.95) !important;
  }
  .slick-slide {
    -webkit-transform: scale(0.75);
    -moz-transform: scale(0.75);
    transform: scale(0.75);
  }
  @media only screen and (max-width: 767px) {
    max-width: 1030px;
    width: 85%;
    justify-content: space-between;
    margin: 120px auto 60px auto;
    .slick-dots {
    }
    .slick-center {
      transition: all 1000ms ease-in-out;
      -webkit-transform: scale(1) !important;
      -moz-transform: scale(1) !important;
      transform: scale(1) !important;
    }
    .slick-slide {
      -webkit-transform: scale(0.85);
      -moz-transform: scale(0.85);
      transform: scale(0.85);
    }
  }
`;

const Box = styled.div``;

const Slide = styled.div`
  @media only screen and (max-width: 767px) {
    height: 320px;
  }
`;

export default Container;
