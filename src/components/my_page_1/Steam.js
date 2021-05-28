import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import Slider from "react-slick";

import RelatedProduct from "components/global/RelatedProduct";
import { history } from "redux/configureStore";
import { useMediaQuery } from "react-responsive";

import { actionCreators as mypageActions } from "redux/modules/mypage";
import { actionCreators as likeActions } from "redux/modules/like";

import { Color } from "shared/DesignSys";
import leftIcon from "images/chevronLeftSolid.svg";
import rightIcon from "images/chevronRightSolid.svg";

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

// function PrevArrow(props) {
//   const { className, style, onClick, lowBid } = props;
//   return (
//     <LeftArrow
//       className={className}
//       style={{
//         ...style,
//         display: "block",
//         zIndex: "999",
//         left: "1%",
//         color: Color.Dark_4,
//         fontSize: "7rem",
//         content: `url(${leftIcon})`,
//       }}
//       onClick={onClick}
//     />
//   );
// }

// // 오른쪽
// function NextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <RightArrow
//       className={className}
//       style={{
//         ...style,
//         display: "block",
//         zIndex: "999",
//         right: "1%",
//         color: Color.Dark_4,
//         fontSize: "5rem",
//         content: `url(${rightIcon})`,
//       }}
//       onClick={onClick}
//     />
//   );
// }

const Steam = () => {
  const dispatch = useDispatch();
  // const settings = {
  //   infinite: true, // 마지막 장 다음에 첫번째가 나오게 할 것인지
  //   speed: 500, // 넘어가는 속도는 몇으로 할 것인지
  //   lazyLoad: true,
  //   slidesToShow: 4, // 이거때문에 두줄씩 밑에도 나오는거임
  //   slidesToScroll: 1,
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  //   rows: 1,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2,
  //       },
  //     },
  //   ],
  // };
  useEffect(() => {
    if (access_token) {
      dispatch(mypageActions.setProfileAPI());
      dispatch(mypageActions.setInfoAPI());
      dispatch(mypageActions.setMystoreAPI());
      dispatch(likeActions.getMyLikeListAPI());
    }
  }, []);
  const my_like_list = useSelector((state) => state.like.my_like_list);
  const access_token = localStorage.getItem("access_token");

  return (
    <Wrap>
      <Desktop>
        <Head>
          <Text h2 weight="500" textAlign="left">
            찜 목록
          </Text>
        </Head>
        <Box>
          {my_like_list && my_like_list.length > 0 ? (
            <>
              <List>
                {/* <Slider {...settings}> */}
                  {my_like_list.map((r, idx) => (
                    <RelatedProduct
                      key={idx}
                      _id={r.productId}
                      img={r.productImage}
                      _onClick={() => {
                        history.push(`/product/detail/${r.productId}`);
                      }}
                    />
                  ))}
                {/* </Slider> */}
              </List>
            </>
          ) : (
            <Text h4 color={Color.Dark_4} margin={"60px auto"}>
              찜한 상품이 없습니다.
            </Text>
          )}
        </Box>
      </Desktop>

      <Mobile>
        <Head>
          <Text h1 textAlign="left">
            찜 목록
          </Text>
        </Head>
        <Box>
          {my_like_list && my_like_list.length > 0 ? (
            my_like_list.map((r, idx) => (
              <RelatedProduct
                like
                width="40vw"
                height="40vw"
                key={idx}
                _id={r.productId}
                img={r.productImage}
                _onClick={() => {
                  history.push(`/product/detail/${r.productId}`);
                }}
              />
            ))
          ) : (
            <Text h4 color={Color.Dark_4} margin={"60px auto"}>
              찜한 상품이 없습니다.
            </Text>
          )}
        </Box>
      </Mobile>
    </Wrap>
  );
};

const H2 = "20px";
const Body = "14px";
const Sub = "12px";

const Wrap = styled.div`
  max-width: 1030px;
  width: 100%;
  margin-top: 25px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 25px;
  margin-bottom: 10px;

  @media only screen and (max-width: 767px) {
    div:nth-child(1) {
      font-size: ${H2};
    }
    div:nth-child(2) {
      font-size: ${Sub};
    }
  }
`;

const Box = styled.div`
  overflow-y : hidden;
  box-sizing: border-box;
  display: flex;
  padding: 15px 15px 15px 15px;

  background: ${Color.Light_1};
  border-radius: 12px;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16);

  @media only screen and (max-width: 767px) {
    justify-content: space-between;
  }
  
  /* overflow-x scrollbar css */
  ::-webkit-scrollbar {
    width: 1px;
    height : 8px;
  }
  // scrollbar
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;    
  }
  // scrollbar 배경 (트랙)
  ::-webkit-scrollbar-track {
    background-color: ${Color.Light_1};
    border-radius: 10px;
    /* box-shadow: inset 0px 0px 6px #ff000080; */
    margin : 0 0px 0 15px;
  }

`;

const List = styled.div`
  display : flex;
  justify-content: space-between;
  width: 100%;
`;
// const LeftArrow = styled.div`
//   position: absolute;
// `;

// const RightArrow = styled.div`
//   position: absolute;
// `;

export default Steam;
