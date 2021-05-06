import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../elements";
import { actionCreators as uploadActions } from "redux/modules/upload";

// +) file reader 미리 설명 /// 업로드 만들기 전에 미리 *** 숙제? 설명?
// 참고 url 주기 ::: https://developer.mozilla.org/ko/docs/Web/API/FileReader

// React.memo => re-render 방지용임
const Upload = React.memo((props) => {
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.image.progress);

  const fileInput = useRef();

  const uploadFB = () => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert("파일을 선택해주세요!");
      return;
    }
    dispatch(uploadActions.uploadImageFB(fileInput.current.files[0]));
  };

  //   preview 설정
  const handleChange = (e) => {
    // e.target은 input이죠!
    // input이 가진 files 객체를 살펴봅시다.
    console.log(e.target.files);
    // 선택한 파일이 어떻게 저장되어 있나 봅시다.
    console.log(e.target.files[0]);
    // ref로도 확인해봅시다. :)
    console.log(fileInput.current.files[0]);

    // e.preventDefault();
    const reader = new FileReader();
    // e.target.files도 가능
    const file = e.target.files[0];

    // 파일 내용을 읽어옵니다.
    reader.readAsDataURL(file);

    // 읽기가 끝나면 발생하는 이벤트 핸들러예요! :)
    reader.onloadend = () => {
      // reader.result는 파일의 컨텐츠(내용물)입니다!
      console.log(reader.result);
      dispatch(uploadActions.setPreview(reader.result));
    };
  };

  return (
    <React.Fragment>
      <input type="file" onChange={handleChange} disabled={progress} ref={fileInput} />
      <Button text="업로드" __click={uploadFB} />
    </React.Fragment>
  );
});

Upload.defaultProps = {
  onChange: (img) => {},
};

export default Upload;
