import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from 'redux/modules/user';
import Spinner from 'shared/Spinner';

// 소셜 로그인 리다이렉트 페이지

const Social = (props) => {
  console.log(props.match);
  const _id = props.match.params.id;
  const dispatch = useDispatch();
  console.log(_id);

  useEffect(() => {
    
    // 회원정보 디스패치
    dispatch(userActions.socialLoginDB(_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Spinner />
    </>
  );
}

export default Social;