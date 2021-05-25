import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import { useSelector, useDispatch } from "react-redux";
import { history } from "redux/configureStore";

import { useMediaQuery } from "react-responsive";

import { actionCreators as myshopActions } from "redux/modules/myshop";
import { actionCreators as mypageActions } from "redux/modules/mypage";
import { actionCreators as likeActions } from "redux/modules/like";
import { actionCreators as shopActions } from "redux/modules/myshop";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return isDesktop ? children : null;
};

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  return isTablet ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

const ShopInfomation = () => {
  const dispatch = useDispatch();
  const _user = useSelector((state) => state.mypage.user);
  const my_like_list = useSelector((state) => state.like.my_like_list);
  const ShopDesc = useSelector((state) => state.myshop.desc_shop);
  const EditDesc = useSelector((state) => state.myshop.shop_desc);
  const SellingProduct = useSelector((state) => state.myshop.Product_selling);
  useEffect(() => {
    dispatch(mypageActions.setProfileAPI());
    dispatch(likeActions.getMyLikeListAPI());
    dispatch(shopActions.getShopDescAPI());
    dispatch(shopActions.getMyProductAPI());
  }, []);

const [ModiShowing, setModiShowing] = useState(false);
const [Modified, setModified] = useState("");

const Modifiy = () => setModiShowing(!ModiShowing);
const CompleteModi = () => {
    setModiShowing(!ModiShowing);
    dispatch(myshopActions.editShopDescAPI(Modified));
};

    if (!ModiShowing) {
    return (
    <>
        <Desktop>
            <Wrap>
            <ShopInfo>
                <Head>
                <Text h1 textAlign="left">
                    <span style={{ color: "#ae27ff" }}>{_user.nickname}</span> 님의 상점
                </Text>

                <Modify onClick={Modifiy}>수정하기</Modify>
                </Head>
                <Detail>
                <Item>
                    <span>
                    판매중 물건{" "}
                    <span style={{ color: "#ae27ff" }}>
                        {/* {SellingProduct.length > 0 ? SellingProduct.length : 0} */}
                        {SellingProduct && SellingProduct.length > 0 ? SellingProduct.length : 0}
                    </span>
                    개
                    </span>
                    <span>
                    찜한 물건{" "}
                    <span style={{ color: "#ae27ff", cursor: "pointer" }} onClick={() => history.push("/my/shopping")}>
                        {my_like_list.length}
                    </span>
                    개
                    </span>
                </Item>
                <ShopIntro type="text" disabled placeholder={`${EditDesc && EditDesc}`} />
                </Detail>
            </ShopInfo>
            </Wrap>
        </Desktop>

        <Mobile>
            <Wrap>
            <ShopInfo>
                <Head>
                <Text h1 textAlign="left">
                    <span style={{ color: "#ae27ff" }}>{_user.nickname}</span> 님의 상점
                </Text>

                <Modify onClick={Modifiy}>수정하기</Modify>
                </Head>
                <Detail>
                <Item>
                    <span>
                    판매중 물건{" "}
                    <span style={{ color: "#ae27ff" }}>
                        {/* {SellingProduct.length > 0 ? SellingProduct.length : 0} */}
                        {SellingProduct && SellingProduct.length > 0 ? SellingProduct.length : 0}
                    </span>
                    개
                    </span>
                    <span>
                    찜한 물건{" "}
                    <span style={{ color: "#ae27ff", cursor: "pointer" }} onClick={() => history.push("/my/shopping")}>
                        {my_like_list.length}
                    </span>
                    개
                    </span>
                </Item>
                <ShopIntro type="text" disabled placeholder={`${EditDesc && EditDesc}`} />
                </Detail>
            </ShopInfo>
            </Wrap>
        </Mobile>
        </>
    );
    } else {
    return (
        <Wrap>
        <ShopInfo>
            <Head>
            <Text h1 textAlign="left">
                <span style={{ color: "#ae27ff" }}>{_user.nickname}</span> 님의 상점
            </Text>

            <Modify onClick={CompleteModi}>수정완료</Modify>
            </Head>
            <Detail>
            <Item>
                <span>
                판매중 물건{" "}
                <span style={{ color: "#ae27ff" }}>
                    {/* {SellingProduct.length > 0 ? SellingProduct.length : 0} */}
                    {SellingProduct && SellingProduct.length > 0 ? SellingProduct.length : 0}
                </span>
                개
                </span>
                <span>
                찜한 물건{" "}
                <span style={{ color: "#ae27ff", cursor: "pointer" }} onClick={() => history.push("/my/shopping")}>
                    {my_like_list.length}
                </span>
                개
                </span>
            </Item>
            <ShopIntro
                type="text"
                placeholder={`현재 상점소개 : ${EditDesc && EditDesc}`}
                onChange={(e) => {
                setModified(e.target.value);
                }}
            />
            </Detail>
        </ShopInfo>
        </Wrap>
    );
    }
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
    margin: 31px auto -100px 0;
  }
`;
const ShopInfo = styled.div`
  justify-content: space-between;
  width: 100%;
  height: 250px;
`;

const Head = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: flex-end;
`;

const Modify = styled.div`
  cursor: pointer;
  font-size: ${Body};

  @media only screen and (max-width: 767px) {
    font-size: 12px;
  }
`;

const Detail = styled.div`
  width: 100%;
  margin-top: 19px;
  background: #f8f8f8;
  height: 184px;
  border-radius: 16px;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16);
  padding: 30px 55px;
  @media only screen and (max-width: 767px) {
    padding: 20px 20px;
  }
`;

const Item = styled.div`
  text-align: left;
  span:nth-child(2) {
    margin-left: 25px;
  }
  @media only screen and (max-width: 767px) {
    span:nth-child(1) {
      font-size: 13px;
    }
    span:nth-child(2) {
      font-size: 13px;
    }
  }
`;

const ShopIntro = styled.textarea`
  resize: none;
  width: 920px;
  min-height: 80px;
  border-radius: 16px;
  border: solid 1px #ae27ff;
  margin-top: 15px;
  box-sizing: border-box;
  padding: 10px 0 0 10px;
  :focus {
    outline: none;
  }
  @media only screen and (max-width: 767px) {
    width: 320px;
    :focus {
      outline: none;
    }
  }
`;

export default ShopInfomation;
