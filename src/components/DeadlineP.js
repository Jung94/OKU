import React, { useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";

import { useMediaQuery } from "react-responsive";

import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../redux/configureStore";
import PostCard from "components/PostCard";
import PostCardMobile from "./PostCardMobile";

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

// 마감임박상품
const DeadlineP = (props) => {
  const { title, img, currentprice } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.getDeadlineProductAPI());
  }, []);

  const _deadline_product = useSelector((state) => state.post.deadline_product);

  if (_deadline_product && _deadline_product.length > 0) {
    return (
      <>
        <Desktop>
          <Wrap>
            <Head>
              <p style={{ fontSize: "30px", fontWeight: "bold" }}>
                마감 임박 상품은 <span style={{ color: "#AE27FF" }}>못참지~</span>
              </p>
              <p
                onClick={() => {
                  history.push("/DeadlineList");
                }}
                style={{ color: "#c0c0c0", fontSize: "16px", cursor: "pointer" }}
              >
                더보기
              </p>
            </Head>
            <Cards>
              {!_deadline_product ? (
                <div style={{ color: "#c0c0c0 ", fontSize: "20px" }}>마감임박 상품이 없습니다</div>
              ) : (
                _deadline_product.map((k, index) => {
                  return <PostCard key={index} {...k} img={k.img[0]} />;
                })
              )}
            </Cards>
          </Wrap>
        </Desktop>

        <Tablet></Tablet>

        <Mobile>
          <Wrap>
            <Head>
              <p style={{ fontSize: "30px", fontWeight: "bold" }}>
                마감 임박 상품은 <span style={{ color: "#AE27FF" }}>못참지~</span>
              </p>
            </Head>
            <Cards>
              {!_deadline_product ? (
                <div style={{ color: "#c0c0c0 ", fontSize: "20px" }}>마감임박 상품이 없습니다</div>
              ) : (
                _deadline_product.map((k, index) => {
                  return <PostCardMobile key={index} {...k} img={k.img[0]} />;
                })
              )}
            </Cards>
            <More
              onClick={() => {
                history.push("/DeadlineList");
              }}
            >
              더보기
            </More>
          </Wrap>
        </Mobile>
      </>
    );
  }

  return null;
};

const Wrap = styled.div`
  margin: 0 auto 180px auto;
  max-width: 1030px;
  @media only screen and (max-width: 767px) {
    margin: 0 auto 55px auto;
  }
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  letter-spacing: -2px;

  @media only screen and (max-width: 767px) {
    display: flex;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    text-align: center;
    letter-spacing: -2px;
    margin-bottom: 25px;
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 38px;
  grid-row-gap: 66px;
  // margin-bottom: 150px;
  width: 100%;
  box-sizing: border-box;

  @media only screen and (max-width: 767px) {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    grid-row-gap: 20px;
    width: 100%;
    box-sizing: border-box;
  }
`;
const More = styled.button`
  width: 100%;
  margin-top: 20px;
  height: 40px;
  background: #ae27ff;
  color: #ffffff;
  font-size: 17px;
  border-radius: 30px;
  border: solid #ae27ff;
`;

export default DeadlineP;
