import React, { useRef, createRef, useCallback, useState, useEffect } from 'react';
import styled from "styled-components";
import Select from 'react-select'
import { history } from "redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "redux/modules/register";
import { input_priceComma } from 'shared/common';

import DaumPostcode from 'react-daum-postcode';

const ProductUpload = (props) => {

  const dispatch = useDispatch();

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
  const D4CT = [
    { value: '10800000', label: '3시간'},
    { value: '21600000', label: '6시간' },
    { value: '43200000', label: '12시간' },
    { value: '86400000', label: '1일' },
    { value: '259200000', label: '3일' },
    { value: '604800000', label: '7일' },
    { value: '1209600000', label: '14일' },
  ]

  const addPost = () => {
    console.log(typeof(lowbidFake), lowbidFake);
    console.log(typeof(lowbid), lowbid);
    // dispatch(postActions.addPostAPI(image, title, cateBig, cateSmall, region, productState, deadline, lowbid, sucbid, productDesc, tags));
    // window.alert("상품 등록을 완료하였습니다.");
    // history.push("/")
    
  }

  const [image, setImage] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [cateBig, setCateBig] = React.useState("");
  const [cateSmall, setCateSmall] = React.useState("");
  const [region, setRegion] = React.useState("");

  const [productState, setProductState] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [lowbidFake, setLowbidFake] = React.useState("");
  const lowbid = parseInt(lowbidFake.replace(/,/g, ''));
  const [sucbidFake, setSucbidFake] = React.useState("");
  const sucbid = parseInt(sucbidFake.replace(/,/g, ''));
  const [productDesc, setProductDesc] = React.useState("");
  const [tags, setTags] = React.useState("");

  const handleCateBig = e => {
    setCateBig(e.value);
  }

  const handleCateSmall = e => {
    if (cateBig === "3D") {

    } else {

    }
  }

  const handleDeadline = e => {
    setDeadline(e.value);
  }

  const handleLowbid = (e) => {
    let real = input_priceComma(e.target.value);
    setLowbidFake(real);
  }

  const handleSucbid = (e) => {
    let real2 = input_priceComma(e.target.value);
    setSucbidFake(real2);
  }
  
  

  // const [fileUrl, setFileUrl] = React.useState(null);

  // const processImage = (event) => {
  //   const imageFile = event.target.files[0];
  //   const imageUrl = URL.createObjectURL(imageFile);
  //   setFileUrl(imageUrl);
  // }

  const postalAddressInfo = useRef();
  const addressInfo = useRef();
  const detailAddressInfo = useRef();

  // const [isAddress, setIsAddress] = useState();
  const [isPostOpen, setIsPostOpen] = useState(false); // 주소창 열고 닫기

  // 우편번호 / 주소 찾기
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setRegion(fullAddress);
    setIsPostOpen(false);
  };

  const _payment_info = {
    userAddress: `${region}`
  };
  
  return (
    <Wrap>
      <Title>상품등록</Title>

        <Outerbox style={{borderTop: "1px solid rgba(0, 0, 0, 0.4"}}>
          <Innerbox_L>
                  <p>상품이미지<span style={{color: "red"}}>*</span></p>
          </Innerbox_L>
          <Innerbox_R>
            {/* <Upload src={"https://img.icons8.com/ios/452/image-gallery.png"}/> */}
            <div className="App">
              <img style={{"backgroundColor": "#efefef", "width":"150px", "height" : "150px"}}></img>
              <div>
                <input type="file" accept="image/*" multiple></input>
              </div>
            </div>
          </Innerbox_R>
        </Outerbox>

        <Outerbox>
          <Innerbox_L>
            <p>제목<span style={{color: "red"}}>*</span></p>
          </Innerbox_L>
          <Innerbox_R style={{margin : "20px 0 10px"}}>
            <input onChange={(e) => { setTitle(e.target.value) }} placeholder="상품 제목을 입력해주세요." style={{width:"500px", height:"44px", fontSize:"16px", padding: "0 0 2px 10px"}}></input>
            <a style={{fontSize:"14px", color:"grey", margin: "10px"}}>0/25</a>
          </Innerbox_R>
        </Outerbox>
  
        <Outerbox>
          <Innerbox_L style={{width: "190px"}}>
            <p>카테고리<span style={{color: "red"}}>*</span></p>
          </Innerbox_L>
          <Innerbox_R style={{display: "flex", width: "100%", margin: "24px 0 14px"}}>
            <div style={{width: "150px", margin: "0 20px 0 0"}}>
              <Select onChange={handleCateBig} value={MainCT.find(obj => obj.value === cateBig)} placeholder="2D / 3D" options={MainCT} />
            </div>
            <div style={{width: "150px", margin: "0"}}>
              <Select onChange={handleCateSmall} value={D2CT.find(obj => obj.value === cateSmall)} placeholder="상세 분류" options={D2CT} />
            </div>
          </Innerbox_R>
        </Outerbox>
        
        <Outerbox style={{borderBottom: "1px solid rgba(0, 0, 0, 0.4"}}>
          <Innerbox_L>
            <p>희망 거래 장소</p>
          </Innerbox_L>
          <Innerbox_R >
            <div style={{width: "100%", margin: "29px 0 0"}}>
              <PostalBtn text="주소 검색" onClick={() => {setIsPostOpen(true);}}>주소 검색</PostalBtn>
              <SubwayBtn text="지하철 검색" >지하철 검색</SubwayBtn>
            </div>
            <div style={{width: "100%", height: "50px", margin: "0 0 10px"}}>
              <RegionBox>
                <RegionInput value={region} onChange={(e) => { setRegion(e.target.value) }} type="text" placeholder="희망 거래 장소를 입력해주세요." ></RegionInput>
              </RegionBox>
            </div>
          </Innerbox_R>
        </Outerbox>

        <div style={{marginBottom: "100px"}}>

        </div>

        <Outerbox style={{borderTop: "1px solid rgba(0, 0, 0, 0.4"}}>
          <Innerbox_L>
            <p>상품 상태 등급<span style={{color: "red"}}>*</span></p>
          </Innerbox_L>

          <Innerbox_R>
            <div style={{display: "flex", justifyContent: "flex-start", gap: "50px", width: "700px", margin : "30px 0 0"}} >
              <label><input type="radio" name="state" value="A급" style={{margin : "0 8px 0 0"}} />A급</label>
              <label><input type="radio" name="state" value="B급" style={{margin : "0 8px 0 0"}} />B급</label>
              <label><input type="radio" name="state" value="C급" style={{margin : "0 8px 0 0"}} />C급</label>
              <label><input type="radio" name="state" value="D급" style={{margin : "0 8px 0 0"}} />D급</label>
            </div>
          </Innerbox_R>
        </Outerbox>

        <Outerbox>
          <Innerbox_L style={{width: "160px"}}>
            <p>경매 기간<span style={{color: "red"}}>*</span></p>
          </Innerbox_L>
          <Innerbox_R style={{width: "150px", margin: "23px 0 0"}}>
            <Select onChange={handleDeadline} value={D4CT.find(obj => obj.value === deadline)} placeholder="경매 기간" options={D4CT} />
          </Innerbox_R>
        </Outerbox>

        <Outerbox>
          <Innerbox_L>
            <p>최소입찰가<span style={{color: "red"}}>*</span></p>
          </Innerbox_L>
          <Innerbox_R style={{margin : "20px 0 0"}}>
            <SignupBox>
              <SignupInput onChange={handleLowbid} value={lowbidFake} style={{fontSize: "17px", padding: "2px 6px 0 0", textAlign: "right"}} type="text" /><span>원</span>
            </SignupBox>
          </Innerbox_R>
        </Outerbox>

        <Outerbox>
          <Innerbox_L>
            <p>즉시 낙찰가<span style={{color: "red"}}>*</span></p>
          </Innerbox_L>
          <Innerbox_R style={{margin : "20px 0 0"}}>
            <SignupBox>
              <SignupInput onChange={handleSucbid} value={sucbidFake} style={{fontSize: "17px", padding: "2px 6px 0 0", textAlign: "right"}} type="text" /><span>원</span>
            </SignupBox>
          </Innerbox_R>
        </Outerbox>

        <Outerbox>
          <Innerbox_L>
            <p>상품 배송 정보<span style={{color: "red"}}>*</span></p>
          </Innerbox_L>
          <Innerbox_R>
            <div style={{display: "flex", justifyContent: "flex-start", gap: "50px", width: "700px", margin : "30px 0 0"}} >
              <label><input type="radio" name="delivery" value="무료 배송(혹은 직거래일 경우)" style={{margin : "0 8px 0 0"}} />무료 배송(or 직거래일 경우)</label>
              <label><input type="radio" name="delivery" value="배송비 별도" style={{margin : "0 8px 0 0"}} />배송비 별도</label>
            </div>
          </Innerbox_R>
        </Outerbox>

        <Outerbox>
          <Innerbox_L>
            <p>상품 상세 정보<span style={{color: "red"}}>*</span></p>
          </Innerbox_L>
          <Innerbox_R style={{margin : "21px 0 17px"}}>
            <textarea placeholder="상품 설명을 입력해주세요." style={{padding: "6px 10px", marginTop: "13px", width : "700px", height: "200px", fontSize:"14px"}} rows="10"></textarea>
          </Innerbox_R>
        </Outerbox>

        <Outerbox style={{borderBottom: "1px solid rgba(0, 0, 0, 0.4"}}>
          <Innerbox_L>
            <p>상품 관련 태그</p>
          </Innerbox_L>
          <Innerbox_R>
            <input type="text" placeholder="태그는 띄어쓰기로 구분됩니다  ex. 피규어 포스터 카드" style={{width:"700px", height:"40px", padding:"10px", margin: "22px 0 0", fontSize:"14px"}}></input>
          </Innerbox_R>
        </Outerbox>
      
        <RegisterBtn onClick={addPost} >등록하기</RegisterBtn>

      {isPostOpen && 
        <Modal>
          <ModalSection>
            <DaumPostcode onComplete={handleComplete} />
          </ModalSection>
          <ModalBack onClick={() => setIsPostOpen(false)}>
          </ModalBack>
        </Modal>
      }

    </Wrap>
  );
};

