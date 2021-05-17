import React, { useRef, createRef, useState } from "react";
import styled from "styled-components";
import { Grid, Input, Line, Button, Tag, Text, Profile } from "elements/";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as uploadActions } from "redux/modules/upload";
import { input_priceComma } from "shared/common";
// import { Upload } from "components/";
import Upload from "shared/Upload";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircle } from "@fortawesome/free-solid-svg-icons";

import { Color } from "shared/DesignSys";
import { MainCT, D2CT, D3CT, D4CT } from "shared/Category";

import DaumPostcode from "react-daum-postcode";

// React.memo => re-render 방지용임
const ProductUpload = React.memo((props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const is_login = localStorage.getItem("access_token");

  const [agree, setAgree] = useState(false); // 이용약관 동의

  const preview1 = useSelector((state) => state.upload.preview1);
  const preview2 = useSelector((state) => state.upload.preview2);
  const preview3 = useSelector((state) => state.upload.preview3);

  const fileInput = useRef();
  const fileInput1 = useRef();
  const fileInput2 = useRef();

  const progress = useSelector((state) => state.upload.progress);

  // const handleChange = (e) => {

  //   const fileArr = e.target.files;

  //   let fileURLs = [];

  //   let file;
  //   let filesLength = fileArr.length > 3 ? 3 : fileArr.length;

  //   for (let i = 0; i < filesLength; i++) {
  //     file = fileArr[i];

  //     let reader = new FileReader();

  //     reader.onloadend = () => {
  //       // console.log(reader.result);
  //       fileURLs[i] = reader.result;
  //       // setDetailImgs([...fileURLs]);
  //       dispatch(uploadActions.setPreview([...fileURLs]));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  const handleChange1 = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    console.log(file);
    reader.readAsDataURL(file); // 파일 내용을 읽어오기

    // 읽기가 끝나면 발생하는 이벤트 핸들러
    reader.onloadend = () => {
      dispatch(uploadActions.setPreview1(reader.result));
    };
  };
  const handleChange2 = (e) => {
    const reader = new FileReader();
    const file = fileInput1.current.files[0];
    console.log(file);
    reader.readAsDataURL(file); // 파일 내용을 읽어오기

    // 읽기가 끝나면 발생하는 이벤트 핸들러
    reader.onloadend = () => {
      dispatch(uploadActions.setPreview2(reader.result));
    };
  };
  const handleChange3 = (e) => {
    const reader = new FileReader();
    const file = fileInput2.current.files[0];
    console.log(file);
    reader.readAsDataURL(file); // 파일 내용을 읽어오기

    // 읽기가 끝나면 발생하는 이벤트 핸들러
    reader.onloadend = () => {
      dispatch(uploadActions.setPreview3(reader.result));
    };
  };

  const postalAddressInfo = useRef();
  const addressInfo = useRef();
  const detailAddressInfo = useRef();

  const _title = createRef();
  const _cateBig = useRef();
  const _cateSmall = useRef();
  const _region = useRef();
  const _productState = useRef();
  const _deadline = useRef();
  const _lowbid = useRef();
  const _sucbid = useRef();
  const _delivery = useRef();
  const _productDesc = useRef();

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

  const handleAgree = () => {
    if (agree) {
      setAgree(false);
    } else {
      setAgree(true);
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
    if (!title) {
      // 제목 거르기
      window.alert("제목을 입력해주세요!");
      window.scroll(0, 120);
    } else if (!cateBig || !cateSmall) {
      // 카테고리 거르기
      window.alert("카테고리를 설정해주세요! 대분류, 중분류 모두 선택하셔야 합니다.");
      window.scroll(0, 250);
    } else if (!fileInput.current.files[0] && !fileInput1.current.files[0] && !fileInput2.current.files[0]) {
      window.alert("사진을 선택해주세요!");
      window.scroll(0, 510);
    } else if (!productState) {
      window.alert("상품 상태 등급을 설정해주세요!");
      window.scroll(0, 770);
    } else if (!productDesc) {
      window.alert("상품에 대한 상세 정보를 입력해주세요! ");
      window.scroll(0, 890);
    } else if (!deadline) {
      window.alert("경매 기간을 설정해주세요!");
    } else if (delivery === null) {
      window.alert("배송 정보를 알려주세요!");
    } else if (!lowbid) {
      window.alert("최소 입찰가를 입력해주세요!");
    } else if (!sucbid) {
      window.alert("즉시 낙찰가를 입력해주세요!");
    } else if (!agree) {
      window.alert("약관에 동의해주세요!");
      return;
    } else {
      // 모든게 처리되고 나서야 상품등록 시도 가능
      dispatch(
        uploadActions.addPostAPI(
          fileInput.current.files[0],
          fileInput1.current.files[0],
          fileInput2.current.files[0],
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
    }

    // const ss = {
    //   image1 : preview1[0],
    //   image2 : preview2[0],
    //   image3 : preview3[0],
    //   title : title,
    //   cateBig : cateBig,
    //   cateSmall : cateSmall,
    //   region : region,
    //   productState : productState,
    //   deadline : deadline,
    //   lowbid : lowbid,
    //   sucbid : sucbid,
    //   delivery : delivery,
    //   productDesc : productDesc,
    //   tags : tags
    // }
  };

  const [count, setCount] = useState("");

  if (!is_login) {
    // history.push("/login");
    alert("로그인후에 이용하실 수 있습니다.");
  }

  return (
    <UploadWrap>
      <Grid margin="0 0 35px 0">
        <Text h2 bold>
          상품등록
        </Text>
      </Grid>
      <Grid margin="0 0 35px 0">
        <Text h3 bold marginB="20px">
          <FontAwesomeIcon icon={faCircle} className="cirSvg" />
          제목
        </Text>
        <Input
          _onChange={(e) => {
            setTitle(e.target.value);
            setCount(e.target.value);
          }}
          adorn
          margin="6% auto"
          adornment={`${count.length} / 25`}
          maxLength="25"
          plcholder="최대 25자 작성 가능합니다."
          ref={_title}
        ></Input>
      </Grid>
      <Grid margin="0 0 35px 0">
        <Text h3 bold marginB="20px">
          <FontAwesomeIcon icon={faCircle} className="cirSvg" />
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
            plcholder="거래를 진행할 지역을 검색하세요. 또는 바로 입력하실 수 있습니다."
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
        </Grid>
      </Grid>
      <Grid margin="0 0 35px 0">
        <Text h3 bold marginB="20px">
          <FontAwesomeIcon icon={faCircle} className="cirSvg" />
          상품이미지
        </Text>
        <Grid is_flex gap="20px">
          <PreviewBtn2 for="fileInput" src={preview1.length ? preview1 : "https://png.pngtree.com/png-vector/20190115/ourmid/pngtree-camera-icon--line-style-vector-illustration-png-image_314753.jpg"}>
            {/* 업로드 하기 */}
            <input style={{ display: "none" }} id="fileInput" type="file" onChange={handleChange1} disabled={progress} ref={fileInput} />
          </PreviewBtn2>
          <PreviewBtn2
            for="fileInput1"
            src={preview2.length ? preview2 : "https://png.pngtree.com/png-vector/20190115/ourmid/pngtree-camera-icon--line-style-vector-illustration-png-image_314753.jpg"}
          >
            {/* 업로드 하기 */}
            <input style={{ display: "none" }} id="fileInput1" type="file" onChange={handleChange2} disabled={progress} ref={fileInput1} />
          </PreviewBtn2>
          <PreviewBtn2
            for="fileInput2"
            src={preview3.length ? preview3 : "https://png.pngtree.com/png-vector/20190115/ourmid/pngtree-camera-icon--line-style-vector-illustration-png-image_314753.jpg"}
          >
            {/* 업로드 하기 */}
            <input style={{ display: "none" }} id="fileInput2" type="file" onChange={handleChange3} disabled={progress} ref={fileInput2} />
          </PreviewBtn2>
        </Grid>
        {/* {preview &&
          preview.map((p, idx) => {
            return <Upload key={idx} {...p} />;
          })} */}
      </Grid>
      <Grid margin="0 0 35px 0">
        <Text h3 bold marginB="20px">
          <FontAwesomeIcon icon={faCircle} className="cirSvg" />
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
          <FontAwesomeIcon icon={faCircle} className="cirSvg" />
          상품 상세 정보
        </Text>

        <Input
          text
          _onChange={(e) => {
            setProductDesc(e.target.value);
          }}
          plcholder="상품 정보를 입력해주세요. 자세할수록 입찰 또는 낙찰에 도움이 됩니다."
          style={{ padding: "6px 10px", marginTop: "13px", width: "700px", height: "200px", fontSize: "14px" }}
          rows="10"
          whiteSpace="pre-line"
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
          plcholder="태그는 해쉬태그로 달아주세요. ex. #피규어#포스터#카드"
        />
      </Grid>
      <Grid dp_flex margin="0 0 35px 0" justify="space-between" gap="30px">
        <Grid>
          <Text h3 bold marginB="20px">
            <FontAwesomeIcon icon={faCircle} className="cirSvg" />
            경매 기간
          </Text>
          <Select onChange={handleDeadline} value={D4CT.find((obj) => obj.value === deadline)} placeholder="경매 기간" options={D4CT} />
        </Grid>

        <Grid>
          <Text h3 bold marginB="20px">
            <FontAwesomeIcon icon={faCircle} className="cirSvg" />
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
            <FontAwesomeIcon icon={faCircle} className="cirSvg" />
            최소입찰가
          </Text>

          <Input num _onChange={handleLowbid} value={lowbidFake} adornment="원" />
        </Grid>

        <Grid>
          <Text h3 bold marginB="20px">
            <FontAwesomeIcon icon={faCircle} className="cirSvg" />
            즉시 낙찰가
          </Text>

          <Input num _onChange={handleSucbid} value={sucbidFake} adornment="원" plcholder="최소입찰가보다 높아야 합니다." />
        </Grid>
      </Grid>
      <Grid is_flex justify="center" textAlign="center" margin="20px">
        <Input check checked={agree} _onClick={handleAgree} value="상품 등록시 약관에 동의해주세요." />
      </Grid>
      <Button _onClick={addPost} width="100%" height="60px" margin="20px auto 9% auto">
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

  margin-bottom: 50px;

  text-align: left;

  .cirSvg {
    color: ${Color.Primary};
    font-size: 8px;
    vertical-align: 17px;
    margin-left: -12px;
    margin-right: 3px;
  }

  @media only screen and (max-width : 767px) {
    max-width: 300px;
    margin: 175px auto 100px;
    display: flex;
    flex-direction: column;
    padding: 0;
    text-align: left;
  }
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

const PreviewBtn = styled.label`
  display: flex;
  width: 180px;
  height: 180px;
  border-radius: 16px;
  background-color: ${Color.Light_3};
  align-items: center;
  justify-content: center;
  color: ${Color.Dark_4};
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
`;

const PreviewBtn2 = styled.label`
  display: flex;
  width: 180px;
  height: 180px;
  border-radius: 16px;
  // background-color: ${Color.Light_3};
  border: 1px solid ${Color.Light_4};
  align-items: center;
  justify-content: center;
  color: ${Color.Dark_4};
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
`;

export default ProductUpload;
