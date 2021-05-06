import React, { useRef, createRef, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "elements/";
import Select from "react-select";
import { history } from "redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as uploadActions } from "redux/modules/upload";
import { input_priceComma } from "shared/common";
import { Upload } from "components/";

import DaumPostcode from "react-daum-postcode";

// React.memo => re-render 방지용임
const ProductUpload = React.memo((props) => {
  const dispatch = useDispatch();

  const fileInput = useRef();
  const postalAddressInfo = useRef();
  const addressInfo = useRef();
  const detailAddressInfo = useRef();

  const progress = useSelector((state) => state.upload.progress);
  const preview = useSelector((state) => state.upload.preview_image);

  //   preview 설정
  const handleChange = (e) => {
    // e.target => input : input이 가진 files 객체를 살펴보기
    // 두 줄이 같다.
    console.log(e.target.files);
    console.log(fileInput.current.files);

    if (e.target.files) {
      const fileInputArray = Array.from(e.target.files).map((f) => URL.createObjectURL(f));
      console.log(fileInputArray);
    }

    // iterable 객체 안에 들어있는 파일
    console.log(fileInput.current.files[0]);
    const reader = new FileReader();

    const file = e.target.files[0];
    reader.readAsDataURL(file); // 파일 내용을 읽어오기

    // 읽기가 끝나면 발생하는 이벤트 핸들러
    reader.onloadend = () => {
      dispatch(uploadActions.setPreview([reader.result]));
    };
  };

  const MainCT = [
    { value: "2D", label: "2D" },
    { value: "3D", label: "3D" },
  ];
  const D2CT = [
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
  const D3CT = [
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
  const D4CT = [
    { value: "10800000", label: "3시간" },
    { value: "21600000", label: "6시간" },
    { value: "43200000", label: "12시간" },
    { value: "86400000", label: "1일" },
    { value: "259200000", label: "3일" },
    { value: "604800000", label: "7일" },
    { value: "1209600000", label: "14일" },
  ];

  const [title, setTitle] = useState("");
  const [cateBig, setCateBig] = useState("");
  const [cateSmall, setCateSmall] = useState("");
  const [region, setRegion] = useState("");

  const [productState, setProductState] = useState("");
  const [deadline, setDeadline] = useState("");
  const [lowbidFake, setLowbidFake] = useState("");
  const lowbid = parseInt(lowbidFake.replace(/,/g, ""));
  const [sucbidFake, setSucbidFake] = useState("");
  const sucbid = parseInt(sucbidFake.replace(/,/g, ""));
  const [delivery, setDelivery] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [cate, setCate] = useState(D2CT);

  const handleCateBig = (e) => {
    setCateBig(e.value);
    if (cateBig === "3D") {
      setCate(D3CT);
    } else {
      setCate(D2CT);
    }
  };

  const handleCateSmall = (e) => {
    setCateSmall(e.value);
  };

  const handleDeadline = (e) => {
    setDeadline(parseInt(e.value));
  };

  const handleLowbid = (e) => {
    let real = input_priceComma(e.target.value);
    setLowbidFake(real);
  };

  const handleSucbid = (e) => {
    let real2 = input_priceComma(e.target.value);
    setSucbidFake(real2);
  };

  const handleDelivery = (e) => {
    if (e.target.value === "배송비 별도") {
      setDelivery(true);
    } else {
      setDelivery(false);
    }
  };

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
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setRegion(fullAddress);
    setIsPostOpen(false);
  };

  const _payment_info = {
    userAddress: `${region}`,
  };

  const addPost = () => {
    // console.log(title, cateBig, cateSmall, region);
    // console.log(productState, deadline, lowbid, sucbid, delivery, productDesc, tags);
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert("파일을 선택해주세요!");
      return;
    }
    const imageArray = [];
    if (fileInput.current.files[0]) {
      fileInput.current.files.forEach((f) => {
        imageArray.push({ ...f });
      });
    }
    // const imageArray = [fileInput.current.files[0], fileInput.current.files[1], fileInput.current.files[2]];
    dispatch(
      uploadActions.addPostAPI(imageArray, title, cateBig, cateSmall, region, productState, deadline, lowbid, sucbid, delivery, productDesc, tags)
    );
  };

  return (
    <Wrap>
      <Title>상품등록</Title>

      <Outerbox style={{ borderTop: "1px solid rgba(0, 0, 0, 0.4" }}>
        <InnerboxL>
          <p>
            상품이미지<span style={{ color: "red" }}>*</span>
          </p>
        </InnerboxL>
        <InnerboxR>
          {preview ? (
            preview.map((p, idx) => {
              // console.log(p);
              return <img key={idx} alt="상품이미지" style={{ width: "300px" }} src={p} />;
            })
          ) : (
            <img alt="상품이미지" style={{ width: "300px" }} src={"http://via.placeholder.com/400x300"} />
          )}
          <label for="fileInput" style={{ display: "block", backgroundColor: "red", width: "30px", height: "30px" }}>
            <input style={{ display: "none" }} id="fileInput" type="file" onChange={handleChange} disabled={progress} ref={fileInput} multiple />
          </label>
        </InnerboxR>
      </Outerbox>

      <Outerbox>
        <InnerboxL>
          <p>
            제목<span style={{ color: "red" }}>*</span>
          </p>
        </InnerboxL>
        <InnerboxR style={{ margin: "20px 0 10px" }}>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="상품 제목을 입력해주세요."
            style={{ width: "500px", height: "44px", fontSize: "16px", padding: "0 0 2px 10px" }}
          ></input>
          <a style={{ fontSize: "14px", color: "grey", margin: "10px" }}>0/25</a>
        </InnerboxR>
      </Outerbox>

      <Outerbox>
        <InnerboxL style={{ width: "190px" }}>
          <p>
            카테고리<span style={{ color: "red" }}>*</span>
          </p>
        </InnerboxL>
        <InnerboxR style={{ display: "flex", width: "100%", margin: "24px 0 14px" }}>
          <div style={{ width: "100px", margin: "0 20px 0 0" }}>
            <Select onChange={handleCateBig} options={MainCT} value={MainCT.find((obj) => obj.value === cateBig)} placeholder="2D / 3D" />
          </div>
          {/* <div style={{width: "150px", margin: "0"}}>
              <Select onChange={handleCateSmall} options={cate} value={cate.find(obj => obj.value === cateSmall)} placeholder="상세 분류" />
            </div> */}
          {cateBig === "3D" && (
            <React.Fragment>
              <div style={{ width: "200px", margin: "0" }}>
                <Select onChange={handleCateSmall} value={D2CT.find((obj) => obj.value === cateSmall)} placeholder="3D 상세 분류" options={D2CT} />
              </div>
            </React.Fragment>
          )}
          {cateBig === "2D" && (
            <React.Fragment>
              <div style={{ width: "200px", margin: "0" }}>
                <Select onChange={handleCateSmall} value={D3CT.find((obj) => obj.value === cateSmall)} placeholder="2D 상세 분류" options={D3CT} />
              </div>
            </React.Fragment>
          )}
        </InnerboxR>
      </Outerbox>

      <Outerbox style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.4" }}>
        <InnerboxL>
          <p>희망 거래 장소</p>
        </InnerboxL>
        <InnerboxR>
          <div style={{ width: "100%", margin: "29px 0 0" }}>
            <Button
              text="주소 검색"
              _onClick={() => {
                setIsPostOpen(true);
              }}
            >
              주소 검색
            </Button>
            <Button text="지하철 검색">지하철 검색</Button>
          </div>
          <div style={{ width: "100%", height: "50px", margin: "0 0 10px" }}>
            <RegionBox>
              <RegionInput
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                }}
                type="text"
                placeholder="희망 거래 장소를 입력해주세요."
              ></RegionInput>
            </RegionBox>
          </div>
        </InnerboxR>
      </Outerbox>

      <div style={{ marginBottom: "100px" }}></div>

      <Outerbox style={{ borderTop: "1px solid rgba(0, 0, 0, 0.4" }}>
        <InnerboxL>
          <p>
            상품 상태 등급<span style={{ color: "red" }}>*</span>
          </p>
        </InnerboxL>

        <InnerboxR>
          <form
            onChange={(e) => {
              setProductState(e.target.value);
            }}
            style={{ display: "flex", justifyContent: "flex-start", gap: "50px", width: "700px", margin: "30px 0 0" }}
          >
            <label>
              <input type="radio" name="state" value="A급" style={{ margin: "0 8px 0 0" }} />
              A급
            </label>
            <label>
              <input type="radio" name="state" value="B급" style={{ margin: "0 8px 0 0" }} />
              B급
            </label>
            <label>
              <input type="radio" name="state" value="C급" style={{ margin: "0 8px 0 0" }} />
              C급
            </label>
            <label>
              <input type="radio" name="state" value="D급" style={{ margin: "0 8px 0 0" }} />
              D급
            </label>
          </form>
        </InnerboxR>
      </Outerbox>

      <Outerbox>
        <InnerboxL style={{ width: "160px" }}>
          <p>
            경매 기간<span style={{ color: "red" }}>*</span>
          </p>
        </InnerboxL>
        <InnerboxR style={{ width: "150px", margin: "23px 0 0" }}>
          <Select onChange={handleDeadline} value={D4CT.find((obj) => obj.value === deadline)} placeholder="경매 기간" options={D4CT} />
        </InnerboxR>
      </Outerbox>

      <Outerbox>
        <InnerboxL>
          <p>
            최소입찰가<span style={{ color: "red" }}>*</span>
          </p>
        </InnerboxL>
        <InnerboxR style={{ margin: "20px 0 0" }}>
          <SignupBox>
            <SignupInput
              onChange={handleLowbid}
              value={lowbidFake}
              style={{ fontSize: "17px", padding: "2px 6px 0 0", textAlign: "right" }}
              type="text"
            />
            <span>원</span>
          </SignupBox>
        </InnerboxR>
      </Outerbox>

      <Outerbox>
        <InnerboxL>
          <p>
            즉시 낙찰가<span style={{ color: "red" }}>*</span>
          </p>
        </InnerboxL>
        <InnerboxR style={{ margin: "20px 0 0" }}>
          <SignupBox>
            <SignupInput
              onChange={handleSucbid}
              value={sucbidFake}
              style={{ fontSize: "17px", padding: "2px 6px 0 0", textAlign: "right" }}
              type="text"
            />
            <span>원</span>
          </SignupBox>
        </InnerboxR>
      </Outerbox>

      <Outerbox>
        <InnerboxL>
          <p>
            상품 배송 정보<span style={{ color: "red" }}>*</span>
          </p>
        </InnerboxL>
        <InnerboxR>
          <form onChange={handleDelivery} style={{ display: "flex", justifyContent: "flex-start", gap: "50px", width: "700px", margin: "30px 0 0" }}>
            <label>
              <input type="radio" name="delivery" value="무료 배송(혹은 직거래일 경우)" style={{ margin: "0 8px 0 0" }} />
              무료 배송(or 직거래일 경우)
            </label>
            <label>
              <input type="radio" name="delivery" value="배송비 별도" style={{ margin: "0 8px 0 0" }} />
              배송비 별도
            </label>
          </form>
        </InnerboxR>
      </Outerbox>

      <Outerbox>
        <InnerboxL>
          <p>
            상품 상세 정보<span style={{ color: "red" }}>*</span>
          </p>
        </InnerboxL>
        <InnerboxR style={{ margin: "21px 0 17px" }}>
          <textarea
            onChange={(e) => {
              setProductDesc(e.target.value);
            }}
            placeholder="상품 설명을 입력해주세요."
            style={{ padding: "6px 10px", marginTop: "13px", width: "700px", height: "200px", fontSize: "14px" }}
            rows="10"
          ></textarea>
        </InnerboxR>
      </Outerbox>

      <Outerbox style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.4" }}>
        <InnerboxL>
          <p>상품 관련 태그</p>
        </InnerboxL>
        <InnerboxR>
          <input
            onChange={(e) => {
              setTags(e.target.value);
            }}
            type="text"
            placeholder="태그는 띄어쓰기로 구분됩니다. ex. 피규어 포스터 카드"
            style={{ width: "700px", height: "40px", padding: "10px", margin: "22px 0 0", fontSize: "14px" }}
          ></input>
        </InnerboxR>
      </Outerbox>

      <Button _onClick={addPost}>등록하기</Button>

      {isPostOpen && (
        <Modal>
          <ModalSection>
            <DaumPostcode onComplete={handleComplete} />
          </ModalSection>
          <ModalBack onClick={() => setIsPostOpen(false)}></ModalBack>
        </Modal>
      )}
    </Wrap>
  );
});

Upload.defaultProps = {
  onChange: (img) => {},
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
  letter-spacing: -0.05em;
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
  letter-spacing: -0.05em;
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

const InnerboxL = styled.div`
  width: 190px;
  padding: 30px 0 30px 10px;
  box-sizing: border-box;
  // border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const InnerboxR = styled.div`
  width: 100%;
  padding: 0 0 10px;
  box-sizing: border-box;
`;

const GridSub = styled.div`
  margin: 30px 0;
`;

export default ProductUpload;
