import React, { useRef, useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import { history } from "redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as productActions } from "redux/modules/result";
import { actionCreators as categoryActions } from "redux/modules/post";
import { actionCreators as userActions } from "redux/modules/user";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faThermometerQuarter as uploadIcon } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots as chatIcon } from "@fortawesome/free-regular-svg-icons";

import { Grid, Input, Line, Button, Tag, Modal, Text } from "elements/";
import Select from "react-select";
import ListBtn from "components/ListBtn";
import ListHover from "components/ListHover";
import DetailRing from "components/DetailRing";

import MainLogo from "images/logo.png";
import Submit from "images/search.png";
import List from "images/list.png";

import { MainCT, D2CT, D3CT } from "shared/Category";
import { Color } from "shared/DesignSys";
import { CenterFocusStrong } from "../../node_modules/@material-ui/icons/index";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const { showHeader } = props;
  const [keyword, setKeyword] = useState("");
  const [mainct, setMainct] = useState("");
  const [subct, setSubct] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", headerChange);
    // dispatch(userActions.isLogin());
    return () => window.removeEventListener("scroll", headerChange);
  }, []);

  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      dispatch(userActions.isLogout());
    }
  };

  const SearchProduct = () => {
    dispatch(productActions.getProductSearch(keyword));
    history.push("/result");
  };

  // const SearchProduct = () => {
  //   dispatch(productActions.getProductSearch(keyword));
  //   history.push("/result");
  // };

  const handleMainCategory = (e) => {
    setMainct(e.target.value);
    if (e.target.value === "3D") {
      setSubct(D2CT);
      dispatch(categoryActions.getProductMainCategotAPI(e.target.value));
    } else if (e.target.value === "2D") {
      setSubct(D3CT);
      dispatch(categoryActions.getProductMainCategotAPI(e.target.value));
    }
  };

  const handleSubCategory = (e) => {
    setSubct(e.target.value);
    console.log(handleSubCategory);
    dispatch(categoryActions.getProductSubCategotAPI(mainct, e.target.value));
    history.push("/category");
  };

  const customStyles = useMemo(
    () => ({
      // 겉 컨테이너
      container: (provided, state) => ({
        ...provided,
        // backgroundColor: Color.Primary,
        // border: state.isSelected ? `red` : state.isFocused ? `red` : `green`,
      }),
      // 컨트롤 박스
      control: (provided, state) => ({
        ...provided,
        borderRadius: "20px",
        alignItems: "center",
        color: Color.Primary,
        backgroundColor: "transparent",
        border: "none",
        // 망할놈의 박스섀도우 보더마냥 해놓았다...
        boxShadow: "none",
      }),
      // 컨트롤 안에 값 자체
      singleValue: (provided, state) => ({
        ...provided,
        color: Color.Primary,
      }),
      dropdownIndicator: (provided, state) => ({
        ...provided,
        color: Color.Primary,

        // content: "url(https://1.bp.blogspot.com/-zPYogI0ZcvA/YIv7xIest9I/AAAAAAAAPIA/Voq7TwepcsMjFb5EqjEXEf29wFPB9aM9gCLcBGAsYHQ/s320/%25ED%258C%25A8%25EC%258A%25A4%2B2.png)"
      }),
      // 이건 무시
      input: (provided, state) => ({
        ...provided,
        color: Color.Primary,
      }),

      indicatorSeparator: (provided, state) => ({
        ...provided,
        display: "none",
      }),
      // 선택 후 값 박스
      valueContainer: (provided, state) => ({
        ...provided,
        color: Color.Primary,
        alignItems: "center",
        margin: "auto",
        backgroundColor: "transparent",
      }),

      // 대분류, 중분류
      placeholder: (provided, state) => ({
        ...provided,
        alignItems: "center",
        color: Color.Dark_4,
      }),
      noOptionsMessage: (provided, state) => ({
        ...provided,
        color: Color.Light_2,
        content: "대분류를 선택해주세요.",
      }),
      // 메뉴 드롭 다운 바탕 박스
      menu: (provided, state) => ({
        ...provided,
        fontWeight: state.isSelected ? "500" : "400",
        border: `0.5px solid ${Color.Light_2}`,
        boxShadow: `0 2px 10px ${Color.Light_4}`,
        backgroundColor: "white",
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
        borderBottomLeftRadius: "15px",
        borderBottomRightRadius: "15px",
      }),
      // 메뉴 드롭 다운 내 바탕 박스
      menuList: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? Color.Primary : "transparent",
        margin: "10px 0 5px 0",
      }),
      // 메뉴 드롭 다운 내 값1, 값2 ...
      option: (provided, state) => ({
        ...provided,

        color: state.isFocused ? Color.Primary : Color.Dark_4,
        backgroundColor: state.isSelected ? "transparent" : state.isFocused ? "transparent" : "transparent",

        // border: state.isSelected ? `5px solid blue` : state.isFocused ? `5px solid green` : `0.5px solid red`,
      }),
      multiValueRemove: (provided, state) => ({
        ...provided,
        border: "none",
      }),
      menuPortal: (provided, state) => ({
        ...provided,
        border: "none",

        // border: state.isSelected ? `5px solid blue` : state.isFocused ? `5px solid green` : `0.5px solid red`,
        // backgroundColor: state.isSelected ? "transparent" : state.isFocused ? "transparent" : "transparent",
      }),
    }),
    []
  );
  const navbox = useRef();
  const up = useRef();
  const hide = useRef();
  const leftLogo = useRef();
  const lengthen = useRef();

  const headerChange = () => {
    if (window.scrollY < 150 && window.innerWidth > 1320) {
      navbox.current.style.position = "fixed";
      navbox.current.style.zIndex = "9999";
      navbox.current.style.height = "140px";
      navbox.current.style.boxShadow = `0 4px 15px 0 ${Color.Light_4}77`;
      up.current.style.marginTop = "0px";

      hide.current.style.alignItems = "center";
      hide.current.style.opacity = "1";
      hide.current.style.width = "117.8px";

      leftLogo.current.style.width = "0";
      leftLogo.current.style.marginRight = "0";
    } else if (window.scrollY < 150 && window.innerWidth < 1320) {
      navbox.current.style.position = "fixed";
      navbox.current.style.zIndex = "9999";
      navbox.current.style.height = "140px";
      navbox.current.style.boxShadow = `0 4px 15px 0 ${Color.Light_4}77`;
      up.current.style.marginTop = "0px";

      hide.current.style.alignItems = "center";
      hide.current.style.opacity = "0";
      hide.current.style.width = "0px";

      leftLogo.current.style.maxWidth = "70px";
      leftLogo.current.style.minWidth = "6vw";
      leftLogo.current.style.marginRight = "3vw";
    } else if (window.scrollY > 150 && window.innerWidth < 1320) {
      navbox.current.style.position = "fixed";
      navbox.current.style.zIndex = "9999";
      navbox.current.style.height = "79px";
      navbox.current.style.boxShadow = `0 4px 15px 0 ${Color.Secondary_2}77`;
      up.current.style.marginTop = "-38px";

      hide.current.style.alignItems = "center";
      hide.current.style.opacity = "0";
      hide.current.style.width = "0px";

      leftLogo.current.style.maxWidth = "70px";
      leftLogo.current.style.width = "5vw";
      leftLogo.current.style.marginRight = "3vw";
    } else if (window.scrollY > 150 && window.innerWidth > 1320) {
      navbox.current.style.position = "fixed";
      navbox.current.style.zIndex = "9999";
      navbox.current.style.boxShadow = `0 4px 15px 0 ${Color.Secondary_2}77`;
      navbox.current.style.height = "79px";
      up.current.style.marginTop = "-38px";

      hide.current.style.alignItems = "center";
      hide.current.style.opacity = "0";
      hide.current.style.width = "0px";

      leftLogo.current.style.maxWidth = "70px";
      leftLogo.current.style.width = "5vw";
      leftLogo.current.style.marginRight = "3vw";
    }
  };

  return (
    <HeaderWrap showHeader={showHeader} ref={navbox}>
      <Fix ref={up}>
        {/* 로고 */}

        <img
          ref={leftLogo}
          alt="로고이미지"
          style={{ alignItems: "center", width: "0px", marginBottom: "2px", justifyContent: "center" }}
          src={MainLogo}
          onClick={() => {
            history.replace("/");
          }}
        />

        <Grid is_flex width="40%" alignItems="center">
          {/* 카테고리 리스트 방식 */}
          {/* <ListHover/> */}
          <div>카테고리</div>
          <ListBtn />
          <Mainselectbox>
            <Select placeholder="대분류" onChange={handleMainCategory} value={MainCT.find((obj) => obj.value === MainCT)} options={MainCT} styles={customStyles} />
          </Mainselectbox>
          {mainct === "" && (
            <SubSelectbox>
              <Select placeholder="중분류" onClick={handleSubCategory} styles={customStyles} />
            </SubSelectbox>
          )}
          {/* 2D일 때 */}
          {mainct === "2D" && (
            <SubSelectbox>
              <Select placeholder="중분류" onChange={handleSubCategory} options={D2CT} styles={customStyles} />
            </SubSelectbox>
          )}
          {/* 3D일 때 */}
          {mainct === "3D" && (
            <SubSelectbox>
              <Select placeholder="중분류" onChange={handleSubCategory} options={D3CT} styles={customStyles} />
            </SubSelectbox>
          )}
        </Grid>

        <Grid is_flex justify="center" width="20%">
          {/* 로고 */}
          <img
            ref={hide}
            alt="로고이미지"
            style={{ width: "117.8px" }}
            src={MainLogo}
            onClick={() => {
              history.replace("/");
            }}
          />
        </Grid>

        <Grid is_flex column width="40%">
          <Grid is_flex gap="5%" justify="flex-end" margin="0 0 42px 0" ref={hide}>
            <Text subBody color={Color.Dark_4}>
              about OKU
            </Text>
            <Text subBody color={Color.Dark_4}>
              about Team
            </Text>

            {/* 개인정보기능 */}
            {/* 로그인 전 */}
            {!is_login && (
              <div style={{ display: "flex" }}>
                <Text
                  subBody
                  color={Color.Dark_4}
                  onClick={() => {
                    history.replace("/Signup");
                  }}
                >
                  회원가입
                </Text>
                <p style={{ fontSize: "12px", color: "#868686" }}>&thinsp;/&thinsp;</p>
                <Text
                  subBody
                  color={Color.Dark_4}
                  onClick={() => {
                    history.push("/Login");
                  }}
                >
                  로그인
                </Text>
              </div>
            )}
            {/* 로그인 후  */}
            {is_login && (
              <>
                <Text subBody color={Color.Dark_4} onClick={logout}>
                  로그아웃
                </Text>
                <Text subBody color={Color.Dark_4} onClick={() => history.push("/my/shopping")}>
                  마이페이지
                </Text>
              </>
            )}
          </Grid>

          <Grid is_flex justify="flex-end">
            {/* 기능버튼 */}
            <SearchWrap>
              <Search
                ref={lengthen}
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
              <FontAwesomeIcon icon={faSearch} />
            </SearchWrap>

            <IconWrap>
              <Ring>
                <DetailRing />
              </Ring>

              {!is_login && (
                <>
                  <Grid
                    className="block pointer"
                    width="max-content"
                    padding="0 20px"
                    is_flex
                    gap="5px"
                    __click={() => {
                      history.push("/login");
                    }}
                  >
                    <FontAwesomeIcon icon={chatIcon} />
                    채팅
                  </Grid>
                </>
              )}

              {is_login && (
                <>
                  <Grid
                    className="block pointer"
                    width="max-content"
                    padding="0 20px"
                    is_flex
                    gap="5px"
                    __click={() => {
                      history.push("/chat");
                    }}
                  >
                    <FontAwesomeIcon icon={chatIcon} />
                    채팅
                  </Grid>
                </>
              )}

              {!is_login && (
                <>
                  <Grid
                    className="pointer"
                    width="max-content"
                    padding="0 0 0 20px"
                    is_flex
                    gap="5px"
                    __click={() => {
                      history.push("/login");
                    }}
                  >
                    <FontAwesomeIcon icon={uploadIcon} />
                    물건등록
                  </Grid>
                </>
              )}

              {is_login && (
                <>
                  <Grid
                    className="pointer"
                    width="max-content"
                    padding="0 0 0 20px"
                    is_flex
                    gap="5px"
                    __click={() => {
                      history.push("/ProductUpload");
                    }}
                  >
                    <FontAwesomeIcon icon={uploadIcon} />
                    물건등록
                  </Grid>
                </>
              )}
            </IconWrap>
          </Grid>
        </Grid>
      </Fix>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.header`
  max-width: 100%;
  width: 100%;
  position: fixed;
  ${(props) => (props.showHeader ? "display : flex;" : "display : none;")}
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0 4px 15px 0 rgba(111, 111, 111, 0.16);
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: #ffffff;
  transition: box-shadow 500ms cubic-bezier(0.215, 0.61, 0.355, 1), height 500ms cubic-bezier(0.215, 0.61, 0.355, 1);
`;

const Fix = styled.div`
  max-width: 80vw;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 151px;
  padding-bottom: 32px;
  font-size: 18px;
  font-weight: 500;
  transition: margin 500ms cubic-bezier(0.215, 0.61, 0.355, 1);
  img {
    transition: all 1400ms cubic-bezier(0.215, 0.61, 0.355, 1);
    align-items: center;
    vertical-align: center;
    margin: auto;
    display: flex;
    cursor: pointer;
    object-position: center;
  }
`;

const Mainselectbox = styled.div`
  width: 147px;
  margin: 0 30px 0 38px;
  align-items: center;
`;

const SubSelectbox = styled.div`
  width: 200px;
  align-items: center;
`;

// 검색 wrap
const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${Color.Dark_1};
  margin-right: 2rem;
  height: 38px;
  background-color: transparent;
  svg {
    transition: all 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
    align-items: center;
    font-size: 20px;
    margin: auto 5px;
    cursor: pointer;
  }
  &:focus-within {
    border-bottom: 2px solid ${Color.Primary};
    svg {
      color: ${Color.Primary};
    }
  }
`;

// 검색 input
const Search = styled.input`
  background-color: transparent;
  width: 130px;
  height: 38px;
  border: 0;
  outline: 0;
  font-size: 18px;
  font-weight: 700;
  transition: all 400ms cubic-bezier(0.215, 0.61, 0.355, 1);
  ::placeholder {
    color: ${Color.Light_4};
    font-size: 16px;
  }
  :focus {
    outline: none;
    width: 220px;
  }
`;

// 알림 버튼
const Ring = styled.div``;

// ICONS
const IconWrap = styled.div`
  display: inline-flex;
  svg {
    align-items: center;
    font-size: 22px;
    margin: auto 0;
    cursor: pointer;
  }
  .block {
    width: max-content;
    border-right: 0.5px solid ${Color.Light_4};
    border-left: 0.5px solid ${Color.Light_4};
    cursor: pointer;
  }
  .pointer {
    cursor: pointer;
  }
`;

export default Header;
