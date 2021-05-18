import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Text, Profile, Button, Modal } from "elements/";
import Menus from "./Menus";
import Loading from "shared/Loading";

import { actionCreators as mypageActions } from "redux/modules/mypage";
import { actionCreators as likeActions } from "redux/modules/like";

import { Color } from "shared/DesignSys";
import Myinfo from "components/my_page_1/Myinfo";
import Steam from "components/my_page_1/Steam";
import PurchaseList from "components/my_page_1/PurchaseList";

const My = (props) => {
  const dispatch = useDispatch();
  const { history, location, match } = props;
  var nowLocation = location.pathname.split("/")[2];

  const access_token = localStorage.getItem("access_token");
  const _user = useSelector((state) => state.mypage.user);
  const is_loading = useSelector((state) => state.product.is_loading);
  console.log(_user);

  useEffect(() => {
    if (access_token) {
      dispatch(mypageActions.setProfileAPI());
      dispatch(mypageActions.setInfoAPI());
      dispatch(mypageActions.setMystoreAPI());
      dispatch(likeActions.getMyLikeListAPI());
    }
  }, []);

  if (is_loading) {
    return <Loading />;
  }
  return (
    <Wrap>
      <Modi>
        <Profile size="150px" img={_user.profile} nomargin />
        <Modal setting {..._user} />
      </Modi>
      <Text h2 weight="600" textAlign="center" marginT="2%">
        {_user.nickname} 님 <br/> 오늘도  <span style={{color : "#AE00FF"}}>즐거운 덕질하세요!</span>
      </Text>
      <Myinfo/>
      <Steam/>
      <PurchaseList/>
      {/* <BtnBox>
        <Link to="/my/shopping">{nowLocation === "shopping" ? <Button>마이 쇼핑</Button> : <Button sub>마이 쇼핑</Button>}</Link>
        <Link to="/my/store">{nowLocation === "store" ? <Button>내 상점</Button> : <Button sub>내 상점</Button>}</Link>
        <Link to="/my/alert">{nowLocation === "alert" ? <Button>알림</Button> : <Button sub>알림</Button>}</Link>
        <Link to="/my/info">{nowLocation === "info" ? <Button>회원 정보</Button> : <Button sub>회원 정보</Button>}</Link>
      </BtnBox>
      <Route
        path="/my"
        exact
        render={() => (
          <div>
            유저를 선택해주세요.
            <br />
            <br />
            <br />
            &ensp;
            <br />
            &ensp;
            <br />
            &ensp; &ensp;
          </div>
        )}
      />
      <Route path="/my/:menu" component={Menus} /> */}
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 1030px;
  margin: 200px auto 100px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`;

const Modi = styled.div`
  width: 150px;
  height: 150px;
  display: flexbox;
  align-items: flex-end;
  .setting {
    margin-left: -35px;
    margin-bottom: -125px;
    color: white;
    background-color: ${Color.Primary};
    width: 32px;
    height: 32px;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
  }
`;

const BtnBox = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  margin: 50px 0 40px;

  & button {
    padding: 0 30px;
    width: 14rem;
  }
`;

export default My;
