import React, { useEffect } from "react";
import styled from "styled-components";

import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import { useMediaQuery } from "react-responsive";

import PostCard from "components/PostCard";
import PostCardMobile from "components/PostCardMobile";

import { Text, Profile } from "elements/";

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

const AllList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.getAllProductAPI());
  }, []);
  const allproduct = useSelector((state) => state.post.all_product);
  return (
    <>
      <Desktop>
        <Wrap>
          <SectionTitle>
            <Text h2>모든 상품</Text>
          </SectionTitle>
          <Grid>
            {allproduct?.length === 0 ? (
              <div style={{ margin: "100px auto", color: "#c0c0c0 ", fontSize: "20px" }}>상품이 없습니다</div>
            ) : (
              allproduct &&
              allproduct.map((l, idx) => {
                return <PostCard key={idx} {...l} img={l.img[0]} />;
              })
            )}
          </Grid>
        </Wrap>
      </Desktop>

      <Tablet>Tablet</Tablet>

      <Mobile>
        <Wrap>
          <SectionTitle>
            <Text h2>모든 상품</Text>
          </SectionTitle>
          <Grid>
            {allproduct?.length === 0 ? (
              <div style={{ margin: "100px auto", color: "#c0c0c0 ", fontSize: "20px" }}>상품이 없습니다</div>
            ) : (
              allproduct &&
              allproduct.map((l, idx) => {
                return <PostCardMobile key={idx} {...l} img={l.img[0]} />;
              })
            )}
          </Grid>
        </Wrap>
      </Mobile>
    </>
  );
};

const Wrap = styled.div`
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

const Grid = styled.div`
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

export default AllList;
