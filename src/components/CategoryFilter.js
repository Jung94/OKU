import React, { useEffect }  from 'react';
import styled from "styled-components";

import PostCard from 'components/PostCard'
import PostCard_m from "components/PostCard_m";
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
            return <PostCard key={idx} {...p}/>;
          })}
        </CategoryList>
      </Desktop>

      <Tablet>Tablet</Tablet>

      <Mobile>
        <CategoryList>
          {sub_list.map((p, idx) => {
            return <PostCard_m key={idx} {...p}/>;
          })}
        </CategoryList>
      </Mobile>
    </>
  )
};

const CategoryList = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  height: 100%;
  gap: 33px;
  // border: 1px solid red;

  
  @media only screen and (max-width : 767px) {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    height: 100%;
    gap: 24px;
    // border: 1px solid red;
  }

  @media only screen and (min-width : 1824px) {
    height: 80%;
    gap: 65px;
  }
`;

export default CategoryFilter;
