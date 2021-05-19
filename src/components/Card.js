import React, { useEffect } from "react";
import styled from "styled-components";

import { useMediaQuery } from "react-responsive";

import PostCard from "components/PostCard";
import { actionCreators as likeActions } from "redux/modules/like";

import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import InfinityScroll from "./InfinityScroll";
import { Color } from "shared/DesignSys";
import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart, faPen as fasPen } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

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

// 최신등록상품 리스트
const Card = (props) => {
  const dispatch = useDispatch();
  const { title, img, currentprice, desc } = props;

  useEffect(() => {
    dispatch(postActions.getRecentProductsAPI());
    dispatch(likeActions.getLikeAPI());
  }, []);

  const _recent_product = useSelector((state) => state.post.recent_product);
  return (
    <>
    {/* 데스크탑 View */}
    <Desktop>
    <Wrap>
      <Head>
        <p style={{ fontSize: "30px", fontWeight: "bold" }}>
          방금 등록된 굿즈 <span style={{ color: "#AE27FF" }}> 어서오고~</span>
        </p>
      </Head>
      <Cards>
        {_recent_product.map((j, index) => {
          return <PostCard key={index} {...j} img={j.img[0]} />;
        })}
      </Cards>
    </Wrap>
    </Desktop>

    {/* 태블릿 View */}
    <Tablet>

    </Tablet>
    {/* 모바일 View */}
    <Mobile>
        asd
    </Mobile>
    </>
  );
};

const Wrap = styled.div`
  margin: 0 auto 130px auto;
  max-width: 1030px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  letter-spacing: -2px;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 66px;
  margin-top: 50px;

  width: 100%;
  box-sizing: border-box;
`;

export default Card;
