import React, { useEffect } from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import PostCard from 'components/PostCard'

const DeadList = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(postActions.getDeadlineProductAPI());
    }, []);
    const _deadline_product = useSelector((state) => state.post.deadline_product);

    return(
        <DeadContainer>
            <DeadText>
            <span>마감임박 리스트</span>
            <>
            {_deadline_product ? 
            <div style={{margin:"100px auto", color :"#c0c0c0 ", fontSize:"20px"}}>
                현재 마감임박 상품이 없습니다
            </div>  : 
            _deadline_product.map((k, index) => {
            return <PostCard key={index} img={k.img} title={k.title} currentprice={k.currentprice} Sucbid={k.Sucbid} _onClick={() => {history.push(`product/detail/${k._id}`)}} />
            })}
            </>
            </DeadText>
        </DeadContainer>
    );  
    }
    
    const DeadContainer = styled.div`
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 1030px;
        height: 100%;
        margin: 151px auto 0;
        border: 1px solid #000;
    `;
    
    const DeadText = styled.div`
        text-align: center;
        margin: 3rem 0;

    & span {
        font-size: 1.25rem;
        font-weight: 700;
    }
    `;
    
export default DeadList;