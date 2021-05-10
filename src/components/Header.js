import React, { useMemo, useEffect } from "react";
import styled from "styled-components";
import { history } from "redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as productActions } from "redux/modules/result";
import { actionCreators as categoryActions } from "redux/modules/post";
import { actionCreators as userActions } from "redux/modules/user";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";

import { Grid, Input, Line, Button, Tag, Modal, Text } from "elements/";
import Select from "react-select";
import ListBtn from "components/ListBtn";
import ListHover from "components/ListHover";
import DetailRing from "components/DetailRing";

import MainLogo from "images/logo.png";
import Submit from "images/search.png";
import List from "images/list.png";
import { Color } from "shared/DesignSys";

const Header = (props) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = React.useState("");
  const [mainct, setMainct] = React.useState("");
  const [subct, setSubct] = React.useState("");
  const is_login = useSelector((state) => state.user.is_login);

  useEffect(() => {
    dispatch(userActions.isLogin());
    window.addEventListener("scroll", headerChange);
    return () => window.removeEventListener("scroll", headerChange);
  }, []);

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
    if (mainct === "2D") {
      setSubct(option_2);
      dispatch(categoryActions.getProductMainCategotAPI(mainct));
    } else if (mainct === "3D") {
      setSubct(option_3);
      dispatch(categoryActions.getProductMainCategotAPI(mainct));
    }
  };

  const handleSubCategory = (e) => {
    setSubct(e.value);
    console.log(handleSubCategory);
    dispatch(categoryActions.getProductSubCategotAPI(mainct, subct));
  };

  const MainCT = [
    { value: "2D", label: "2D" },
    { value: "3D", label: "3D" },
  ];
  const option_2 = [
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

  const option_3 = [
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
    if (window.scrollY > 170) {
      navbox.style.position = "fixed";
      navbox.style.zIndex = "9999";
      navbox.style.backgroundColor = "#ffffff";
      navbox.style.boxShadow = "0 4px 15px 0 rgba(111, 111, 111, 0.16)";
      navbox.style.height = "89px";
      navbox.style.opacity = "100%";
      navbox.style.display = "flex";
    } else {
      navbox.style.opacity = "0";
      navbox.style.backgroundColor = "#ffffff00";
      navbox.style.boxShadow = "0 0 0 #00000000";
      navbox.style.height = "0px";
      navbox.style.overflow = "hidden";
      navbox.style.display = "none";
    }
    const navinbox = document.querySelector(".navin");
    if (window.scrollY > 170) {
      navinbox.style.zIndex = "9999";
      navinbox.style.height = "65px";
      navinbox.style.opacity = "100%";
      navinbox.style.display = "flex";
    } else {
      navinbox.style.opacity = "0";
      navinbox.style.height = "0px";
      navinbox.style.overflow = "hidden";
    }
  };

  return (
    <>
      <HeaderWrap>
        <Fix>
          <Grid is_flex width="33%">
            {/* 카테고리 리스트 방식 */}
            {/* <ListHover/> */}
            <Text h3>카테고리</Text>
            <ListBtn />

            <Mainselectbox>
              <Select
                placeholder="대분류"
                onChange={handleMainCategory}
                value={MainCT.find((obj) => obj.value === MainCT)}
                options={MainCT}
                styles={customStyles}
              />
            </Mainselectbox>
            {mainct === "" && (
              <SubSelectbox>
                <Select placeholder="중분류" onChange={handleSubCategory} styles={customStyles} />
              </SubSelectbox>
            )}

            {/* 2D일 때 */}
            {mainct === "2D" && (
              <SubSelectbox>
                <Select placeholder="중분류" onChange={handleSubCategory} options={option_2} styles={customStyles} />
              </SubSelectbox>
            )}
            {/* 3D일 때 */}
            {mainct === "3D" && (
              <SubSelectbox>
                <Select placeholder="중분류" onChange={handleSubCategory} options={option_3} styles={customStyles} />
              </SubSelectbox>
            )}
          </Grid>

          <Grid is_flex justify="center" width="33%">
            {/* 로고 */}
            <img
              alt="로고이미지"
              style={{ width: "117.8px", cursor: "pointer", zIndex: "1" }}
              src={MainLogo}
              onClick={() => {
                history.replace("/");
              }}
            />
          </Grid>

          <Grid is_flex column width="33%">
            <Grid is_flex gap="5%" justify="flex-end" margin="0 0 42px 0">
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
                      history.push("/Signup");
                    }}
                  >
                    회원가입
                  </Text>
                  <p style={{ fontSize: "12px", color: "#868686" }}>/</p>
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
                <div style={{ display: "flex" }}>
                  <Text subBody color={Color.Dark_4}>
                    로그아웃
                  </Text>
                </div>
              )}
              <Text subBody color={Color.Dark_4} onClick={() => history.push("/my/shopping")}>
                마이페이지
              </Text>
            </Grid>

            <Grid is_flex justify="flex-end">
              {/* 기능버튼 */}
              <SearchWrap>
                <Search
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
                  <FontAwesomeIcon icon={faBars} />
                  <Text h4>채팅</Text>
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
                  <FontAwesomeIcon icon={faBars} />
                  <Text h4 w>
                    물건등록
                  </Text>
                </Grid>
              </IconWrap>
            </Grid>
          </Grid>
        </Fix>
      </HeaderWrap>

      <HeaderWrap className="nav">
        <Scroll className="navin">
          <Grid is_flex width="50%">
            <Grid is_flex justify="center" padding="0 60px 0 0" flexShrink="1">
              {/* 로고 */}
              <img
                alt="로고이미지"
                style={{ width: "86.6px", cursor: "pointer" }}
                src={MainLogo}
                onClick={() => {
                  history.replace("/");
                }}
              />
            </Grid>
            <Grid is_flex>
              {/* 카테고리 리스트 방식 */}
              {/* <ListHover/> */}
              <Text h3>카테고리</Text>
              <ListBtn />

              <Mainselectbox>
                <Select
                  placeholder="대분류"
                  onChange={handleMainCategory}
                  value={MainCT.find((obj) => obj.value === MainCT)}
                  options={MainCT}
                  styles={customStyles}
                />
              </Mainselectbox>
              {mainct === "" && (
                <SubSelectbox>
                  <Select placeholder="중분류" onChange={handleSubCategory} styles={customStyles} />
                </SubSelectbox>
              )}

              {/* 2D일 때 */}
              {mainct === "2D" && (
                <SubSelectbox>
                  <Select placeholder="중분류" onChange={handleSubCategory} options={option_2} styles={customStyles} />
                </SubSelectbox>
              )}
              {/* 3D일 때 */}
              {mainct === "3D" && (
                <SubSelectbox>
                  <Select placeholder="중분류" onChange={handleSubCategory} options={option_3} styles={customStyles} />
                </SubSelectbox>
              )}
            </Grid>
          </Grid>

          <Grid is_flex column width="50%">
            <Grid is_flex justify="flex-end">
              {/* 기능버튼 */}
              <SearchWrap>
                <Search
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
                  <FontAwesomeIcon icon={faBars} />
                  <Text h4 
                  onClick={() => {
                    history.push("/chat");
                  }}>채팅</Text>
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
                  <FontAwesomeIcon icon={faBars} />
                  <Text h4 w>
                    물건등록
                  </Text>
                </Grid>
              </IconWrap>
            </Grid>
          </Grid>
        </Scroll>
      </HeaderWrap>
    </>
  );
};

const HeaderWrap = styled.header`
  max-width: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  box-shadow: 0 4px 15px 0 rgba(111, 111, 111, 0.16);
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: #ffffff;
`;

const Fix = styled.div`
  max-width: 1490px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 151px;
  padding-bottom: 32px;
`;

const Scroll = styled.div`
  max-width: 1490px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: auto 0;
  height: 0px;
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
  border-bottom: 2px solid black;
  height: 38px;
  background-color: transparent;
  svg {
    align-items: center;
    font-size: 18px;
    margin: auto 5px;
    cursor: pointer;
  }
`;

// 검색 input
const Search = styled.input`
  background-color: transparent;
  width: 180px;
  height: 38px;
  border: 0;
  outline: 0;
  transition: 0.4s;
  font-size: 16px;
  ::placeholder {
    color: ${Color.Light_4};
  }
  :focus {
    outline: none;
    width: 220;
  }
  :hover {
    width: 220px;
  }
`;

// 알림 버튼
const Ring = styled.p`
  cursor: pointer;
  margin: 0 15px 0 39px;
  width: 69px;
  height: 15px;
`;

// ICONS
const IconWrap = styled.div`
  display: inline-flex;
  svg {
    align-items: center;
    font-size: 18px;
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
