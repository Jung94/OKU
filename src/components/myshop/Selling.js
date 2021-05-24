import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input, Line, Button, Tag, Modal, Text, Profile } from "elements/";

import { actionCreators as shopActions } from "redux/modules/myshop";
import { useDispatch, useSelector } from "react-redux";

import { history } from "redux/configureStore";

import { useMediaQuery } from "react-responsive";

import icon_Upload_1 from "images/icon_Upload_1.svg";
import SellingImg from "components/SellingImg";

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

const Selling = (props) => {
  const dispatch = useDispatch();
  const SellingProduct = useSelector((state) => state.myshop.Product_selling);
  useEffect(() => {
    dispatch(shopActions.getMyProductAPI());
  }, []);
  return (
    <>
      <Desktop>
        <Wrap>
          <SellInfo>
            <Head>
              <Text h1 textAlign="left">
                판매상품
              </Text>
              {/* <More>
                        더보기
                    </More> */}
            </Head>
            <Detail>
              <List>
                {SellingProduct?.length === 0 ? (
                  <></>
                ) : (
                  // <SellingImg onClick={() => history.push(`/product/detail/${SellingProduct[0]._id}`)} src={SellingProduct[0].img[0]} />
                  SellingProduct &&
                  SellingProduct.map((l, idx) => {
                    return <SellingImg {...l} key={idx} img={l.img[0]} />;
                  })
                )}
                <UpLoad
                  onClick={() => {
                    history.push("/ProductUpload");
                  }}
                >
                  <img style={{ width: "50px", height: "50px", marginTop: "68px" }} src={icon_Upload_1} />
                  <p style={{ fontSize: "17px", color: "#818181", fontWeight: "bold", marginTop: "10px" }}>물건등록</p>
                </UpLoad>
              </List>
            </Detail>
          </SellInfo>
        </Wrap>
      </Desktop>

      <Mobile>
        <Wrap>
          <SellInfo>
            <Head>
              <Text h3 textAlign="left">
                판매상품
              </Text>
              {/* <More>
                            더보기
                        </More> */}
            </Head>
            <Detail>
              <List>
                {SellingProduct?.length === 0 ? (
                  <></>
                ) : (
                  // <SellingImg onClick={() => history.push(`/product/detail/${SellingProduct[0]._id}`)} src={SellingProduct[0].img[0]} />
                  SellingProduct &&
                  SellingProduct.map((l, idx) => {
                    return <SellingImg {...l} key={idx} img={l.img[0]} />;
                  })
                )}
                <UpLoad
                  onClick={() => {
                    history.push("/ProductUpload");
                  }}
                >
                  <img style={{ width: "40px", height: "40px", marginTop: "40px" }} src={icon_Upload_1} />
                  <p style={{ fontSize: "15px", color: "#818181", fontWeight: "bold", marginTop: "5px" }}>물건등록</p>
                </UpLoad>
              </List>
            </Detail>
          </SellInfo>
        </Wrap>
      </Mobile>
    </>
  );
};

const Wrap = styled.div`
    max-width: 1030px;
    margin: 129px auto 100px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    text-align: center;
    align-items: center;
    justify-content: space-between;

    @media only screen and (max-width: 767px) {
        margin: 129px auto -150px;
    }
`;

const SellInfo = styled.div`
  justify-content: space-between;
  width: 100%;
  height: 250px;
`;

const Head = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: flex-end;
`;
const More = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: flex-end;
`;

const Detail = styled.div`
  width: 100%;
  margin-top: 19px;
  background: #f8f8f8;
  min-height: 301px;
  border-radius: 16px;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16);
  padding: 43px 55px;
  @media only screen and (max-width: 767px) {
    min-height: 209px;
    padding: 29px 20px;
    align-items: center;
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 16px;
  row-gap: 21px;
  @media only screen and (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 15px;
    row-gap: 15px;
  }
`;
const MyImage = styled.img`
  width: 218px;
  height: 218px;
  background: #dadada;
  border-radius: 16px;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16);
`;

const UpLoad = styled.div`
  width: 218px;
  height: 218px;
  background: #dadada;
  border-radius: 16px;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16);
  @media only screen and (max-width: 767px) {
    width: 150px;
    height: 150px;
  }
`;

export default Selling;
