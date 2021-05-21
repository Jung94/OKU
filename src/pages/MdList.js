import React, { useEffect } from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import PostCard from "components/PostCard";

const MdList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.getRecommendProductAPI());
  }, []);
  const _recommend_product = useSelector((state) => state.post.recommend_product);
  return (
    <MDContainer>
      <span>MD 추천 리스트</span>
      <Grid>
        {!_recommend_product ? (
          <div style={{ margin: "100px auto", color: "#c0c0c0 ", fontSize: "20px" }}>현재 MD 추천상품이 없습니다</div>
        ) : (
          _recommend_product &&
          _recommend_product.map((l, idx) => {
            return <PostCard key={idx} {...l} />;
          })
        )}
      </Grid>
    </MDContainer>
  );
};

const MDContainer = styled.div`
  margin: 195px auto 100px;
  min-height: 70vh;
  max-width: 1030px;
  width: 100%;

  @media only screen and (max-width: 767px) {
    margin: 130px auto 20px auto;
  }
`;

const Grid = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 66px;
  margin-top: 100px;
  @media only screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    grid-template-columns: none;
    grid-column-gap: 0px;
    grid-row-gap: 20px;
  }
`;

export default MdList;
