import React, { useEffect } from "react";
import styled from 'styled-components'

import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import PostCard from 'components/PostCard'

const AllList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(postActions.getAllProductAPI());
    }, []);
    const allproduct = useSelector((state) => state.post.all_product);
    return(
        <Wrap>
            <Text>
                <span>
                    모든 상품
                </span>
                <Grid>
                {allproduct?.length === 0 ?
                <div style={{margin:"100px auto", color :"#c0c0c0 ", fontSize:"20px"}}>
                상품이 없습니다
                </div>  : 
                allproduct && allproduct.map((l, idx) => {
                    return (<PostCard  key={idx} {...l} />
                )})
                }  
                </Grid>
            </Text>
        </Wrap>
    );
};

const Wrap = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
max-width: 1030px;
height: 100%;
& > span {
margin : 3rem 0;
}
margin: 195px auto 100px;
`;

const Grid =styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-column-gap: 30px;
grid-row-gap: 66px;
margin-top : 100px ;

`;

const Text = styled.div`
  text-align: center;
  margin: 3rem 0;

  & span {
    font-size: 1.25rem;
    font-weight: 700;
  }
`;

export default AllList;