const Modal = styled.div`
  display: flex;
  align-items: center;
  animation: modal-bg-show 0.3s;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 90;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalSection = styled.section`
  width: 90%;
  max-width: 450px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: modal-show 0.3s;
  overflow: hidden;
  z-index: 99;
`;

const ModalBack = styled.div`
  display: flex;
  align-items: center;
  animation: modal-bg-show 0.3s;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 96;
  background-color: transparent;
`;

const PostalBtn = styled.button`
  width: 70px;
  height: 24px;
  // float: right;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 400;
  text-align: center;
  padding: 0 0 1px;
  margin: 0 10px 0 0;
  font-size: 12px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 3px;
  background-color: transparent;

  &:hover {
    color: #fff;
    border: none;
    font-weight: 500;
    background-color: #06afd6;
  }
`;

const SubwayBtn = styled.button`
  width: 70px;
  height: 24px;
  // float: right;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 400;
  text-align: center;
  padding: 0 0 1px;
  margin: 0;
  font-size: 12px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 3px;
  background-color: transparent;

  &:hover {
    color: #fff;
    border: none;
    font-weight: 500;
    background-color: #06afd6;
  }
`;

const RegionBox = styled.div`
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  width: 90%;
  height: 40px;
  margin: 4px 0 15px;
  padding: 8px 0 0;
  box-sizing: border-box;
  overflow: hidden;

  &:focus-within {
    transition: 0.3s;
    border-bottom: 1px solid #06afd6;
  }
