import React, { useEffect } from "react";
import styled from "styled-components";

import PostCard from "components/PostCard";
import PostCardMobile from "components/PostCardMobile";
import { history } from "redux/configureStore";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";

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

const CategoryFilter = () => {
  const dispatch = useDispatch();
  // const main_list = useSelector((state) => state.post.main_category);
  const sub_list = useSelector((state) => state.post.sub_category);
  return (
    <>
      <Desktop>
        <CategoryList>
          {sub_list.map((p, idx) => {
            return <PostCard key={idx} {...p} />;
          })}
        </CategoryList>
      </Desktop>

      <Tablet>Tablet</Tablet>

      <Mobile>
        <CategoryList>
          {sub_list.map((p, idx) => {
            return <PostCardMobile key={idx} {...p} />;
          })}
        </CategoryList>
      </Mobile>
    </>
  );
};

const CategoryList = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-column-gap: 38px;
grid-row-gap: 50px;
width : 100%;
// border: 1px solid red;


  @media only screen and (max-width: 767px) {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    height: 100%;
    gap: 24px;
    // border: 1px solid red;
  }

`;

export default CategoryFilter;
