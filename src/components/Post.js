import React, { useEffect }   from 'react';
import styled from "styled-components";

import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import PostCard from 'components/PostCard'
import { history } from "../redux/configureStore";

// MD 추천
const Post = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(postActions.getRecommendProductAPI());
    }, []);
    const _recommend_product = useSelector((state) => state.post.recommend_product);
    return (
        <Wrap>
            <Head>
            <p style={{ fontSize: "45px", fontWeight:"bold"}}>관심가는 물건을 추천해주는 MD,  <span style={{color : "#AE27FF"}}>제법 젠틀해요 </span></p>
            <p onClick={()=> {
                history.push("/MdList")
            }}  style={{marginTop:"41px", color:"#c0c0c0",fontSize: "16px", cursor:"pointer"}}>더보기</p>
            </Head>
            <Grid>
                {!_recommend_product ?
                <div style={{margin:"100px auto", color :"#c0c0c0 ", fontSize:"20px"}}>
                MD 추천상품이 없습니다
                </div>  : 
                _recommend_product && _recommend_product.map((l, idx) => {
                    return (<PostCard  key={idx} img={l.img} title={l.title} currentprice={l.currentprice} sucBid={l.sucBid} _onClick={() => {history.push(`product/detail/${l._id}`)}} />
                )})}
            </Grid>                
        </Wrap>
    )
}
Post.defaultProps = {
}



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

export default Post;
