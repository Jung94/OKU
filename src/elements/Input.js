import React, { useRef, useState } from "react";
import styled from "styled-components";

import { Grid, Text, Button } from "elements/";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare as fasCheckSquare, faCheck as fasCheck } from "@fortawesome/free-solid-svg-icons";

import { Color } from "shared/DesignSys";

const Input = (props) => {
  // adorment는 input 오른쪽에 "원"
  // plcholder는 placeholder
  // onClick...등은 항상 _ 붙이세요!
  // Input type은 type 자체로 쓸 수 있고, output / radio / check / (일반 버튼)

  // 사용법 참고 할 곳
  // output -> 디테일
  // 일반 -> 디테일
  // radio -> 상품 업로드
  // check -> 로그인

  const {
    whiteSpace,
    output,
    text,
    check,
    radio,
    center,
    fix,
    left,
    disabled,
    checked,
    maxLength,
    width,
    height,
    margin,
    adorn,
    adornment,
    plcholder,
    num,
    children,
    value,
    name,
    id,
    _onClick,
    _onChange,
    _onKeyPress,
    _onFocus,
    _onBlur,
    type,
    fnc,
    btn,
    smbtn,
    desc,
  } = props;

  const styles = {
    name: name,
    onClick: _onClick,
    onChange: _onChange,
    onKeyPress: _onKeyPress,
    onFocus: _onFocus,
    onBlur: _onBlur,
    type: type,
    maxLength: maxLength,
    id: id,
    disabled: disabled,
    checked: checked,
    width: width,
    height: height,
    margin: margin,
    num: num,
    center: center,
    left: left,
    output: output,
    fix: fix,
    adorn: adorn,
    whiteSpace: whiteSpace,
  };
  const inputEl = useRef();

  if (output) {
    return (
      <InputBox {...styles}>
        <input type={type} ouput={output} center={center} placeholder={plcholder} name={name} value={value}>
          {children}
        </input>
        {adornment && <span>{adornment}</span>}
      </InputBox>
    );
  }

  if (radio) {
    return (
      <RadioCheck
        {...styles}
        onClick={() => {
          inputEl.current.focus();
        }}
      >
        <input type="radio" ouput={output} center={center} ref={inputEl} placeholder={plcholder} name={name} value={value} onChange={_onChange} onFocus={_onFocus} onBlur={_onBlur}>
          {children}
        </input>
        <span className="checkmark" />
        <div className="value">{value && value}</div>
        <div className="desc">{desc && desc}</div>
      </RadioCheck>
    );
  }

  if (check) {
    return (
      <CheckBox
        {...styles}
        onClick={() => {
          inputEl.current.focus();
        }}
      >
        {checked ? (
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <rect x="0" y="0" width="25" height="25" rx="7" fill={Color.Primary} />
            <path d="M6.92444 12.4281L11.2176 18.2825L19.3162 8.23248" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        ) : (
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <rect x="0" y="0" width="25" height="25" rx="7" fill={Color.Light_3} />
            <path d="M6.92444 11.6981L11.2176 17.5525L19.3162 7.5025" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        )}
        <input
          type="checkbox"
          checked={checked}
          ouput={output}
          center={center}
          ref={inputEl}
          placeholder={plcholder}
          name={name}
          value={value}
          onClick={_onClick}
          onChange={_onChange}
          onFocus={_onFocus}
          onBlur={_onBlur}
        >
          {children}
        </input>
        <div className="value">{value && value}</div>
        <div className="desc">{desc && desc}</div>
      </CheckBox>
    );
  }

  if (text) {
    return (
      <>
        <TextareaBox
          {...styles}
          onClick={() => {
            inputEl.current.focus();
          }}
        >
          <textarea fix={fix} type={type} ref={inputEl} placeholder={plcholder} value={value} maxLength={maxLength} onChange={_onChange} onKeyPress={_onKeyPress} onFocus={_onFocus} onBlur={_onBlur}>
            {children}
          </textarea>
          {btn ? (
            <Btn>
              <Text subBody color={Color.Light_4}>
                {adornment}
              </Text>
              <Button width="30%" _onClick={fnc} margin="0 0 0 10px ">
                {btn}
              </Button>
            </Btn>
          ) : smbtn ? (
            <Btn>
              <Text subBody color={Color.Light_4}>
                {adornment}
              </Text>
              <Button _onClick={fnc} margin="0 0 0 10px ">
                {smbtn}
              </Button>
            </Btn>
          ) : (
            <Text subBody color={Color.Light_4}>
              {adornment}
            </Text>
          )}
        </TextareaBox>
      </>
    );
  }

  return (
    <>
      <InputBox
        {...styles}
        onClick={() => {
          inputEl.current.focus();
        }}
      >
        <input id={id} type={type} ref={inputEl} placeholder={plcholder} value={value} maxLength={maxLength} onChange={_onChange} onKeyPress={_onKeyPress} onFocus={_onFocus} onBlur={_onBlur}>
          {children}
        </input>
        <span>{adornment}</span>
      </InputBox>
    </>
  );
};

Input.defaultProps = {
  _onClick: () => {},
  _onChange: () => {},
  _onKeyPress: () => {},
  _onFocus: () => {},
  _onBlur: () => {},
};

const Inputsize = "14px"; // 내부 내용 폰트 사이즈
const Inputsize_money = "18px"; // 내부 내용 폰트 사이즈
const Inputsize_sm = "12px"; // 내부 내용 부속 폰트 사이즈

