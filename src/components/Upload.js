import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Button } from "../elements";
import { actionCreators as uploadActions } from "redux/modules/upload";

// +) file reader 미리 설명 /// 업로드 만들기 전에 미리 *** 숙제? 설명?
// 참고 url 주기 ::: https://developer.mozilla.org/ko/docs/Web/API/FileReader

// React.memo => re-render 방지용임
const Upload = React.memo((props) => {
  // console.log(props);
  const { src } = props;
  return <ImagePrv src={src} />;
});

Upload.defaultProps = {
  onChange: (img) => {},
  src: "http://via.placeholder.com/400x300",
};

const ImagePrv = styled.div`

`;

export default Upload;
