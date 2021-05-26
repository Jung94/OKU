import React, { useRef, useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import { history } from "redux/configureStore";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as productActions } from "redux/modules/result";
import { actionCreators as categoryActions } from "redux/modules/post";
import { actionCreators as userActions } from "redux/modules/user";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faThermometerQuarter as uploadIcon } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots as chatIcon } from "@fortawesome/free-regular-svg-icons";

import { Grid, Input, Line, Button, Tag, Modal, Text, Tooltip } from "elements/";
import Select from "react-select";
import ListBtn from "components/ListBtn";
import ListHover from "components/ListHover";
import DetailRing from "components/DetailRing";

import MainLogo from "images/logo.png";
import IconSearch from "images/icon_Search.svg";
import IconRingOff from "images/icon_RingOff.svg";
import IconChat from "images/icon_Chat.svg";
import IconUpload from "images/icon_Upload.svg";

import { MainCT, D2CT, D3CT, D4CT } from "shared/Category";
import { Color } from "shared/DesignSys";
import { CenterFocusStrong } from "../../node_modules/@material-ui/icons/index";

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

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const { showHeader } = props;
  const [keyword, setKeyword] = useState("");
  const [mainct, setMainct] = useState("");
  const [subct, setSubct] = useState("");

  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    if (isDesktop && showHeader) {
      window.addEventListener("scroll", headerChange);
      // dispatch(userActions.isLogin());
      return () => window.removeEventListener("scroll", headerChange);
    }
  }, []);

  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      dispatch(userActions.isLogout());
      window.location.reload();
    }
  };

  const SearchProduct = () => {
    dispatch(productActions.getProductSearch(keyword));
    history.push("/result");
  };

  const handleMainCategory = (e) => {
    setMainct(e.value);
    if (e.value === "2D") {
      setSubct(D3CT);
      dispatch(categoryActions.getProductMainCategotAPI(e.value));
    } else if (e.value === "3D") {
      setSubct(D2CT);
      dispatch(categoryActions.getProductMainCategotAPI(e.value));
    }
  };

  const handleSubCategory = (e) => {
    setSubct(e.value);
    dispatch(categoryActions.getProductSubCategotAPI(mainct, e.value));
    history.push("/category");
  };

  const aboutus = (e) => {
    window.open("https://www.notion.so/90bbb2e5d07941a3a46370e5333c7556");
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
        cursor: "pointer",
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
        color: "transparent",
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
        justifyContent: "center",
        margin: "auto",
        fontSize: "14px",
        backgroundColor: "transparent",
      }),

      // 대분류, 중분류
      placeholder: (provided, state) => ({
        ...provided,
        alignItems: "center",
        fontSize: "14px",
        color: Color.Dark_4,
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
        fontSize: "14px",
        margin: "10px 0 5px 0",
      }),
      // 메뉴 드롭 다운 내 값1, 값2 ...
      option: (provided, state) => ({
        ...provided,
        cursor: "pointer",
        fontSize: "14px",
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

  const searchChange = () => {
    lengthen.current.focus();
  };

  const headerChange = () => {
    // style null 에러페이지 방지

    if (navbox === null || up === null || hide === null || leftLogo === null) {
      return;
    }
    if (window.scrollY < 150) {
      navbox.current.style.position = "fixed";
      navbox.current.style.zIndex = "999";
      navbox.current.style.height = "125px";
      navbox.current.style.boxShadow = `0 4px 15px 0 ${Color.Light_4}77`;
      up.current.style.marginTop = "0px";

      hide.current.style.alignItems = "center";
      hide.current.style.opacity = "1";
      hide.current.style.width = "110px";

      leftLogo.current.style.width = "0";
      leftLogo.current.style.marginRight = "0";
    } else if (window.scrollY > 150) {
      navbox.current.style.position = "fixed";
      navbox.current.style.zIndex = "999";
      navbox.current.style.height = "80px";
      navbox.current.style.boxShadow = `0 4px 15px 0 ${Color.Secondary_2}77`;
      up.current.style.marginTop = "-42px";

      hide.current.style.alignItems = "center";
      hide.current.style.opacity = "0";
      hide.current.style.width = "0px";

      leftLogo.current.style.maxWidth = "70px";
      leftLogo.current.style.width = "60px";
      leftLogo.current.style.marginRight = "3vw";
    }
  };

  return (
    <>
      <Desktop>
        <HeaderWrap showHeader={showHeader} ref={navbox}>
          <Fix ref={up}>
            {/* 로고 */}

            <img
              ref={leftLogo}
              alt="로고이미지"
              style={{ alignItems: "center", width: "0px", marginBottom: "2px", justifyContent: "center" }}
              src={MainLogo}
              onClick={() => {
                history.push("/");
              }}
            />

            <Grid is_flex width="40%" alignItems="center">
              {/* 카테고리 리스트 방식 */}
              {/* <ListHover/> */}
              <div style={{ width: "70px", fontSize: "14px", margin: "1px 0 0" }}>카테고리</div>
              <ListBtn />
              <Mainselectbox>
                <Select onfocus="javascrpt:blur();" placeholder="대분류" onChange={handleMainCategory} value={MainCT.find((obj) => obj.value === MainCT)} options={MainCT} styles={customStyles} />
              </Mainselectbox>
              {mainct === "" && (
                <SubSelectbox>
                  <Select onfocus="javascrpt:blur();" placeholder="중분류" onClick={handleSubCategory} styles={customStyles} />
                </SubSelectbox>
              )}
              {/* 2D일 때 */}
              {mainct === "3D" && (
                <SubSelectbox>
                  <Select onfocus="javascrpt:blur();" placeholder="중분류" onChange={handleSubCategory} options={D2CT} styles={customStyles} />
                </SubSelectbox>
              )}
              {/* 3D일 때 */}
              {mainct === "2D" && (
                <SubSelectbox>
                  <Select onfocus="javascrpt:blur();" placeholder="중분류" onChange={handleSubCategory} options={D3CT} styles={customStyles} />
                </SubSelectbox>
              )}
            </Grid>

            <Grid is_flex justify="center" width="20%" margin="0 0 14px 0">
              {/* 로고 */}
              <img
                ref={hide}
                alt="로고이미지"
                style={{ width: "110px", margin: "10px 0 0" }}
                src={MainLogo}
                onClick={() => {
                  history.push("/");
                }}
              />
            </Grid>

            <Grid is_flex column height="100px" width="40%">
              <Grid is_flex justify="flex-end" margin="10px 2px 36px 0" ref={hide}>
                {/* <Text subBody color={Color.Dark_4} margin="1.4px 4% 0 0">
                  about OKU
                </Text> */}
                <Text subBody color={Color.Dark_4} margin="0 4% 0 0" onClick={aboutus}>
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
                        history.push("/Signup");
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
                    <Text subBody color={Color.Dark_4} onClick={logout} margin="0 4% 0 0">
                      로그아웃
                    </Text>
                    <Text subBody color={Color.Dark_4} onClick={() => history.push("/MyShop")} margin="0 4% 0 0">
                      내 상점
                    </Text>
                    <Text subBody color={Color.Dark_4} onClick={() => history.push("/my/shopping")}>
                      마이페이지
                    </Text>
                  </>
                )}
              </Grid>

              <Grid is_flex justify="flex-end" margin="0 0 1px">
                {/* 기능버튼 */}
                <div style={{ margin: "0", minHeight: "40px", width: "90%", display: "flex", alignItems: "center", position: "relative" }}>
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
                  </SearchWrap>
                  <Img src={IconSearch} />
                </div>

                <IconWrap>
                  <Ring>
                    <DetailRing />
                  </Ring>

                  {!is_login && (
                    <>
                      <Grid
                        height="37px"
                        className="block pointer"
                        width="max-content"
                        padding="0 14px 4px"
                        is_flex
                        __click={() => {
                          history.push("/login");
                        }}
                      >
                        <ImgChat src={IconChat} />
                        <Text h4 margin="0 0 0 9px">
                          채팅
                        </Text>
                      </Grid>
                    </>
                  )}

                  {is_login && (
                    <>
                      <Grid
                        // bdr="1px solid red"
                        height="37px"
                        className="block pointer"
                        width="max-content"
                        padding="0 14px 4px"
                        is_flex
                        __click={() => {
                          history.push("/chat");
                        }}
                      >
                        <ImgChat src={IconChat} />
                        <Text h4 margin="0 0 0 9px">
                          채팅
                        </Text>
                      </Grid>
                    </>
                  )}

                  {!is_login && (
                    <>
                      <Grid
                        className="pointer"
                        width="max-content"
                        padding="0 0 5px 14px"
                        is_flex
                        __click={() => {
                          history.push("/login");
                        }}
                      >
                        <ImgUpload src={IconUpload} />
                        <Text h4 margin="0 0 0 9px">
                          물건등록
                        </Text>
                      </Grid>
                    </>
                  )}

                  {is_login && (
                    <>
                      <Grid
                        // bdr="1px solid red"
                        height="34px"
                        className="pointer"
                        width="max-content"
                        padding="0 0 1px 14px"
                        is_flex
                        __click={() => {
                          history.push("/ProductUpload");
                        }}
                      >
                        <ImgUpload src={IconUpload} />
                        <Text h4 margin="0 0 0 9px">
                          물건등록
                        </Text>
                      </Grid>
                    </>
                  )}
                </IconWrap>
              </Grid>
            </Grid>
          </Fix>
        </HeaderWrap>
      </Desktop>

      <Tablet>
        <HeaderWrap showHeader={showHeader} ref={navbox}>
          <Fix ref={up}>
            {/* 로고 */}

            <img
              ref={leftLogo}
              alt="로고이미지"
              style={{ alignItems: "center", width: "0px", marginBottom: "2px", justifyContent: "center" }}
              src={MainLogo}
              onClick={() => {
                history.push("/");
              }}
            />

            <Grid is_flex width="40%" alignItems="center">
              {/* 카테고리 리스트 방식 */}
              {/* <ListHover/> */}
              <div style={{ width: "70px", fontSize: "14px", margin: "1px 0 0" }}>카테고리</div>
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
              {mainct === "3D" && (
                <SubSelectbox>
                  <Select placeholder="중분류" onChange={handleSubCategory} options={D2CT} styles={customStyles} />
                </SubSelectbox>
              )}
              {/* 3D일 때 */}
              {mainct === "2D" && (
                <SubSelectbox>
                  <Select placeholder="중분류" onChange={handleSubCategory} options={D3CT} styles={customStyles} />
                </SubSelectbox>
              )}
            </Grid>

            <Grid is_flex justify="center" width="20%" margin="0 0 14px 0">
              {/* 로고 */}
              <img
                ref={hide}
                alt="로고이미지"
                style={{ width: "110px", margin: "10px 0 0" }}
                src={MainLogo}
                onClick={() => {
                  history.push("/");
                }}
              />
            </Grid>

            <Grid is_flex column height="100px" width="40%">
              <Grid is_flex gap="4%" justify="flex-end" margin="10px 2px 36px 0">
                {/* <Text subBody color={Color.Dark_4}>
                  about OKU
                </Text> */}
                <Text subBody color={Color.Dark_4} onClick={aboutus}>
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
                        history.push("/Signup");
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

              <Grid is_flex justify="flex-end" margin="0 0 1px">
                {/* 기능버튼 */}
                <div style={{ margin: "0", minHeight: "40px", width: "90%", display: "flex", alignItems: "center", position: "relative" }}>
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
                  </SearchWrap>
                  <Img src={IconSearch} />
                </div>

                <IconWrap>
                  <Ring>
                    <DetailRing />
                  </Ring>

                  {!is_login && (
                    <>
                      <Grid
                        className="block pointer"
                        width="max-content"
                        padding="0 14px 1px"
                        is_flex
                        gap="9px"
                        __click={() => {
                          history.push("/login");
                        }}
                      >
                        <ImgChat src={IconChat} />
                        <Text h4>채팅</Text>
                      </Grid>
                    </>
                  )}

                  {is_login && (
                    <>
                      <Grid
                        // bdr="1px solid red"
                        height="34px"
                        className="block pointer"
                        width="max-content"
                        padding="0 14px 1px"
                        is_flex
                        gap="9px"
                        __click={() => {
                          history.push("/chat");
                        }}
                      >
                        <ImgChat src={IconChat} />
                        <Text h4>채팅</Text>
                      </Grid>
                    </>
                  )}

                  {!is_login && (
                    <>
                      <Grid
                        className="pointer"
                        width="max-content"
                        padding="0 0 1px 14px"
                        is_flex
                        gap="9px"
                        __click={() => {
                          history.push("/login");
                        }}
                      >
                        <ImgUpload src={IconUpload} />
                        <Text h4>물건등록</Text>
                      </Grid>
                    </>
                  )}

                  {is_login && (
                    <>
                      <Grid
                        // bdr="1px solid red"
                        height="34px"
                        className="pointer"
                        width="max-content"
                        padding="0 0 1px 14px"
                        is_flex
                        gap="9px"
                        __click={() => {
                          history.push("/ProductUpload");
                        }}
                      >
                        <ImgUpload src={IconUpload} />
                        <Text h4>물건등록</Text>
                      </Grid>
                    </>
                  )}
                </IconWrap>
              </Grid>
            </Grid>
          </Fix>
        </HeaderWrap>
      </Tablet>

      <Mobile>
        <HeaderWrap showHeader={showHeader} ref={navbox}>
          <Fix ref={up}>
            {/* 로고 */}
            <Grid is_flex justify="space-between" height="58px">
              <img
                ref={leftLogo}
                alt="로고이미지"
                style={{ display: "none", alignItems: "center", width: "0px", marginBottom: "2px", justifyContent: "center" }}
                src={MainLogo}
                onClick={() => {
                  history.push("/");
                }}
              />

              <Grid is_flex justify="center" width="20%" display="none" margin="4px 0 0">
                {/* 로고 */}
                <img
                  ref={hide}
                  alt="로고이미지"
                  src={MainLogo}
                  onClick={() => {
                    history.push("/");
                  }}
                />
              </Grid>

              <Grid is_flex column width="66%">
                <Grid is_flex justify="flex-end" width="100%">
                  {/* 기능버튼 */}
                  <div style={{ margin: "4px 0 0", minHeight: "40px", width: "70%", display: "flex", alignItems: "center", position: "relative" }}>
                    <SearchWrap>
                      <Search
                        ref={lengthen}
                        type="text"
                        // placeholder="검색하기"
                        onChange={(e) => {
                          setKeyword(e.target.value);
                        }}
                        onKeyPress={(e) => {
                          if (window.event.keyCode === 13) {
                            SearchProduct();
                          }
                        }}
                      />
                    </SearchWrap>
                    <Img src={IconSearch} onClick={searchChange} />
                  </div>

                  <IconWrap>
                    <Ring>
                      <DetailRing />
                    </Ring>
                  </IconWrap>
                </Grid>
              </Grid>
            </Grid>

            <Grid is_flex width="100%" height="39px" alignItems="center" padding="0 10px 0 20px" bdrTop="1px solid rgba(0, 0, 0, 0.1)">
              {/* 카테고리 리스트 방식 */}
              {/* <ListHover/> */}
              <div style={{ fontSize: "14px", width: "76px", margin: "1px 0 0 2px" }}>카테고리</div>
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
              {mainct === "3D" && (
                <SubSelectbox>
                  <Select placeholder="중분류" onChange={handleSubCategory} options={D2CT} styles={customStyles} />
                </SubSelectbox>
              )}
              {/* 3D일 때 */}
              {mainct === "2D" && (
                <SubSelectbox>
                  <Select placeholder="중분류" onChange={handleSubCategory} options={D3CT} styles={customStyles} />
                </SubSelectbox>
              )}
            </Grid>
          </Fix>
        </HeaderWrap>
      </Mobile>
    </>
  );
};

