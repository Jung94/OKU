import React, { useEffect } from "react";
import styled from "styled-components";
import { Input, Line, Button, Tag, Modal, Text, Profile } from "elements/"

import { useSelector, useDispatch } from "react-redux";

import { actionCreators as mypageActions } from "redux/modules/mypage";
import { actionCreators as likeActions } from "redux/modules/like";
import { actionCreators as shopActions } from "redux/modules/myshop";

const ShopInfomation = () => {
    const dispatch = useDispatch();
    const _user = useSelector((state) => state.mypage.user);
    const my_like_list = useSelector((state) => state.like.my_like_list);
    const ShopDesc = useSelector((state) => state.myshop.desc_shop);
    const SellingProduct = useSelector((state) => state.myshop.Product_selling);
    console.log(ShopDesc, SellingProduct, "eeeeeeee");
    console.log(SellingProduct);

    useEffect(() => {
        dispatch(mypageActions.setProfileAPI());
        dispatch(likeActions.getMyLikeListAPI());
        dispatch(shopActions.getShopDescAPI());
        dispatch(shopActions.getMyProductAPI());
    }, []);

    

    
    return (
        <Wrap>
            <ShopInfo>
                <Head>
                <Text h1 textAlign="left">
                    <span style={{color :"#ae27ff"}}>{_user.nickname}</span> 님의 상점
                </Text>
                <Modify>
                    수정하기
                </Modify>
                </Head>
                <Detail>
                    <Item>
                        <span>
                            판매중인 물건 <span style={{color :"#ae27ff"}}>
                                {/* {SellingProduct.length > 0 ? SellingProduct.length : 0} */}
                                {SellingProduct && SellingProduct.length > 0 ? SellingProduct.length : 0}
                            </span>개
                        </span>
                        <span>
                            찜 <span style={{color :"#ae27ff"}}>{my_like_list.length}</span>개
                        </span>
                    </Item>
                    <ShopIntro type="text" disabled />

                </Detail>
            </ShopInfo> 
        </Wrap>
    );
};

const H2 = "20px";
const Body = "16px";
const Sub = "12px";

const Wrap = styled.div`
    max-width: 1030px;
    margin: 93px auto 100px;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    text-align: center;
    align-items: center;
    justify-content: space-between;

    @media only screen and (max-width: 767px) {
    }
`;
const ShopInfo = styled.div`
justify-content: space-between;
width : 100%;
height : 250px;
`;

const Head = styled.div`
justify-content: space-between;
display :flex;
align-items: flex-end;
`;

const Modify = styled.div`
cursor: pointer;
font-size: ${Body};
`;

const Detail = styled.div`
width : 100%;
margin-top : 19px;
background : #f8f8f8;
height : 184px;
border-radius: 16px;
box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16);
padding : 30px 55px;
`;

const Item = styled.div`
text-align : left;
span:nth-child(2) {
    margin-left : 25px; 
}
`;

const ShopIntro = styled.textarea`
resize: none;
width : 920px;
min-height : 80px;
border-radius: 16px;
border: solid 1px #ae27ff;
margin-top : 15px;
box-sizing : border-box;
: focus {
    outline : none;
}
`;


export default ShopInfomation;