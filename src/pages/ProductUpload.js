import React from "react";
import styled from "styled-components";
import Select from 'react-select'
import { history } from "../redux/configureStore";

// import Question from "images/question.png";

const ProductUpload = (props) => {
  const MainCT = [
    { value: '2D', label: '2D' },
    { value: '3D', label: '3D' },
  ]

  const D2CT = [
    { value: '피규어', label: '피규어' },
    { value: '포토카드', label: '포토카드' },
    { value: '포스터', label: '포스터' }
  ]
  const D3CT = [
    { value: '앨범', label: '앨범'},
    { value: '굿즈', label: '굿즈' },
    { value: '키링', label: '키링' }
  ]
  
  return (
    
    <div>
    <h1 style={{textAlign : "center"}}>상품등록</h1> 
  <GridBox>
    <GridMain>
      <div style={{display:"flex"}}>
      <P_title>
        
        <h3 style={{margin:"25px auto", display: "flex"}}> 제목
          <Require>
            *
          </Require>
        </h3>
      </P_title>
      <TitleInput>
        <input placeholder="상품 제목을 입력해주세요." style={{width:"500px", height:"40px", margin : "20px 20px", fontSize:"17px"}}></input>
        <a style={{fontSize:"14px", color:"grey"}}>0/25</a>
      </TitleInput>
    </div>
    
    <div style={{display:"flex"}}>
      <P_category>
        <h3 style={{margin:"25px auto"}}>카테고리
        </h3>
      </P_category>
      <CategorySelector>
        <div style={{width: "200px", margin : "20px 20px"}}>
          <Select  options={MainCT} />
        </div>
        <div style={{width: "200px", margin : "20px 0"}} >
        <Select options={D2CT} />
        </div>
      </CategorySelector>
    </div>

    <div style={{display:"flex"}}>
      <P_status>
        <h3 style={{margin:"25px auto", display:"flex"}}>
          상태
          <Question>
            {/* <img src={}/> */}
            <div>
              ?
            </div>

          </Question>
        </h3>
      </P_status>
      <P_grade>
      <div style={{width: "110px", margin : "25px 0px 0px 20px"}} >
          <input type="checkbox" />
          <label> A급 </label>
        </div>
        <div style={{width: "110px", margin : "25px 0px"}} >
          <input type="checkbox" />
          <label> B급 </label>
        </div>
        <div style={{width: "110px", margin : "25px 0px"}} >
          <input type="checkbox" />
          <label> C급 </label>
        </div>
        <div style={{width: "110px", margin : "25px 0px"}} >
          <input type="checkbox" />
          <label> D급 </label>
        </div>
      </P_grade>
    </div>

    <div style={{display:"flex"}}>
      <P_detail>
        <h3 style={{margin:"auto 80px", display:"flex"}}>
          설명
            <Require>
                *
            </Require>
        </h3>
      </P_detail>
      <Detail_information>
        <textarea placeholder="상품 설명을 입력해주세요." style={{width : "710px", margin : "20px 20px", fontSize:"17px"}} rows="10"></textarea>
        <a style={{margin:"0 0 0 -65px", fontSize:"14px", color:"grey" }}>0/500</a>
        <input type='file' 
          accept='image/jpg,impge/png,image/jpeg,image/gif' 
          name='profile_img' >
        </input>
      </Detail_information>
    </div>

    <div style={{display:"flex"}}>
      <P_tag>
        <h3 style={{margin:"25px auto"}}>연관태그</h3>
      </P_tag>
      <Tag_input>
        <input placeholder="태그를 입력해주세요." style={{width:"700px", height:"40px", margin : "20px 20px", fontSize:"14px"}}></input>
      </Tag_input>
    </div>

    <div style={{display:"flex"}}>
      <Trade_area>
        <h3 style={{margin:"25px auto"}}>거래지역</h3>
      </Trade_area>
      <AreaSelector>
        다음 API를 사용하고싶습니다 !!!!!
      </AreaSelector>
    </div>

    </GridMain>
    <GridSub>

    <div style={{display:"flex"}}>
      <Trade_deadline>
        <h3 style={{margin:"25px auto",display:"flex"}}>경매마감
          <Question>
              {/* <img src={}/> */}
              <div>
                ?
              </div>
          </Question>
        </h3>
      </Trade_deadline>
      <DateSelector>
        달력
      </DateSelector>
    </div>

    <div style={{display:"flex"}}>
      <Minimum_bid>
        <h3 style={{margin:"25px auto", display:"flex"}}>최소입찰가
          <Question>
              {/* <img src={}/> */}
              <div>
                ?
              </div>
          </Question>
        </h3>
      </Minimum_bid>
      <Min_bid>
        <input placeholder="최소 입찰가를 입력해주세요." style={{width:"200px", height:"40px", margin : "20px 20px", fontSize:"15px"}}></input>원
      </Min_bid>
    </div>

    <div style={{display:"flex"}}>
      <Imediate_bid>
        <h3 style={{margin:"25px auto", display:"flex"}}>즉시 낙찰가
          <Question>
              {/* <img src={}/> */}
              <div>
                ?
              </div>
          </Question>
        </h3>
      </Imediate_bid>
      <Im_bid>
        <input placeholder="즉시 낙찰가를 입력해주세요." style={{width:"200px", height:"40px", margin : "20px 20px" , fontSize:"15px"}}></input>원
      </Im_bid>
    </div>

    <div style={{display:"flex"}}>
      <Shipping_cost>
        <h3 style={{margin:"25px auto"}}>배송비</h3>
      </Shipping_cost>
      <Ship_cost>
        <div style={{width: "110px", margin : "25px 20px"}} >
          <input type="checkbox" />
          <label>  배송비 포함 </label>
        </div>
      </Ship_cost>
    
    </div>
    </GridSub>
      <Enroll>
        <button style={{width :"1000px", height:"70px", border:"2px solid #222", borderRadius:"7px", background:"#d300ff", fontSize:"36px", color:"white", cursor : "pointer"}}
        onClick={()=> {
          window.alert("등록완료")
          history.push("/")
        }}
        >등록하기</button>
      </Enroll>
  </GridBox>
  </div>
  );
};

