import React from "react";
import styled from "styled-components";
import { history } from "redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as productActions } from "redux/modules/result";

import { Grid, Input, Line, Button, Tag, Modal, Text } from "elements/";
import Select from "react-select";
import ListBtn from "components/ListBtn";
import ListHover from "components/ListHover";
import DetailRing from "components/DetailRing";

import MainLogo from "images/logo.png";
import Submit from "images/search.png";
import List from "images/list.png";

const Header = (props) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = React.useState("");
  const [mainct, setMainct] = React.useState("");
  const [subct, setSubct] = React.useState("");

  const SearchProduct = () => {
    dispatch(productActions.getProductSearch(keyword));
    history.push("/result");
  };

  const handleMainCategory = (e) => {
    setMainct(e.value);
    if (mainct === "2D") {
      setSubct(option_2);
    } else if (mainct === "3D") {
      setSubct(option_3);
    }
  };

  const handleSubCategory = (e) => {
    setSubct(e.value);
    console.log(handleSubCategory);
  };
  // const is_login = useSelector((state) => state.user.is_login);

  const MainCT = [
    { value: "2D", label: "2D" },
    { value: "3D", label: "3D" },
  ];
  const option_2 = [
    { value: "피규어", label: "피규어" },
    { value: "인형", label: "인형" },
    { value: "키링/스트랩/아크릴", label: "키링/스트랩/아크릴" },
    { value: "포스터/태피스트리", label: "포스터/태피스트리" },
    { value: "문구/데스크 용품", label: "문구/데스크 용품" },
    { value: "액세서리", label: "액세서리" },
    { value: "CD/블루레이", label: "CD/블루레이" },
    { value: "비공식굿즈", label: "비공식굿즈" },
    { value: "기타", label: "기타" },
  ];

  const option_3 = [
    { value: "인형", label: "인형" },
    { value: "키링/스트랩/아크릴", label: "키링/스트랩/아크릴" },
    { value: "포토카드", label: "포토카드" },
    { value: "포스터", label: "포스터" },
    { value: "문구/데스크 용품", label: "문구/데스크 용품" },
    { value: "액세서리", label: "액세서리" },
    { value: "뷰티제품", label: "뷰티제품" },
    { value: "CD", label: "CD" },
    { value: "서적", label: "서적" },
    { value: "비공식굿즈", label: "비공식굿즈" },
    { value: "기타", label: "기타" },
  ];

  return (
    <GridBox>
      <Nav>
        <Top>
          <Left></Left>

          <Right>
            {/* 정보 */}
            <Information>
              <About_P>about OKU</About_P>
              <About_T>about Team</About_T>
              {/* 개인정보기능 */}
              <Signup
                onClick={() => {
                  history.push("/Signup");
                }}
              >
                회원가입
              </Signup>
              <p style={{ fontSize: "12px", color: "#868686" }}>/</p>
              <Login
                onClick={() => {
                  history.push("/Login");
                }}
              >
                로그인
              </Login>
              <Mypage>마이페이지</Mypage>
            </Information>
          </Right>
        </Top>

        <Bottom>
          <Left>
            <Category>
              {/* 카테고리 리스트 방식 */}
              {/* <ListHover/> */}
              <ListBtn />

              <Mainselectbox>
                <Select placeholder="대분류" onChange={handleMainCategory} value={MainCT.find((obj) => obj.value === MainCT)} options={MainCT} />
              </Mainselectbox>
              {mainct === "" && (
                <SubSelectbox>
                  <Select placeholder="중분류" onChange={handleSubCategory} />
                </SubSelectbox>
              )}

              {/* 2D일 때 */}
              {mainct === "2D" && (
                <SubSelectbox>
                  <Select placeholder="중분류" onChange={handleSubCategory} options={option_2} />
                </SubSelectbox>
              )}
              {/* 3D일 때 */}
              {mainct === "3D" && (
                <SubSelectbox>
                  <Select placeholder="중분류" onChange={handleSubCategory} options={option_3} />
                </SubSelectbox>
              )}
            </Category>
          </Left>

          <Middle>
            {/* 로고 */}
            <Logo
              onClick={() => {
                history.push("/");
              }}
            >
              <img alt="로고이미지" style={{ width: "117.8px", height: "58px", cursor: "pointer" }} src={MainLogo} />
            </Logo>
          </Middle>

          <Right>
            {/* 기능버튼 */}
            <Regist_btn>
              <div style={{ width: "194px", display: "flex" }}>
                <Search
                  type="text"
                  placeholder="검색하기"
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (window.event.keyCode === 13) {
                      SearchProduct();
                    }
                  }}
                />
                <img
                  style={{
                    margin: "5px 0 0 -1px",
                    borderBottom: "2px solid",
                    width: "29.6px",
                    height: "29.6px",
                    zIndex: "1",
                    cursor: "pointer",
                  }}
                  src={Submit}
                />
              </div>
              <Ring>
                <DetailRing />
              </Ring>
              <p>|</p>
              <Chat>
                <img src={List} />
              </Chat>
              <p>|</p>
              <Regist_product
                onClick={() => {
                  history.push("/ProductUpload");
                }}
              >
                <img src={List} />
              </Regist_product>
            </Regist_btn>
          </Right>
        </Bottom>
      </Nav>
    </GridBox>
  );
};

