import React from "react";
import {Button} from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as uploadActions } from "redux/modules/upload";
import styled from "styled-components"
import { Color } from "shared/DesignSys";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// import {storage} from "./firebase";
// import {Grid, Text, Button, Image, Input} from "../elements";

const Upload = (props) => {
    const dispatch = useDispatch();
    const is_uploading = useSelector((state) => state.upload.progress);
    const fileInput = React.useRef();

    const selectFile = (e) => {
        // e.target은 input이죠!
        // input이 가진 files 객체를 살펴봅시다.
        console.log(e.target.files);
        // 선택한 파일이 어떻게 저장되어 있나 봅시다.
        console.log(e.target.files[0]);

        // ref로도 확인해봅시다. :)
        console.log(fileInput.current.files[0]);

        const reader = new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            dispatch(uploadActions.setPreview(reader.result));
        }
    }

    // const uploadFB = () => {
    //     let image = fileInput.current.files[0];
    //     dispatch(uploadActions.uploadImageFB(image));
    // }

    const {src, size} = props;

    const styles = {
        src: src,
        size: size,
    }

    return (
        <React.Fragment>
                
                <InputFile {...styles} for="input-file">업로드 하기</InputFile>
                <input type="file" id="input-file" label="Upload" onChange={selectFile} ref={fileInput} disabled={is_uploading} style={{display:"none"}}/>
        </React.Fragment>
    )
}

Upload.defaultProps = {
    // src: "https://wallpaperaccess.com/full/3333141.jpg",
    size: 36,
};
    

const InputFile = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 180px;

    text-align: center;
    overflow: hidden;
    color: ${Color.Dark_4};
    background-color: ${Color.Light_3};
    background-image: url("${(props) => props.src}");
    background-size: cover;
    background-position: center;
    // border: none;
    border-radius: 16px;
`;

export default Upload;