const HeaderWrap = styled.header`
  @media only screen and (min-width: 1024px) {
    max-width: 100%;
    width: 100%;
    height: 125px;
    position: fixed;
    ${(props) => (props.showHeader ? "display : flex;" : "display : none;")}
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    box-shadow: 0 4px 15px 0 rgba(111, 111, 111, 0.16);
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #ffffff;
    // border: 1px solid blue;
    transition: box-shadow 500ms cubic-bezier(0.215, 0.61, 0.355, 1), height 500ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    overflow : scroll;
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
    z-index: 999;
    background-color: #ffffff;
    transition: box-shadow 500ms cubic-bezier(0.215, 0.61, 0.355, 1), height 500ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  @media only screen and (max-width: 767px) {
    display: flex;
    position: fixed;
    width: 100vw;
    max-height: 99px;
    max-width: 100%;
    ${(props) => (props.showHeader ? "display : flex;" : "display : none;")}
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #ffffff;
  }
`;

const Fix = styled.div`
  @media only screen and (min-width: 1024px) {
    // border: 1px solid blue;
    max-width: 1030px;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 125px;
    padding-bottom: 19px;
    font-weight: 500;
    transition: margin 500ms cubic-bezier(0.215, 0.61, 0.355, 1);
    img {
      transition: all 800ms cubic-bezier(0.215, 0.61, 0.355, 1);
      align-items: center;
      vertical-align: center;
      margin: auto;
      display: flex;
      cursor: pointer;
      object-position: center;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    min-width : 1023px;
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
      transition: all 800ms cubic-bezier(0.215, 0.61, 0.355, 1);
      align-items: center;
      vertical-align: center;
      margin: auto;
      display: flex;
      cursor: pointer;
      object-position: center;
    }
  }

  @media only screen and (max-width: 767px) {
    max-width: 100%;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 99px;
    padding: 0;
    font-size: 12px;
    font-weight: 500;
    transition: margin 500ms cubic-bezier(0.215, 0.61, 0.355, 1);
    box-shadow: 0 3px 8px 1px rgba(111, 111, 111, 0.16);

    img {
      transition: all 800ms cubic-bezier(0.215, 0.61, 0.355, 1);
      align-items: center;
      cursor: pointer;
      object-position: center;
      margin-left: 20px;
      width: 52px;
    }
  }
`;

