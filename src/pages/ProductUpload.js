import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Grid, Input, Line, Button, Tag, Text, Profile } from "elements/";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as uploadActions } from "redux/modules/upload";
import { input_priceComma } from "shared/common";
import { Upload } from "components/";

import { Color } from "shared/DesignSys";
import { MainCT, D2CT, D3CT, D4CT } from "shared/Category";

import DaumPostcode from "react-daum-postcode";

// React.memo => re-render 방지용임
const ProductUpload = React.memo((props) => {
  const dispatch = useDispatch();

  const preview = useSelector((state) => state.upload.preview_image);

  const fileInput = useRef();

  const progress = useSelector((state) => state.upload.progress);

  const handleChange = (e) => {
    // e.target => input : input이 가진 files 객체를 살펴보기
    // 두 줄이 같다.
    console.log(e.target.files);
    console.log(fileInput.current.files);

    // if (e.target.files) {
    //   const fileInputArray = Array.from(e.target.files).map((f) => URL.createObjectURL(f));
    //   console.log(fileInputArray);
    // }

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
  const postalAddressInfo = useRef();
  const addressInfo = useRef();
  const detailAddressInfo = useRef();

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

  const addPost = () => {
    // console.log(title, cateBig, cateSmall, region);
    // console.log(productState, deadline, lowbid, sucbid, delivery, productDesc, tags);
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert("파일을 선택해주세요!");
      return;
    }
    // const imageArray = [];
    // if (fileInput.current.files[0]) {
    //   fileInput.current.files.forEach((f) => {
    //     imageArray.push({ ...f });
    //   });
    // }
    // const imageArray = [fileInput.current.files[0], fileInput.current.files[1], fileInput.current.files[2]];
    dispatch(
      uploadActions.addPostAPI(
        fileInput.current.files[0],
        title,
        cateBig,
        cateSmall,
        region,
        productState,
        deadline,
        lowbid,
        sucbid,
        delivery,
        productDesc,
        tags
      )
    );
  };

  return (
    <UploadWrap>
      <Grid margin="0 0 35px 0">
        <Text h2 bold>
          상품등록
        </Text>
      </Grid>

      <Grid margin="0 0 35px 0">
        <Text h3 bold marginB="20px">
          제목
        </Text>
        <Input
          _onChange={(e) => {
            setTitle(e.target.value);
          }}
          margin="6% auto"
          adornment="0/25"
          plcholder="최대 25자 작성 가능합니다."
        ></Input>
      </Grid>

      <Grid margin="0 0 35px 0">
        <Text h3 bold marginB="20px">
          카테고리
        </Text>
        <Grid is_flex>
          <div style={{ width: "25%", margin: "0 20px 0 0" }}>
            <Select onChange={handleCateBig} options={MainCT} value={MainCT.find((obj) => obj.value === cateBig)} placeholder="2D / 3D" />
          </div>
          {cateBig === "3D" && (
            <div style={{ width: "50%", margin: "0" }}>
              <Select onChange={handleCateSmall} value={D2CT.find((obj) => obj.value === cateSmall)} placeholder="3D 상세 분류" options={D2CT} />
            </div>
          )}
          {cateBig === "2D" && (
            <div style={{ width: "50%", margin: "0" }}>
              <Select onChange={handleCateSmall} value={D3CT.find((obj) => obj.value === cateSmall)} placeholder="2D 상세 분류" options={D3CT} />
            </div>
          )}
        </Grid>
      </Grid>

      <Grid margin="0 0 35px 0">
        <Text h3 bold marginB="20px">
          희망 거래 장소
        </Text>
        <Grid is_flex>
          <Input
            value={region}
            _onChange={(e) => {
              setRegion(e.target.value);
            }}
            plcholder="거래를 진행하실 지역을 검색하세요."
            width="70%"
            margin="0 10px 0 0"
            left
          />

          <Button
            text="주소 검색"
            _onClick={() => {
              setIsPostOpen(true);
            }}
            margin="0 10px 0 0"
          />
          <Button text="지하철 검색" />
        </Grid>
      </Grid>

      <Grid margin="0 0 35px 0">
        <Text h3 bold marginB="20px">
          상품이미지 (3장을 한번에 선택해주세요.)
        </Text>
        <label for="fileInput" style={{ display: "block", backgroundColor: "red", width: "30px", height: "30px" }}>
          <input style={{ display: "none" }} id="fileInput" type="file" onChange={handleChange} disabled={progress} ref={fileInput} multiple />
        </label>
        {preview &&
          preview.map((p, idx) => {
            return <Upload key={idx} {...p} />;
          })}
      </Grid>

      <Grid margin="0 0 35px 0">
        <Text h3 bold marginB="20px">
          상품 상태 등급
        </Text>
        <form
          onChange={(e) => {
            setProductState(e.target.value);
          }}
          style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
        >
          <Input radio name="state" value="A급" desc="포장지 파손 없는 미개봉 제품" />
          <Input radio name="state" value="B급" desc="개봉되었으나 미전시품" />
          <Input radio name="state" value="C급" desc="개봉되었고 전시된 제품" />
          <Input radio name="state" value="D급" desc="포장지가 없고 사용감이 있는 제품" />
        </form>
      </Grid>

      <Grid margin="0 0 35px 0">
        <Text h3 bold marginB="20px">
          상품 상세 정보
        </Text>

        <Input
          text
          onChange={(e) => {
            setProductDesc(e.target.value);
          }}
          placeholder="상품 설명을 입력해주세요."
          style={{ padding: "6px 10px", marginTop: "13px", width: "700px", height: "200px", fontSize: "14px" }}
          rows="10"
        ></Input>
      </Grid>

      <Grid margin="0 0 35px 0">
        <Text h3 bold marginB="20px">
          상품 연관 태그
        </Text>
        <Input
          _onChange={(e) => {
            setTags(e.target.value);
          }}
          type="text"
          plcholder="태그는 띄어쓰기로 구분됩니다. ex. 피규어 포스터 카드"
        />
      </Grid>

      <Grid dp_flex margin="0 0 35px 0" justify="space-between" gap="30px">
        <Grid>
          <Text h3 bold marginB="20px">
            경매 기간
          </Text>
          <Select onChange={handleDeadline} value={D4CT.find((obj) => obj.value === deadline)} placeholder="경매 기간" options={D4CT} />
        </Grid>

        <Grid>
          <Text h3 bold marginB="20px">
            상품 배송 정보
          </Text>

          <form onChange={handleDelivery} style={{ display: "inline-flex", justifyContent: "space-between", gap: "50px" }}>
            <Input radio name="delivery" value="무료 배송" desc="혹은 직거래일 경우" />
            <Input radio name="delivery" value="배송비 별도" />
          </form>
        </Grid>
      </Grid>

      <Grid dp_flex margin="0 0 35px 0" justify="space-between" gap="30px">
        <Grid>
          <Text h3 bold marginB="20px">
            최소입찰가
          </Text>

          <Input num _onChange={handleLowbid} value={lowbidFake} adornment="원" />
        </Grid>

        <Grid>
          <Text h3 bold marginB="20px">
            즉시 낙찰가
          </Text>

          <Input num _onChange={handleSucbid} value={sucbidFake} adornment="원" />
        </Grid>
      </Grid>

      <Button _onClick={addPost} width="100%" height="70px" margin="0 auto 9% auto">
        등록하기
      </Button>

      {isPostOpen && (
        <Modal>
          <ModalSection>
            <DaumPostcode onComplete={handleComplete} />
          </ModalSection>
          <ModalBack onClick={() => setIsPostOpen(false)}></ModalBack>
        </Modal>
      )}
    </UploadWrap>
  );
});

ProductUpload.defaultProps = {
  onChange: (img) => {},
};

const UploadWrap = styled.div`
  max-width: 1030px;
  margin: 0 auto;
  margin-top: 190px;
  display: flex;
  flex-direction: column;
  padding: 0;

  margin-bottom: 100px;

  text-align: left;
`;

const Modal = styled.div`
  display: flex;
  align-items: center;
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
  overflow: hidden;
  z-index: 99;
`;

const ModalBack = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 96;
  background-color: transparent;
`;

export default ProductUpload;
