import React, { useEffect } from "react";
import styled from "styled-components";

import PostCard from "components/PostCard";
import PostCardMobile from "components/PostCardMobile";
import { input_priceComma } from "shared/common";
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

const SearchResult = (props) => {
  const dispatch = useDispatch();
  const search_list = useSelector((state) => state.result.search);
  // const is_last = useSelector((state) => state.movie.search.last);

  const history = props.history;

  // const scroll = () => {
  //     dispatch(productActions.getMoiveScroll());
  // };

  // useEffect(() => {
  //   console.log(search_list);
  // }, [search_list]);

  return (
    <>
      <Desktop>
        <ProductList>
          {search_list.map((p, idx) => {
            let real = input_priceComma(`${p.lowBid}`);
            return (
              <PostCard
                key={idx}
                {...p}
                title={p.title}
                img={p.img[0]}
                // lowBid={real}
                // _onClick={() => {history.push(`/product/detail/${p._id}`);}}
              />
            );
          })}
        </ProductList>
      </Desktop>

      <Tablet>Tablet</Tablet>

      <Mobile>
        <ProductList>
          {search_list.map((p, idx) => {
            let real = input_priceComma(`${p.lowBid}`);
            return (
              <PostCardMobile
                key={idx}
                {...p}
                title={p.title}
                img={p.img[0]}
                // lowBid={real}
                // _onClick={() => {history.push(`/product/detail/${p._id}`);}}
              />
            );
          })}
        </ProductList>
      </Mobile>
    </>
  );
};

const ProductList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 38px;
  grid-row-gap: 50px;
  // border: 1px solid red;

  @media only screen and (max-width: 767px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 20px;
    // border: 1px solid red;
  }
`;

export default SearchResult;
