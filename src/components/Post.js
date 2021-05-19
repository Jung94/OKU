import React, { useEffect } from "react";
import styled from "styled-components";

import { useMediaQuery } from "react-responsive";

import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import PostCard from "components/PostCard";
import { history } from "../redux/configureStore";

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

// MD 추천
const Post = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.getRecommendProductAPI());
  }, []);

  const _recommend_product = useSelector((state) => state.post.recommend_product);

  if (_recommend_product && _recommend_product.length > 0) {
    return (
      <>
      <Desktop>
      <Wrap>
        <Head>
          <p style={{ fontSize: "30px", fontWeight: "bold" }}>
            관심가는 물건을 추천해주는 MD, <span style={{ color: "#AE27FF" }}>제법 젠틀해요 </span>
          </p>
          <p
            onClick={() => {
              history.push("/MdList");
            }}
            style={{ color: "#c0c0c0", fontSize: "16px", cursor: "pointer" }}
          >
            더보기
          </p>
        </Head>
        <Cards>
          {!_recommend_product ? (
            <div style={{ color: "#c0c0c0 ", fontSize: "20px" }}>MD 추천상품이 없습니다</div>
          ) : (
            _recommend_product &&
            _recommend_product.map((l, idx) => {
              return <PostCard key={idx} {...l} />;
            })
          )}
        </Cards>
      </Wrap>
      </Desktop>

      <Tablet>

      </Tablet>

      <Mobile>
      <Wrap>
        <Head>
          <p style={{ fontSize: "27px", fontWeight: "bold" }}>
            관심가는 물건을 추천해주는 MD, <span style={{ color: "#AE27FF" }}>제법 젠틀해요 </span>
          </p>
        </Head>
        <Cards>
          {!_recommend_product ? (
            <div style={{ color: "#c0c0c0 ", fontSize: "20px" }}>MD 추천상품이 없습니다</div>
          ) : (
            _recommend_product &&
            _recommend_product.map((l, idx) => {
              return <PostCard key={idx} {...l} />;
            })
          )}
        </Cards>
        <p
            onClick={() => {
              history.push("/MdList");
            }}
            style={{ color: "#c0c0c0", fontSize: "16px", cursor: "pointer" }}
          >
            더보기
          </p>
      </Wrap>
      </Mobile>
      </>

    );
  }
  return null;
};

Post.defaultProps = {};

const Wrap = styled.div`
  margin: -10px auto 130px auto;
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
  // margin-bottom: 150px;

  width: 100%;
  box-sizing: border-box;
`;

export default Post;
