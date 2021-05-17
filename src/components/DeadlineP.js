import React, { useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";

import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../redux/configureStore";
import PostCard from "components/PostCard";

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
      <Wrap>
        <Head>
          <p style={{ fontSize: "45px", fontWeight: "bold" }}>
            마감 임박 상품은 <span style={{ color: "#AE27FF" }}>못참지~</span>
          </p>
          <p
            onClick={() => {
              history.push("/DeadlineList");
            }}
            style={{ marginTop: "41px", color: "#c0c0c0", fontSize: "16px", cursor: "pointer" }}
          >
            더보기
          </p>
        </Head>
        <Cards>
          {!_deadline_product ? (
            <div style={{ margin: "100px auto", color: "#c0c0c0 ", fontSize: "20px" }}>마감임박 상품이 없습니다</div>
          ) : (
            _deadline_product.map((k, index) => {
              return <PostCard key={index} {...k} />;
            })
          )}
        </Cards>
      </Wrap>
    );
  }
  return null;
};

const Wrap = styled.div`
  margin: 100px auto;
  max-width: 1030px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  letter-spacing: -2px;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 65px;
  grid-row-gap: 48px;
  margin-top: 45px 0;

  width: 100%;
  box-sizing: border-box;
`;

export default DeadlineP;
