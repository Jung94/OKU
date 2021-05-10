import React, { useEffect }   from 'react';
import styled from "styled-components";

import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import T_5 from "images/T_5.jpeg"
import T_6 from "images/T_6.jpeg"
import T_7 from "images/T_7.jpg"

// MD 추천
const Post = (props) => {
    const {
        title,
        img,
        currentprice,
        desc
    } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(postActions.getRecommendProductAPI());
    }, []);
    const _recommend_product = useSelector((state) => state.post.recommend_product);
    return (
        <Wrap>
            <Head>
            <p style={{ fontSize: "45px", fontWeight:"bold"}}>관심가는 물건을 추천해주는 MD,  <span style={{color : "#AE27FF"}}>제법 젠틀해요 </span></p>
            <p style={{marginTop:"41px", color:"#c0c0c0",fontSize: "16px", cursor:"pointer"}}>더보기</p>
            </Head>
            <Grid>
                {_recommend_product ?
                <div style={{margin:"100px auto", color :"#c0c0c0 ", fontSize:"20px"}}>
                MD 추천상품이 없습니다
                </div>  : 
                _recommend_product && _recommend_product.map((l, idx) => {
                    return(
                    <Cards key={idx}>
                        <Information>
                        <Image>
                            <img src={l.img} />
                        <Dibs>
                        </Dibs>
                        </Image>

                        <Desc>
                        <Title>
                            {l.title}
                        </Title>
                        {/* <Deadline>
                            경매마감까지 00 : 57 : 30 초 남았습니다
                        </Deadline> */}
                        <Currentprice>
                            {l.currentprice}
                        </Currentprice>
                        <Sucbid>
                                {l.sucBid}원
                            </Sucbid>
                        
                        </Desc>
                        </Information>
                    </Cards>
                )
                })}
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
const Cards = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-column-gap: 32.5px;
margin : 45px 0;

`;

const Information =styled.div`
width : 300px;
height : 404px;
`;

const Image = styled.div`
& > img {
width : 300px; 
height : 300px;
border-radius : 30px 30px 0 0;
}
`;

const Title = styled.div`
margin : 0 142px 11px 25px;
padding-top : 16px;
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
width : 250px;
`;

const Currentprice = styled.div`
margin : 0 142px 21px 25px;
`;

const Dibs = styled.div`
z-index: 999;
width : 41px;
height : 41px;
background : #ae27ff;
position : relative;
margin : -60px 0 0 248px;
border-radius : 50px;
`;

const Desc  = styled.div`
font-size : 20px;
font-weight : bold;
color : #2e2e2e;
width : 300px;
min-height : 104px;
background : #f2f2f2;
border-radius : 0 0 30px 30px;
text-align : left;
box-sizing : border-box;
margin :13px 0 0 0;

`;
const Sucbid = styled.div`
margin : 0 142px 21px 25px;
`;


export default Post;