// 큰 틀
const GridBox = styled.div`
  max-width: 1920px;
  box-shadow: 0 4px 15px 0 rgba(111, 111, 111, 0.16);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
`;

const Nav = styled.div`
  margin: 0 auto;
  height: 151px;
  padding: 30px 215px 27px;
  background-color: #ffffff;
`;

// 틀 내부 Grid
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

// 박스 나누기
const Left = styled.div`
  display: flex;
`;
const Middle = styled.div`
  margin-botton: 32px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

// 개개인정보
const Information = styled.div`
  display: flex;
`;
const About_T = styled.p`
  font-size: 12px;
  cursor: pointer;
  width: 68px;
  margin: 0 21px;
  color: #868686;
`;

const About_P = styled.p`
  font-size: 12px;
  cursor: pointer;
  color: #868686;
`;
const Signup = styled.p`
  font-size: 12px;
  cursor: pointer;
  margin-right: 3px;
  color: #868686;
`;
const Login = styled.p`
  font-size: 12px;
  cursor: pointer;
  margin-right: 21px;
  color: #868686;
`;
const Mypage = styled.p`
  font-size: 12px;
  cursor: pointer;
  color: #868686;
`;

// 틀 내부 Grid
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 93px;
  margin: 0 0 0 0;
`;

// 로고
const Logo = styled.div`
  width: 117.8px;
  height: 58px;
  margin: 11px 0 0 0;
`;

// 카테고리
const Category = styled.div`
  margin: 48px 0 0 0;
  display: flex;
`;
const Mainselectbox = styled.div`
  width: 147px;
  margin: 0 30px 0 38px;
`;
const SubSelectbox = styled.div`
  width: 200px;
`;

// 검색창
const Search = styled.input`
  width: 154.4px;
  height: 34.6px;
  border: 1px solid #00ff0000;
  transition: 0.4s;
  border-bottom: 2px solid;
  font-size: 16px;
  :focus {
    outline: none;
  }
  :hover {
    width: 164.4px;
  }
`;

// 버튼들
const Regist_btn = styled.div`
  display: flex;
  text-align: Right;
  margin: 47px 0 0 0;
`;
// 알림 버튼
const Ring = styled.p`
  cursor: pointer;
  margin: 0 15px 0 39px;
  width: 69px;
  height: 15px;
`;

// 상품등록버튼
const Regist_product = styled.div`
  cursor: pointer;
  margin: 0 0 0 15px;
  width: 69px;
  height: 15px;
`;
// 채팅버튼
const Chat = styled.div`
  cursor: pointer;
  margin: 0 15px 0 15px;
  width: 69px;
  height: 15px;
`;

export default Header;
