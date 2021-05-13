import React, { useEffect } from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import PostCard from 'components/PostCard'


const MdList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(postActions.getRecommendProductAPI());
    }, []);
    const _recommend_product = useSelector((state) => state.post.recommend_product);
    return(
    <MDContainer>
      <MDText>
        <span>MD 추천 리스트</span>
                {!_recommend_product ?
                <div style={{margin:"100px auto", color :"#c0c0c0 ", fontSize:"20px"}}>
                현재 MD 추천상품이 없습니다
                </div>  : 
                _recommend_product && _recommend_product.map((l, idx) => {
                    return (<PostCard  key={idx} img={l.img} title={l.title} currentprice={l.currentprice} sucBid={l.sucBid} _onClick={() => {history.push(`product/detail/${l._id}`)}} />
                )})
                }  
                
        
      </MDText>
    </MDContainer>
  );
}

const MDContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 1030px;
    height: 100%;
    margin: 151px auto 0;
`;

const Grid =styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
margin-top : 45px 0 ;

`;

const MDText = styled.div`
  text-align: center;
  margin: 3rem 0;

  & span {
    font-size: 1.25rem;
    font-weight: 700;
  }
`;

export default MdList;