const Mainselectbox = styled.div`
  width: 100px;
  margin: 0 10px 0 10px;
  align-items: center;
  cursor: default;

  @media only screen and (max-width: 767px) {
    width: 120px;
    margin: 0 10px 0 10px;
    align-items: center;
  }
`;

const SubSelectbox = styled.div`
  width: 160px;
  align-items: center;
  cursor: default;

  @media only screen and (max-width: 767px) {
    width: 200px;
    align-items: center;
  }
`;

// 검색 wrap
const SearchWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  height: 38px;
  width: 150px;
  background-color: transparent;
  transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  // border: 1px solid blue;

  @media only screen and (max-width: 767px) {
    display: flex;
    align-items: center;
    border: none;
    border-radius: 50px;
    margin-right: 0.6rem;
    height: 38px;
    justify-content: flex-end;
    width: 100%;
    background-color: transparent;
    transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);

    &:focus-within {
      border-bottom: none;
    }
  }
`;

const ImgChat = styled.div`
  top: 6px;
  right: 20px;
  width: 22px;
  height: 22px;
  background-color: transparent;
  background: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  transition: all 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
  margin: 0;
  cursor: pointer;
  // border: 1px solid blue;
`;

const ImgUpload = styled.div`
  top: 6px;
  right: 20px;
  width: 22px;
  height: 22px;
  background-color: transparent;
  background: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  transition: all 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
  margin: 0;
  cursor: pointer;
  // border: 1px solid blue;
