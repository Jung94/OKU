import React, { useEffect } from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { Grid, Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import PostCard from "components/PostCard";
import PostCardMobile from "components/PostCardMobile";

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

const MdList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.getRecommendProductAPI());
  }, []);
  const _recommend_product = useSelector((state) => state.post.recommend_product);
  return (
    <>
      <Desktop>
        <MDContainer>
          <SectionTitle>
            <Text h2>MD 추천 리스트</Text>
          </SectionTitle>
          <CardWrap>
            {!_recommend_product ? (
              <div style={{ margin: "100px auto", color: "#c0c0c0 ", fontSize: "20px" }}>현재 MD 추천상품이 없습니다</div>
            ) : (
              _recommend_product &&
              _recommend_product.map((l, idx) => {
                return <PostCard key={idx} {...l} />;
              })
            )}
          </CardWrap>
        </MDContainer>
      </Desktop>

      <Tablet>Tablet</Tablet>

      <Mobile>
        <MDContainer>
          <SectionTitle>
            <Text h2>MD 추천 리스트</Text>
          </SectionTitle>
          <CardWrap>
            {!_recommend_product ? (
              <div style={{ margin: "100px auto", color: "#c0c0c0 ", fontSize: "20px" }}>현재 MD 추천상품이 없습니다</div>
            ) : (
              _recommend_product &&
              _recommend_product.map((l, idx) => {
                return <PostCardMobile key={idx} {...l} />;
              })
            )}
          </CardWrap>
        </MDContainer>
      </Mobile>
    </>
  );
};

const MDContainer = styled.div`
  margin: 160px auto 20px auto;

  max-width: 1030px;
  width: 100%;
  @media only screen and (max-width: 767px) {
    margin: 130px auto 20px auto;
  }
`;

const SectionTitle = styled.div`
  margin: 20px auto;
  text-align: center;
`;

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 30px;
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

export default MdList;
