import React, { useEffect }  from "react";
import styled from "styled-components";

import PostCard from 'components/PostCard'

import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";


// 최신등록상품 리스트
const Card = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.getRecentProductsAPI());
  }, []);
  const _recent_product = useSelector((state) => state.post.recent_product);

  const { title, img, currentprice, desc } = props;

  return (
    <Wrap>
      <Head>
      <p style={{ fontSize: "45px", fontWeight:"bold"}}>방금 등록된 굿즈 <span style={{color : "#AE27FF"}}> 어서오고~</span></p>
      </Head>
      <Grid>
        <Cards>
        {_recent_product.map((j, index) => {
                return <PostCard key={index} {...j} _onClick={() => {history.push(`product/detail/${j._id}`)}} />
              })}
        </Cards>
      </Grid>
    </Wrap>
  );
};

Card.defaultProps = {
  title: "프라이탁 아이패드 파우치",
  currentprice: "198,000원",
};

const Wrap = styled.div`
margin : 100px auto;
max-width : 1030px;
`;
const Head = styled.div`
display :flex;
justify-content : space-between;
`;

const Grid = styled.div`
display : flex;
`;
const Cards = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
margin-top : 45px 0 ;

`;

export default Card;
