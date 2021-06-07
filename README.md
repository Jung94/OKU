#  OKU(오쿠) - 0부터 9까지 It's OK!

![](https://raw.githubusercontent.com/Jung94/OKU/main/public/oku_ppt_png/슬라이드1.PNG)

📍 [Website link](http://myoku.co.kr)\
📺 [YouTube link_1](https://www.youtube.com/watch?v=7vrvxDKprsc&list=PLprtZZegvmKBIXYfUAXQ9py0eb4piPPL_&index=19&t=3s) / 
[YouTube link_2](https://www.youtube.com/watch?v=zbaKZKt4p0U&list=PLprtZZegvmKBIXYfUAXQ9py0eb4piPPL_&index=20)

---
<br/>

## 목차
### 1. 개요
### 2. 프로젝트 주요 기능
### 3. 페이지별 기능 소개
  * Login
  * Signup
  * Home Page
  * Detail Page
  * Product Registration Page
  * Mypage + MyStore
  * Chatting
### 4. 트러블 슈팅
### 5. 고객 반응 및 개선 사항

---
<br/>

## 개요
#### ➀ OKU(오쿠) 란?
#### `덕후들을 위한 굿즈 경매 서비스`
* 오타쿠의, 오타쿠에 의한, 오타쿠를 위한 경매사이트 OKU는 오타쿠들의 니즈를 충족시켜줄 웹서비스입니다.\
내가 좋아하는 분야의 굿즈를 좋은 가격에 팔 수 있고, 그동안 돈 주고도 못샀던 굿즈들도 OKU에서는 구할 수 있습니다!

  <details>
    <summary>이미지 보기</summary>
    <div markdown="1">
      ![슬라이드7](https://user-images.githubusercontent.com/68035948/120974438-1c1e1280-c7ab-11eb-9144-f9776b6c2841.PNG)
    </div>
  </details>

#### ➁ 👨‍👩‍👧‍👧 팀원
  * Design: UI/UX 2인 (남유진, 이소희)
  * Backend: Node.js 2인 (김연재, 원가연) [[Repo가기👉]](https://github.com/danaisboss/OKU)
  * Frontend: React.js 3인 (정성목, 최경민, 최용현)

#### ➂ 개발 기간 : 2021.04.23 ~

#### ➃ 사용 패키지 & Tools
  * axios, fetch
  * redux-middleware(redux-thunk)
  * connected-react-router, history
  * react-redux, redux (+ redux-actions, immer 사용)
  * View: React with JavaScript, Material-UI,styled-components
  * Infrastructure: AWS S3 버킷 생성, Route 53을 이용한 도메인 네임서버 등록, Amazon CloudFront??, ACM 보안 인증서 발급 및 등록
  * Git, Github, Notion, Zeplin, Slack, Google Drive etc.

---
<br/>

## 프로젝트 주요 기능
#### ➀ 기능 요약
  * 로그인(+카카오로그인), 회원가입
  * Chatting : 1대1, 전체 채팅
  * Home Page : MD 추천 상품, 인기 상품, 마감임박 상품, 알림, Carousel
  * Detail Page : 마감시간, 입/낙찰, 실시간 입찰 정보, 댓글 작성, 좋아요, Carousel
  * Product Registration Page : 이미지 미리보기, 주소 찾기
  * Mypage + MyStore : 회원정보 수정, 내 상점 관리, 좋아요 리스트, 판매 상품 리스트

#### ➁ 실시간 마감시간
  * Moment.js 라이브러리를 이용한 실시간 상품 마감시간 구현

#### ➂ 입/낙찰 기능
  * 실시간 입찰 정보 : 현재 입찰 정보(입찰자+입찰금액)를 실시간으로 확인 가능, 본인이 제시한 입찰 금액 즉시 확인 가능
  * 입찰 시 현재 입찰가 초과, 즉시 낙찰가 미만의 입찰금액만 제시 가능

#### ➃ 채팅
  * Socket.io를 통한 1:1 채팅 및 전체 채팅 구현

#### ➄ 반응형 웹 구현
  * PC + Mobile
  * Media Query
  * React Hook : useMediaQuery 사용

	<details>
	<summary>useMediaQuery 사용 방법</summary>
	<div markdown="1">
		
	   * react-responsive 설치

	```javascript
	import { useMediaQuery } from "react-responsive";
	```

	```javascript
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
	```
	 * 컴포넌트 생성 후 import하여 사용하는 방법
	```javascript
	import React from "react";
	import { useMediaQuery } from "react-responsive";

	export const Mobile: React.FC = ({ children }) => {
	  const isMobile = useMediaQuery({
	    query: "(min-width:0px) and (max-width:599px)",
	  });
	  return <React.Fragment>{isMobile && children}</React.Fragment>;
	};
	```
	```javascript
	import React from "react"
	const { Mobile } from "../mediaQuery"

	export const Main = () => {
		return (
		<div>hello</div>
		<Mobile>
			<div>hi</div>
		</Mobile>
	    )
	}
	```
	</div>
	</details>

#### ➅ 헤더(Header)
  * 스크롤 반응형 헤더
    * 사용자 편의성을 위해 스크롤에 따른 헤더 높이 조절 + 로고 위치 및 크기 변경
  
      <details>
        <summary>이미지 보기</summary>
        <div markdown="1">       
          <img src="/public/oku_demo_gif/header.gif"  width="900" height="500">
        </div>
      </details>
      
  * 알림
    * 낙찰 시 판매자 알림 : 상대방의 거래 요청 수락 or 거절 가능
  
      <details>
        <summary>이미지 보기</summary>
        <div markdown="1">       
          <img src="/public/oku_demo_gif/confirm.gif"  width="900" height="500">
        </div>
      </details>
    
    * 거래 요청이 수락된 구매자의 알림

      <details>
        <summary>이미지 보기</summary>
        <div markdown="1">       
          <img src="/public/oku_demo_gif/afterconfirm.gif"  width="900" height="500">
        </div>
      </details>
      
  * 카테고리 검색
    * 대분류 선택 시 대분류에 해당하는 중분류 선택이 가능하도록 구분

  * 일반 검색

---
<br/>

## 페이지별 기능 소개

### `Login`
  * 일반 로그인(이메일, 비밀번호) : JWT
  * 아이디 저장 기능 : localStorage에 영구 저장
  
    <details>
      <summary>이미지 보기</summary>
      <div markdown="1">       
        <img src="/public/oku_demo_gif/login.gif"  width="900" height="500">
      </div>
    </details>
    
  * 소셜 로그인(카카오로그인)
  
    <details>
      <summary>이미지 보기</summary>
      <div markdown="1">       
        <img src="/public/oku_demo_gif/kakao login.gif"  width="900" height="500">
      </div>
    </details>

### `Signup`
  * 아이디(이메일)와 닉네임 중복 및 정규식 체크
  * 비밀번호 정규식 체크, 비밀번호 확인

     <details>
       <summary>이미지 보기</summary>
       <div markdown="1">       
         <img src="/public/oku_demo_gif/signup.gif"  width="900" height="500">
       </div>
     </details>

### `Home Page`
  * [ CRUD ] : 실시간 인기 상품 / 최신 등록상품리스트 / 마감 임박 상품 / MD 추천 상품
    <details>
      <summary>이미지 보기</summary>
      <div markdown="1">       
        😎숨겨진 내용😎
      </div>
    </details>
  
  * [ Carousel ]
    * 홈페이지 렌더링 시 처음으로 보여지는 실시간 인기 상품 리스트를 Carousel로 구성
    * React-Slick을 사용
    
      <details>
        <summary>이미지 보기</summary>
        <div markdown="1">       
          <img src="/public/oku_demo_gif/main_carousel.gif"  width="900" height="500">
        </div>
      </details>

  * [ 카드 ]
    * 마감 기한, 상품 제목, 최소 입찰가 정보 제공
    * 좋아요 기능 구현
    
      <details>
        <summary>이미지 보기</summary>
        <div markdown="1">       
          <img src="/public/oku_demo_gif/main_card.gif"  width="900" height="500">
        </div>
      </details>

### `Product Registration Page`
  * [ CRUD ] : 상품 등록
  
    <details>
      <summary>이미지 보기</summary>
      <div markdown="1">       
        <img src="/public/oku_demo_gif/upload.gif"  width="900" height="500">
      </div>
    </details>
    
  * [ 이미지 미리보기 ]
    * 이미지 업로드 최대 3장으로 제한 -> 개별 이미지 업로드 버튼(handleChange1, 2, 3) 구현
    ```javascript
    const handleChange1 = (e) => {
      const reader = new FileReader();
      const file = fileInput.current.files[0];
      // 파일 내용을 읽어오기
      reader.readAsDataURL(file);

      // 읽기가 끝나면 발생하는 이벤트 핸들러
      reader.onloadend = () => {
        dispatch(uploadActions.setPreview1(reader.result));
      };
    };
    ```
    
    * 이미지 미리보기 Redux 
    ```javascript
    // actions
    const SET_PREVIEW_1 = "SET_PREVIEW_1";
    
    // action creators
    const setPreview1 = createAction(SET_PREVIEW_1, (preview) => ({ preview }));
    
    // reducer
    export default handleActions(
      {
        [SET_PREVIEW_1]: (state, action) =>
          produce(state, (draft) => {
            draft.preview1 = action.payload.preview;
          })
      },
      initialState
    );
    ```
  * [ 경매 기간 ]
    * millisecond로 변환 후 서버에 전달 ex. 3시간 = 10800000, 1일 = 86400000
    
    ```javascript
    const [deadline, setDeadline] = useState("");
    
    const handleDeadline = (e) => {
      setDeadline(parseInt(e.value));
    };
    
    - 생략 -
    
    <Select onChange={handleDeadline} value={D4CT.find((obj) => obj.value === deadline)} placeholder="경매 기간" options={D4CT} />
    ```
  * [ 주소 검색 ]
    * 희망 거래 방식 중 '직거래' 클릭 시 주소 검색 항목 생성
    ```javascript
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
      // 주소 모달 닫기
      setIsPostOpen(false);
    };
    ```

### `Detail Page`
  * [ CRUD ] : 상품 상세 정보 / 입찰 / 낙찰 / 찜(좋아요) / 문의하기
    <details>
      <summary>이미지 보기</summary>
      <div markdown="1">       
        😎숨겨진 내용😎
      </div>
    </details>

  * [ Carousel ]
    <details>
      <summary>이미지 보기</summary>
      <div markdown="1">       
        😎숨겨진 내용😎
      </div>
    </details>
    
    * 이미지 최대 3장으로 제한
    * margin 값 조정을 통한 Carousel 기능 구현
      * 좌/우 버튼 클릭 시 margin 값이 조정되어 웹에서는 원활히 작동하지만, 모바일에서는 스크롤이 되지 않음
      * 확장 가능한 Carousel 구현을 위해 [ 스크롤 + 스냅 ] 활용 예정
      
  * [ Timer ]
    * useInterval hook / moment / 내장 시간 함수를 통한 Timer 구현
    * useInterval을 통해 1000ms 단위로 현재 시간 표현
    * 시간을 나타내는 '타이머'의 경우 -> [ 마감시간-현재 ]
    * 프로그레스 바와 같은 진행상태를 나타내는 '스탑워치'의 경우 -> [ 마감시간-(현재-시작시간) ]
    * 고민 내용
      * 서버와의 소통을 위한 시간의 형태(timestamp or isoDate) 고민\
        -> 상대적으로 가독성이 높은 isoDate으로 소통
      * 프로그레스 바 구현 위해 어떻게 시간차를 숫자값으로 인식하게 할 수 있을지 고민\
        -> moment 라이브러리의 difference를 이용하면 계산 가능한 숫자값으로 반환하지 않기에 내장함수 ?? 이용
	
  * [ 입찰표 작성 ]
  
    <details>
      <summary>이미지 보기</summary>
      <div markdown="1">       
        <img src="/public/oku_demo_gif/finalBid.gif"  width="900" height="500">
      </div>
    </details>
      
    * Modal 컴포넌트화 + useInterval을 통해 제한적 통신 요청 및 실시간 같은 UX 구현
    * 입찰표 작성 Modal
      * 현재 최고 입찰가와 마감시간 확인 + 입찰 시도 가능
      * 입찰 후 곧바로 입찰을 재시도할 수 있기에 입찰 시도 후에도 모달 유지
    * 고민 내용
      * 웹소켓을 이용한 양방향 통신을 기획했으나 입찰과 낙찰의 경우 일방적인 요청이므로 웹소켓이 필수가 아닌 것으로 판단
      * 빠른 기능 구현을 위해 useInterval을 이용하여 현재 입찰가 및 onSale(경매중인지 아닌지 여부) 구현
      * 추후 웹소켓을 이용한 기능 구현 예정

  * [ 문의하기 + 대댓글 ]
    * 문의하기는 구매자와 판매자 모두 가능하지만 문의글에 대한 답글은 판매자만 가능
    * 대댓글 구현을 위해 문의글 마다 고유 ID 지정

### `Mypage + MyStore`
  * Mypage
    * [ CRUD ] : 회원정보(+수정) / 찜 리스트 / 구매 리스트
    
      <details>
        <summary>이미지 보기</summary>
        <div markdown="1">       
         😎숨겨진 내용😎
        </div>
      </details>
    
  * MyStore
    * [ CRUD ] : 내 상점(+수정) / 내 상점 후기 / 현재 판매 상품
    * 현재 판매 중인 상품이 없는 경우 물건 등록 버튼 생성

      <details>
        <summary>이미지 보기</summary>
        <div markdown="1">       
         😎숨겨진 내용😎
        </div>
      </details>

### `Chatting`

---
<br/>

## 트러블 슈팅

### ➀ 브라우저 호환성
  * 정규표현식 문제
    * 문제 : 아이폰 IOS, Safari 브라우저 흰 바탕의 빈 화면만 보여짐 -> syntaxError 발생

      `SyntaxError: Invalid regular expression: invalid group specifier name`
    * 해결 : Safari에서 지원하지 않는 특정 정규표현식(부등호) 사용이 문제 원인임을 발견

    ```javascript
    // 가격 콤마 정규식(input)
    export const input_priceComma = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
    };
    ```
    
  * CSS 호환 문제
    * 문제 : CSS 일부가 Safari(+ios)에서 호환이 되지 않는 문제 발생 - flex gap, fit-content etc.
    * 해결 : flex 대신 grid 사용
    
    ```javascript
    const ProductList = styled.div`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-column-gap: 38px;
      grid-row-gap: 50px;

      @media only screen and (max-width: 767px) {
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 20px;
      }
    `;
    ```

---
<br/>

## 고객 반응 및 개선 사항

![8](https://okuhanghae.s3.ap-northeast-2.amazonaws.com/About+OKU/%E1%84%89%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B38.PNG)

![](https://okuhanghae.s3.ap-northeast-2.amazonaws.com/About+OKU/%E1%84%89%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B39.PNG)

![10](https://okuhanghae.s3.ap-northeast-2.amazonaws.com/About+OKU/%E1%84%89%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B310.PNG)

![11](https://okuhanghae.s3.ap-northeast-2.amazonaws.com/About+OKU/%E1%84%89%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B311.PNG)

![](https://okuhanghae.s3.ap-northeast-2.amazonaws.com/About+OKU/%E1%84%89%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B312.PNG)

![](https://okuhanghae.s3.ap-northeast-2.amazonaws.com/About+OKU/%E1%84%89%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B313.PNG)

![](https://okuhanghae.s3.ap-northeast-2.amazonaws.com/About+OKU/%E1%84%89%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B314.PNG)

![15](https://okuhanghae.s3.ap-northeast-2.amazonaws.com/About+OKU/%E1%84%89%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B315.PNG)

![16](https://okuhanghae.s3.ap-northeast-2.amazonaws.com/About+OKU/%E1%84%89%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B316.PNG)

![](https://okuhanghae.s3.ap-northeast-2.amazonaws.com/About+OKU/%E1%84%89%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B317.PNG)
