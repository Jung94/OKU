import React, { useEffect } from "react";
import styled from "styled-components";

import { Text } from "elements/";
import { Color } from "shared/DesignSys";
import DetailRing from "components/DetailRing";

import { useMediaQuery } from "react-responsive";

import { useDispatch, useSelector } from "react-redux";

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

const Seller_Review = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(shopActions.getShopDescAPI());
  // }, []);

  //   const ShopDesc = useSelector((state) => state.post.desc_shop);

  return (
    <>
      <Desktop>
        <Wrap>
          <ReviewInfo>
            <Head>
              <Text h1 textAlign="left">
                판매자 상점 후기
              </Text>
            </Head>
            <Detail>
              <InnerBox>
                {/* <Nickname>
                            최용현
                        </Nickname>
                        <Content>
                            친절하네요
                        </Content> */}
                <Blank>
                  <Text subBody color={Color.Dark_4}>
                    🎀 서비스 준비 중입니다! 🎀
                  </Text>
                </Blank>
              </InnerBox>
            </Detail>
          </ReviewInfo>
        </Wrap>
      </Desktop>

      <Mobile>
        <Wrap>
          <ReviewInfo>
            <Head>
              <Text h3 textAlign="left">
                내 상점 후기
              </Text>
            </Head>
            <Detail>
              <InnerBox>
                {/* <Nickname>
                                최용현
                            </Nickname>
                            <Content>
                                친절하네요
                            </Content> */}
                <Blank>
                  <Text subBody color={Color.Dark_4}>
                    🎀 서비스 준비 중입니다! 🎀
                  </Text>
                </Blank>
              </InnerBox>
            </Detail>
          </ReviewInfo>
        </Wrap>
      </Mobile>
    </>
  );
};

const Wrap = styled.div`
  max-width: 1030px;
  margin: 150px auto 100px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 767px) {
    margin: 200px auto -40px;
  }
`;
const ReviewInfo = styled.div`
  justify-content: space-between;
  width: 100%;

`;
const Head = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: flex-end;
`;
const Detail = styled.div`
  width: 100%;
  margin-top: 19px;
  background: #f8f8f8;
  min-height: 172px;
  border-radius: 16px;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16);
  padding: 20px 63px;
  @media only screen and (max-width: 767px) {
    padding: 10px 10px;
  }
`;
const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
  width: 100%;
  margin-top: 19px;
  background: #ffffff;
  min-height: 89px;
  border-radius: 16px;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16);
  padding: 10px 19px;
  gap: 15px;
`;
const Nickname = styled.div`
  font-size: 16px;
`;
const Content = styled.div`
  font-size: 14px;
`;
const Blank = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px auto;
`;

export default Seller_Review;