`;

const SignupBox = styled.div`
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  width: 150px;
  height: 40px;
  margin: 0 0 15px;
  padding: 8px 0 0;
  box-sizing: border-box;
  overflow: hidden;

  &:focus-within {
    transition: 0.3s;
    border-bottom: 1px solid #06afd6;
  }
`;

const RegionInput = styled.input`
  border: none;
  background-color: transparent;
  box-sizing: border-box;
  letter-spacing: -.05em;
  letter-spacing: 1px;
  overflow: hidden;
  color: #000;
  font-size: 16px;
  outline: none;
  width: 97%;
  height: 27px;
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-size: 0.9rem;
  }
`;

const SignupInput = styled.input`
  border: none;
  background-color: transparent;
  box-sizing: border-box;
  letter-spacing: -.05em;
  letter-spacing: 0.5px;
  overflow: hidden;
  color: #000;
  font-size: 14px;
  outline: none;
  width: 80%;
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-size: 0.8rem;
  }
`;

const Wrap = styled.div`
  // min-width: 1030px;
  width: 1030px;
  margin: 0 auto;
  padding: 50px 0;
  box-sizing: border-box;
`;

const Title = styled.h3`
  font-weight: 500;
  font-size: 21px;
  width: 100%;
  text-align: center;
  margin: 0 0 40px;
`;

const Outerbox = styled.div`
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
`;

const Innerbox_L = styled.div`
  width: 190px;
  padding: 30px 0 30px 10px;
  box-sizing: border-box;
  // border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const Innerbox_R = styled.div`
  width: 100%;
  padding: 0 0 10px;
  box-sizing: border-box
`;


const GridSub = styled.div`
  margin: 30px 0;
`;

const RegisterBtn =styled.button`
  margin: 50px 0;
  padding: 0 0 2px;
  width: 100%;
  height: 58px;
  border: 1px solid #06afd6;
  border-radius: 6px;
  background: #06afd6;
  font-size: 22px;
  font-weight: 400;
  cursor: pointer;
  outline: none;
  color: #fff;

  &:hover {
    transition: 0.2s;
    background-color: transparent;
    border: 1px solid #06afd6;
    color: #06afd6;
  }
`;

export default ProductUpload;
