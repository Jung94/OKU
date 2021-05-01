import React, {useState} from "react";
import styled from "styled-components";

import ListBtn from 'components/ListBtn';
import ListHover from 'components/ListHover';
import DetailRing from 'components/DetailRing';

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
          {/* 로고 */}
          <Logo onClick={() => { history.push("/"); }}>
              <img alt="로고이미지"
                style={{ width: "130px", height: "50px", cursor: "pointer" }}
                src={MainLogo}/>
          </Logo>
        </Left>

        <Right>
          {/* 정보 */}
          <Information>
            <About_P>
              about OKU
            </About_P>
            <About_T>
              about Team
            </About_T>

            {/* 개인정보기능 */}
            <Signup onClick={() => { history.push("/Signup"); }}>
              회원가입
            </Signup>
            <p>
              /
            </p>
            <Login onClick={() => { history.push("/Login"); }}>
              로그인
            </Login>
          </Information>

          {/* 기능버튼 */}
          <Regist_btn>
            <Mypage>
              <img src={List}/>
            </Mypage>
            <Ring>
              <DetailRing/>
            </Ring>
            <Chat>
              <img src={List}/>
            </Chat>
            <Regist_product
              onClick={() =>{ history.push("/ProductUpload");}}>
              상품등록
            </Regist_product>
          </Regist_btn>
        </Right>
      </Head>


      <Middle>

        <Left>
        <Category>
          {/* 카테고리 리스트 방식 */}
          {/* <ListHover/> */}
          <ListBtn/>
        </Category>
        </Left>

        <Right>
          <div style={{ padding : "0 13px" }}>
            <Search placeholder="상품명을 입력해주세요."></Search>
          </div>
          <img alt="등록이미지"
                style={{
                zIndex : "100",
                display: "flex",
                width: "20px",
                height: "20px",
                cursor: "pointer",
                margin : "-38px 0 0 385px"}}
                src={Submit}/>
        </Right>
      </Middle>
  
    </Nav>
  );
};

// 큰 틀 
const Nav = styled.div`
  min-width: 1030px;
  width: 1030px;
  margin: 0 auto;
  height: 200px;
`;

// 틀 내부 Grid 
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;


// 박스 나누기
const Left = styled.div`
  display: flex;
  flex-direction: row;
`;
const Right = styled.div`
  display: flex;
flex-direction: column;

`;


// 개개인정보
const Information = styled.div`
display : flex;
margin : 0 0 0 48px;
`;
const About_T = styled.p`
  cursor: pointer;
  margin: 0 20px;
`;

const About_P = styled.p`
  cursor: pointer;
`;
const Signup = styled.p`
  cursor: pointer;
  margin-right: 3px;
`;
const Login = styled.p`
  cursor: pointer;
  margin: 0 20px 0 3px;
`;
const Mypage = styled.p`
  cursor: pointer;
`;

const Ring = styled.p`
  cursor: pointer;
  margin : 0px 10px;
`;

// 틀 내부 Grid 
const Middle = styled.div`
  height : 60px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`; 

// 로고 
const Logo = styled.div`
  margin: 25px auto;
`;

// 카테고리
const Category = styled.div`
padding : 10px;
display : flex;
margin : 0px 0 10px 0;
`;

// 검색창
const Search = styled.input`
  margin: 5px 0 10px 30px ;
  width: 370px;
  height: 40px;
  border: 2px solid #d300ff;
`;

// 버튼들 
const Regist_btn = styled.div`
  display: flex;
  margin : 23px 0 0 190px;
  text-align : Right ;
`;

// 상품등록버튼
const Regist_product = styled.div`
  cursor: pointer;
 
`;
// 채팅버튼
const Chat = styled.div`
  cursor: pointer;
  margin-right : 15px;
`;


export default Header;