const Question = styled.div`
}
`;

const GridBox = styled.div`
min-width: 1030px;
width : 1030px;
height : 100%;
background  : #EEE;
margin : 0 auto;
padding : 15px;
`;
const Require =styled.div`
color : red;
`;
const GridMain = styled.div`
`;

const P_title = styled.div`
display : flex;
width : 210px;
height :80px;
background : #8d192b;
border : 1px solid #111;
`;
const TitleInput = styled.div`
width : 810px;
height :80px;
background : #ffa100;
border : 1px solid #111;
`;
const P_category = styled.div`
display : flex;
width : 210px;
height :80px;
background : #8d192b;
border : 1px solid #111;
`;
const CategorySelector = styled.div`
width : 810px;
height :80px;
background : #ffa100;
border : 1px solid #111;
display:flex
`;

const P_status = styled.div`
display : flex;
width : 210px;
height :80px;
background : #8d192b;
border : 1px solid #111;
`;

const P_grade = styled.div`
width : 810px;
height :80px;
background : #ffa100;
border : 1px solid #111;
display:flex
`;

const P_detail = styled.div`
display : flex;
width : 210px;
height :400px;
background : #8d192b;
border : 1px solid #111;
`;

const Detail_information = styled.div`
width : 810px;
height :400px;
background : #ffa100;
border : 1px solid #111;
`;

const P_tag = styled.div`
display : flex;
width : 210px;
height :80px;
background : #8d192b;
border : 1px solid #111;
`;

const Tag_input = styled.div`
width : 810px;
height :80px;
background : #ffa100;
border : 1px solid #111;
`;

const Trade_area = styled.div`
display : flex;
width : 210px;
height :80px;
background : #8d192b;
border : 1px solid #111;
`;

const AreaSelector = styled.div`
width : 810px;
height :80px;
background : #ffa100;
border : 1px solid #111;
`;

const GridSub = styled.div`
margin : 30px 0;
`;

const Trade_deadline = styled.div`
display : flex;
width : 210px;
height :80px;
background : #8d192b;
border : 1px solid #111;
`;

const DateSelector =styled.div`
width : 810px;
height :80px;
background : #ffa100;
border : 1px solid #111;
`;

const Minimum_bid = styled.div`
display : flex;
width : 210px;
height :80px;
background : #8d192b;
border : 1px solid #111;
`;
const Min_bid = styled.div`
width : 810px;
height :80px;
background : #ffa100;
border : 1px solid #111;
`;
const Imediate_bid = styled.div`
display : flex;
width : 210px;
height :80px;
background : #8d192b;
border : 1px solid #111;
`;
const Im_bid = styled.div`
width : 810px;
height :80px;
background : #ffa100;
border : 1px solid #111;
`;
const Shipping_cost = styled.div`
display : flex;
width : 210px;
height :80px;
background : #8d192b;
border : 1px solid #111;
`;
const Ship_cost = styled.div`
display :flex;
width : 810px;
height :80px;
background : #ffa100;
border : 1px solid #111;
`;

const Enroll =styled.div`
`;
export default ProductUpload;