// basic input
const InputBox = styled.div`
  width: ${(props) => (props.width ? props.width : "")};
  height: ${(props) => (props.height ? props.height : "45px")};
  margin: ${(props) => (props.width ? props.margin : "")};
  border: 1px solid ${Color.Light_3};
  border-radius: 12px;
  padding: 10px;

  display: flex;
  align-items: center;

  transition: border 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  // grey backColor input
  ${(props) =>
    props.output
      ? `background-color: ${Color.Light_3}; user-select: none; `
      : `background-color: transparent;
      &:focus-within {
    border: 1px solid ${Color.Primary};
    box-shadow: 0 0 0 3px ${Color.Primary}33;
    user-select: none;
  }`}

  input {
    background-color: transparent;
    align-items: center;
    border: 0px;
    outline: 0;

    width: 100%;
    padding-left: 10px;
    padding-right: 10px;

    font-weight: 400;
    font-size: ${Inputsize};

    ${(props) => (props.center ? `font-size: ${Inputsize}; text-align: center;` : props.left ? `font-size: ${Inputsize}; text-align: left;` : `font-size: ${Inputsize};`)}
    ${(props) => (props.num ? `text-align: right; font-size: ${Inputsize_money};` : "")}

    ::placeholder {
      text-align: left;
      align-items: center;
      font-size: ${Inputsize};
      font-weight: 400;
      color: ${Color.Holder};
    }
    &:focus {
      outline: none;
    }
  }
  span {
    user-select: none;
    padding-right: 10px;
    font-weight: 500;
    align-items: center;
    padding: auto 0;
    margin-bottom: -1px;
    ${(props) => (props.adorn ? `width: 70px; color: ${Color.Holder}; font-size: ${Inputsize_sm}; text-align:right;` : `width: max-content; font-size: ${Inputsize};`)}
  }
`;

// radio input
const RadioCheck = styled.label`
  // text drag 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  transition: background-color 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  :hover {
    svg {
      box-shadow: 0 0 0 3px ${Color.Primary}33;
    }
    span {
      box-shadow: 0 0 0 3px ${Color.Primary}33;
      background-color: ${Color.Light_2};
    }
  }

  input {
    opacity: 0;
    height: 0;
    width: 0;

    &:focus {
      outline: none;
    }
    :checked ~ .checkmark {
      background-color: white;
      border: 7px solid ${Color.Primary};
    }
  }

  // checkmark
  span {
    display: block;
    align-items: center;

    width: 20px;
    height: 20px;

    border-radius: 50%;
    background-color: ${Color.Light_3};

    transition: box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    :hover {
      box-shadow: 0 0 0 3px ${Color.Primary}33;
    }
  }

  .value {
    margin-left: 8px;
    display: flex;
  }

  .desc {
    vertical-align: -2px;
    margin-left: 5px;
    font-size: ${Inputsize_sm};
    color: ${Color.Dark_4};
    flex-wrap: wrap;
  }
`;

const CheckBox = styled.label`
  // text drag 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  display: flex;
  align-items: center;

  transition: background-color 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  :hover {
    svg {
      box-shadow: 0 0 0 3px ${Color.Primary}33;
    }
    span {
      box-shadow: 0 0 0 3px ${Color.Primary}33;
      background-color: ${Color.Light_2};
    }
  }

  input {
    opacity: 0;
    height: 0;
    width: 0;
    &:focus {
      outline: none;
    }
  }

  svg {
    display: flex;
    align-items: center;
    border-radius: 7px;
    height: 18px;
    width: 18px;
    transition: box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    :hover {
      box-shadow: 0 0 0 3px ${Color.Primary}33;
    }
  }

  .value {
    margin-left: 8px;
    display: flex;
  }

  .desc {
    vertical-align: -2px;
    margin-left: 5px;
    font-size: ${Inputsize_sm};
    color: ${Color.Dark_4};
    flex-wrap: wrap;
  }
`;

const TextareaBox = styled.div`
  width: ${(props) => (props.width ? props.width : "")};
  height: ${(props) => (props.height ? props.height : "160px")};
  min-height: 100px;
  margin: ${(props) => (props.margin ? props.margin : "")};

  border: 1px solid ${Color.Light_3};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  padding: 20px 25px 10px 25px;
  box-sizing: border-box;

  background-color: white;

  transition: border 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:focus-within {
    border: 1px solid ${Color.Primary};
    box-shadow: 0 0 0 3px ${Color.Primary}33;
  }

  textarea {
    ${(props) => (props.fix ? `resize: none;` : "")}
    box-sizing: border-box;
    width: 100%;
    border: 0px;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    min-height: 65px;
    height: 100%;
    align-items: center;
    font-weight: 400;
    font-size: ${Inputsize};
    ${(props) => (props.num ? "text-align: right;" : "")}
    ::placeholder {
      text-align: left;
      align-items: center;
      font-size: ${Inputsize};

      color: ${Color.Holder};
    }
    &:focus {
      outline: none;
    }
  }
  div {
    ${(props) => (props.adorn ? `width: 70px; color:${Color.Light_4}` : `width:100%; text-align:right;`)}
  }
`;

const Btn = styled.div`
  width: 20%;
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px -15px 0 auto;
  button {
    width: 20%;
    font-size: ${Inputsize};
    height: 40px;
  }

  @media only screen and (max-width: 767px) {
    width: 60%;

    button {
      width: 50%;
      font-size: ${Inputsize};
      height: 40px;
    }
  }
`;

export default Input;