`;

const Img = styled.div`
  // border: 1px solid blue;
  position: absolute;
  top: 9px;
  right: 4px;
  width: 21px;
  height: 21px;
  background-color: transparent;
  background: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  transition: all 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
  margin: 0;
  cursor: pointer;

  @media only screen and (max-width: 767px) {
    position: absolute;
    top: 8px;
    right: 20px;
    width: 23px;
    height: 23px;
    background-color: transparent;
    background: url(${(props) => props.src});
    background-size: cover;
    background-position: center;
    transition: all 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
    margin: 2px 0 0;
    cursor: pointer;
  }
`;

// 검색 input
const Search = styled.input`
  @media only screen and (min-width: 1024px) {
    background-color: transparent;
    width: 70%;
    height: 28px;
    border: 0;
    outline: 0;
    font-size: 14px;
    font-weight: 500;
    padding: 0 30px 0 5px;
    transition: all 400ms cubic-bezier(0.215, 0.61, 0.355, 1);
    border-bottom: 1px solid ${Color.Dark_2};
    ::placeholder {
      color: ${Color.Light_4};
      font-weight: 500;
      font-size: 14px;
    }
    :focus {
      outline: none;
      width: 90%;
    }
  }

  @media only screen and (max-width: 767px) {
    background-color: transparent;
    margin: 2px 6px 0 10px;
    width: 0%;
    height: 38px;
    border: 0;
    outline: 0;
    font-size: 14px;
    font-weight: 500;
    transition: all 400ms cubic-bezier(0.215, 0.61, 0.355, 1);
    border-bottom: 1px solid ${Color.Dark_2};
    ::placeholder {
      color: ${Color.Light_4};
      font-size: 16px;
    }
    :focus {
      outline: none;
      width: 100%;
    }
  }
`;

// 알림 버튼
const Ring = styled.div`
  // border: 1px solid blue;
  padding: 4px 0 0;
  width: 69px;

  @media only screen and (max-width: 767px) {
    padding: 0;
  }
`;

// ICONS
const IconWrap = styled.div`
  display: inline-flex;
  margin: 0 0 0 30px;
  padding: 2px 0 0;
  height: 40px;
  // border: 1px solid red;
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

  @media only screen and (max-width: 767px) {
    width: 42px;
    margin: 0;
    height: 100%;
  }
`;

export default Header;
