import React, { useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Grid, Input, Line, Button, Text, Profile } from "elements/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC } from "@fortawesome/free-solid-svg-icons";

import { actionCreators as mypageActions } from "redux/modules/mypage";
import { Color } from "shared/DesignSys";

const Edit = (props) => {
  const dispatch = useDispatch();
  const { open, close } = props;
  const _user = useSelector((state) => state.mypage.user);

  const [changedNick, setNick] = useState("");
  const onChangeNick = useCallback((e) => setNick(e.target.value), []);

  const fileInput = useRef();

  const editProfile = () => {
    if (!changedNick && !fileInput.current.files[0]) {
      close();
    } else if (!changedNick && fileInput.current.files[0]) {
      // 사진만 바꿀때
      dispatch(mypageActions.editProfileAPI(_user.nickname, fileInput.current.files[0]));
      close();
    } else if (changedNick && !fileInput.current.files[0]) {
      // 닉네임만 바꿀때
      // 이게 문제.. url to blob이 심상치 않다
      dispatch(mypageActions.editProfileAPI(changedNick, null));
      close();
    } else {
      // 둘 다 바꾸기
      dispatch(mypageActions.editProfileAPI(changedNick, fileInput.current.files[0]));
      close();
    }
  };
  // const reader = new FileReader();

  // console.log(URL.createObjectURL(_user.profile)); // 파일 내용을 읽어오기

  const handleChange = (e) => {
    const reader = new FileReader();

    const file = e.target.files[0];
    // reader.readAsDataURL(file); // 파일 내용을 읽어오기
  };

  return (
    <>
      {open ? (
        <EditBox {...props} open={open}>
          <Text h2 marginT="9%" marginB="6%">
            내 정보 수정하기
          </Text>
          <label for="fileInput" style={{ cursor: "pointer" }}>
            <input style={{ display: "none" }} id="fileInput" type="file" accept="image/*" ref={fileInput} />
            <Profile size="150px" img={_user.profile} nomargin />
          </label>
          <Text subBody margin="10px" color={Color.Light_4}>
            사진을 누르면 수정이 가능합니다.
          </Text>
          <Input
            _onChange={onChangeNick}
            width="75%"
            margin="6% 0"
            onChange={handleChange}
            plcholder={`현재 닉네임 : ${_user.nickname}`}
            _onKeyPress={(e) => {
              if (window.event.keyCode === 13) {
                editProfile();
              }
            }}
          />
          <Button _onClick={editProfile} width="75%" margin="0 auto 9% auto">
            정보 수정하기
          </Button>
        </EditBox>
      ) : (
        <></>
      )}
    </>
  );
};

const EditBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default Edit;
