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

  display: flex;
  flex-direction: column;

  flex-wrap: wrap;
  height: 100%;
  gap: 33px;

  @media only screen and (max-width: 767px) {
    margin: 130px auto 20px auto;
  }
`;

const Grid = styled.div`
  justify-content: flex-start;
  display: flex;
  justify-content: center;
  max-width: 1030px;
  height: 100%;
  gap: 10px;

  @media only screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

const SectionTitle = styled.div`
  margin: 0 auto;
`;

export default AllList;
