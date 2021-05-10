import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Text, Profile, Button } from "elements/";
import Menus from "./Menus";

import { actionCreators as mypageActions } from "redux/modules/mypage";

const My = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const access_token = localStorage.getItem("access_token");
  const _user = useSelector((state) => state.mypage.user);
  console.log(_user);

  useEffect(() => {
    if (access_token) {
      dispatch(mypageActions.setProfileAPI());
    }
  }, []);

  return (
    <Wrap>
      <Profile size="150px" img={_user.profile}></Profile>
      <Text h2 weight="600" textAlign="center" marginB="1%">
        {_user.nickname}
      </Text>
      <BtnBox>
        <Link to="/my/shopping">
          <Button>마이 쇼핑</Button>
        </Link>
        <Link to="/my/store">
          <Button>내 상점</Button>
        </Link>
        <Link to="/my/alert">
          <Button>알림</Button>
        </Link>
        <Link to="/my/info">
          <Button>회원 정보</Button>
        </Link>
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
      <Route path="/my/:menu" component={Menus} />
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

const Profile_ = styled.div`
  min-width: 150px;
  height: 150px;
  margin: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  background-image: url("https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 50px 0 40px;

  & button {
    padding: 0 30px;
  }
`;

export default My;
