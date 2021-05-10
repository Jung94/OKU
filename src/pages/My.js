import React from 'react';
import styled from "styled-components";
import { Link , Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from "elements/";
import Menus from './Menus';

import { actionCreators as mypageActions } from 'redux/modules/mypage';

const My = (props) => {
  const dispatch = useDispatch();
  const {history} = props;
  const access_token = localStorage.getItem('access_token');
  const username = useSelector((state) => state.mypage.nickname);

  React.useEffect(() => {
    if (access_token) {
      dispatch(mypageActions.setProfileAPI());
    }
  }, []);

  return (
    <Wrap>
      <Profile></Profile>
      <Text h2 weight="600" textAlign="center" marginB="1%">{username}</Text>
      <BtnBox>
        <Link to='/my/shopping'><button>마이 쇼핑</button></Link>
        <Link to='/my/store'><button>내 상점</button></Link>
        <Link to='/my/alert'><button>알림</button></Link>
        <Link to='/my/info'><button>회원 정보</button></Link>
      </BtnBox>
      <Route path='/my' exact render={() => <div>유저를 선택해주세요.</div>} />
      <Route path='/my/:menu' component={Menus} />
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 1030px;
  margin: 200px auto 100px;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`;

const Profile = styled.div`
  min-width: 150px;
  height: 150px;
  margin: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  background-image: url('https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 50px 0 40px;
//   border: 1px solid red;

  & button {
      padding: 14px 30px;
      font-size: 1rem;
      border: 1px solid rgba(0, 0, 0, 0.3);
      background: #fff;
      cursor: pointer;
  }
`;

export default My;