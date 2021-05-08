import React, { useEffect }  from "react";
import styled from "styled-components";
import Slider from "react-slick";

import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import T_1 from "images/T_1.jpg"
import T_2 from "images/T_2.jpeg"
import T_3 from "images/T_3.jpg"
import T_4 from "images/T_4.jpg"
import T_5 from "images/T_5.jpeg"
import T_6 from "images/T_6.jpeg"
import T_7 from "images/T_7.jpg"


// 마감임박상품
const DeadlineP = (props) => {
    const {
        title,
        img,
        currentprice

    } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(postActions.getDeadlineProductAPI());
    }, []);
    const _deadline_product = useSelector((state) => state.post.deadline_product);
    console.log(_deadline_product)

    return (    
        <Wrap>
            <Head>
                <p style={{ fontSize: "45px", fontWeight:"bold"}}>마감 임박 상품은 <span style={{color : "#AE27FF"}}>못참지~</span></p>
                <p style={{marginTop:"41px", color:"#c0c0c0",fontSize: "16px", cursor:"pointer"}}>더보기</p>
            </Head>
        <Grid>  
            {_deadline_product ? 
            <div style={{margin:"10px auto", fontSize:"20px"}}>
                마감 임박 상품이 없습니다.
            </div>  : 
            _deadline_product.map((k, index) => {
            return (
                <Cards key={index}>
                    <Information  >
                        <Image style={{width:"300px", height:"300px"}}>
                            <img src={k.img} />
                            <Dibs>
                            </Dibs>
                        </Image>

                        <Desc>
                            <Title>
                                {k.title}
                            </Title>
                            {/* <Deadline>
                                경매마감까지 00 : 57 : 30 초 남았습니다
                            </Deadline> */}
                            <Currentprice>
                                {k.currentprice}
                            </Currentprice>
                            <Sucbid>
                                {k.sucBid}원
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
grid-row-gap: 48px;
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
position : absolute;
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

`;
const Sucbid = styled.div`
margin : 0 142px 21px 25px;
`;


export default DeadlineP