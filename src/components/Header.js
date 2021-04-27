import React from "react";
import styled from "styled-components";

import Select from "react-select";
import { history } from "../redux/configureStore";

import MainLogo from "images/logo.png";
import Submit from "images/search.png";
import List from "images/list.png";

const Header = (props) => {
  const option_1 = [
    { value: "BackEnd", label: "BackEnd" },
    { value: "FrontEnd", label: "FrontEnd" },
    { value: "Designer", label: "Designer" },
  ];
  const option_2 = [
    { value: "용현", label: "용현" },
    { value: "성목", label: "성목" },
    { value: "경민", label: "경민" },
    { value: "가연", label: "가연" },
    { value: "연재", label: "연재" },
    { value: "소희", label: "소희" },
    { value: "유진", label: "유진" },
  ];
  return (
    <Nav>
      <Head>
        <Left>
          <About_P>about OKU</About_P>
          <About_T>about Team</About_T>
        </Left>
        <Right>
          <Signup
            onClick={() => {
              history.push("/Signup");
            }}
          >
            회원가입
          </Signup>
          <Login
            onClick={() => {
              history.push("/Login");
            }}
          >
            로그인
          </Login>
          <Mypage>마이페이지</Mypage>
          <Ring>알림</Ring>
        </Right>
      </Head>
      <Middle>
        <Logo onClick={()=>{
          history.push("/")
        }}>
          <a  onClick={() => (
            history.push("/")
          )}>
              <img style={{
                  width: "200px",
                  height: "100px",
                  cursor: "pointer",
                }}
                src={MainLogo}
              />
            </a>
            </Logo>
            <div>
            <Search placeholder="상품명을 입력해주세요.">
            
            </Search>
            <img style={{
                  display : "absolute",
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  marginLeft:"-50px",
                  marginBottom : "-5px",
                }}
                src={Submit}
              />
              </div>
            <Regist_btn>
              <Regist_product>
                  물건등록
              </Regist_product>
              <Chat>
                  채팅보기
              </Chat>
            </Regist_btn>
            </Middle>
            <Bottom>

              <Category>
                <img className="gory" style={{ width: "30px", height: "30px",}} src={List} />
                
              </Category>
              <CategoryList>
                    <a href="#">2D</a><br/>
                    <a href="#">3D</a>
                </CategoryList>
              
              <CategorySelect>
              <MainCategory>
                <Select  placeholder="전체카테고리"  options={option_1} isClearable  />
              </MainCategory>
              <MiddleCategory >
                <Select placeholder="중분류" options={option_2} isClearable  />
              </MiddleCategory>
              </CategorySelect>
              
            </Bottom>
    </Nav>
  );
};

const Nav = styled.div`
min-width: 1030px;
width : 1030px;
margin : 0 auto;
height : 200px;

`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

// 팀에대한 정보
const Left = styled.div`
  display: flex;
  flex-direction: row;
`;

const About_T = styled.p`
  cursor: pointer;
  margin-left: 30px;
`;

const About_P = styled.p`
  cursor: pointer;
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
`;

const Signup = styled.p`
  cursor: pointer;
`;
const Login = styled.p`
  cursor: pointer;
  margin: 0 30px;
`;
const Mypage = styled.p`
  cursor: pointer;
`;
const Ring = styled.p`
  cursor: pointer;
  margin-left: 30px;
`;

const Middle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div`
margin :32px 0 0 30px;
`;

const Search = styled.input`
margin : 40px 20px;
width : 400px;
height : 40px;
border : 2px solid #  D300FF;

`;

const Regist_btn = styled.div`
  margin: 40px 50px;
  display: flex;
`;

const Regist_product = styled.div`
  margin-right: 60px;
  cursor: pointer;
`;

const Chat = styled.div`
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

// dropdownmenu
const CategoryList =  styled.div`
margin-top : 30px;
display : none;
position : absolute;
min-width : 100px;
z-index : 1;

`;

// menu buttond
const Category = styled.div`
<<<<<<< HEAD
padding : 10px;
display : flex;
& >.gory :hover ${CategoryList} {
  display : block
  background :red;
}
`;


const CategorySelect = styled.div`
  display: flex;
`;

const MainCategory = styled.div`
  width: 170px;
`;

const MiddleCategory = styled.div`
  width: 170px;
  margin: 0 10px 0 10px;
`;

export default Header;
