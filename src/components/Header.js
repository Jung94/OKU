import React, { useMemo, useEffect, useState } from "react";
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

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const { showHeader } = props;
  const [keyword, setKeyword] = useState("");
  const [mainct, setMainct] = useState("");
  const [subct, setSubct] = useState("");

  useEffect(() => {
    dispatch(userActions.isLogin());
    window.addEventListener("scroll", headerChange);
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
    setMainct(e.value);
    if (e.value === "3D") {
      setSubct(D2CT);
      dispatch(categoryActions.getProductMainCategotAPI(e.value));
    } else if (e.value === "2D") {
      setSubct(D3CT);
      dispatch(categoryActions.getProductMainCategotAPI(e.value));
    }
  };

  const handleSubCategory = (e) => {
    setSubct(e.value);
    console.log(handleSubCategory);
    dispatch(categoryActions.getProductSubCategotAPI(mainct, e.value));
    history.push("/category");
  };

  const customStyles = useMemo(
    () => ({
      option: (provided, state) => ({
        ...provided,
        border: "0px solid",
        color: state.data.color,
      }),
      control: (provided) => ({
        ...provided,
        border: "0px solid black",
      }),
      singleValue: (provided, state) => ({
        ...provided,
        color: state.data.color,
      }),
      dropdownIndicator: (provided, state) => ({
        ...provided,
        color: "#AE27FF",
        // content: "url(https://1.bp.blogspot.com/-zPYogI0ZcvA/YIv7xIest9I/AAAAAAAAPIA/Voq7TwepcsMjFb5EqjEXEf29wFPB9aM9gCLcBGAsYHQ/s320/%25ED%258C%25A8%25EC%258A%25A4%2B2.png)"
      }),
      input: (provided, state) => ({
        ...provided,
        color: "#AE27FF",
      }),
      indicatorSeparator: (provided, state) => ({
        ...provided,
        display: "none",
      }),
    }),
    []
  );

  // 이거 나중에 정리해야함
  const headerChange = () => {
    const navbox = document.querySelector(".nav");
    const hide = document.querySelector(".hide");
    const shorten = document.querySelector(".shorten");
    const lengthen = document.querySelector(".lengthen");
    const show = document.querySelector(".show");
    const up = document.querySelector(".up");

    if (window.scrollY > 150) {
      navbox.style.position = "fixed";
      navbox.style.zIndex = "9999";
      navbox.style.boxShadow = `0 4px 15px 0 ${Color.Secondary_2}77`;
      navbox.style.height = "79px";

      up.style.marginTop = "-38px";
      lengthen.style.width = "380px";

      hide.style.display = "none";
      hide.style.width = "0px";
      hide.style.overflow = "hidden";

      show.style.width = "18%";
      show.style.display = "flex";
      show.style.overflow = "show";
    } else {
      navbox.style.height = "140px";
      navbox.style.boxShadow = `0 4px 15px 0 ${Color.Light_4}77`;

      up.style.marginTop = "0px";
      lengthen.style.width = "180px";

      hide.style.display = "flex";
      hide.style.width = "117.8px";
      hide.style.overflow = "show";

      show.style.width = "0";
      show.style.display = "none";
      show.style.overflow = "hidden";
    }
  };

  return (
    <>
      <HeaderWrap showHeader={showHeader} className="nav">
        <Fix className="up">
          <Grid is_flex justify="flex-start" width="0%" className="show" overflow="hidden">
            {/* 로고 */}
            <img
              alt="로고이미지"
              style={{ width: "90px", cursor: "pointer", zIndex: "1", marginBottom: "-5px" }}
              src={MainLogo}
              onClick={() => {
                history.replace("/");
              }}
            />
          </Grid>

          <Grid is_flex width="34%">
            {/* 카테고리 리스트 방식 */}
            {/* <ListHover/> */}
            <b style={{ width: "100px" }}>카테고리</b>
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

          <Grid is_flex justify="center" width="33%" className="shorten">
            {/* 로고 */}
            <img
              className="hide"
              alt="로고이미지"
              style={{ width: "117.8px", cursor: "pointer", zIndex: "1" }}
              src={MainLogo}
              onClick={() => {
                history.replace("/");
              }}
            />
          </Grid>

          <Grid is_flex column width="33%">
            <Grid is_flex gap="5%" justify="flex-end" margin="0 0 42px 0" className="hide">
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
                  className="lengthen"
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
              </IconWrap>
            </Grid>
          </Grid>
        </Fix>
      </HeaderWrap>
    </>
  );
};

const HeaderWrap = styled.header`
  max-width: 100%;
  width: 100%;
  position: absolute;
  ${(props) => (props.showHeader ? "display : flex;" : "display : none;")}
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  transition: box-shadow 600ms ease-in-out;
  box-shadow: 0 4px 15px 0 rgba(111, 111, 111, 0.16);
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: #ffffff;
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
  & > div > img {
    transition: all 1000ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;

const Mainselectbox = styled.div`
  width: 147px;
  margin: 0 30px 0 38px;
`;

const SubSelectbox = styled.div`
  width: 200px;
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
  width: 180px;
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
