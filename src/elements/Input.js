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
    info,
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
    info: info,
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
        <input type={type} ouput={output} info={info} placeholder={plcholder} name={name} value={value}>
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
        <input type="radio" ouput={output} info={info} ref={inputEl} placeholder={plcholder} name={name} value={value} onChange={_onChange} onFocus={_onFocus} onBlur={_onBlur}>
          {children}
        </input>
        <span className="checkmark" />
        <div>
          {value && <>&ensp;{value}</>}&ensp;
          <Text subBody color={Color.Dark_4}>
            {desc}
          </Text>
        </div>
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
          info={info}
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
        <div>
          {value && <>&ensp;{value}</>}&ensp;
          <Text subBody color={Color.Dark_4}>
            {desc}
          </Text>
        </div>
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
          {btn && (
            <div>
              <Text h4 color={Color.Light_3}>
                {adornment}
              </Text>
              <Button width="30%" _onClick={fnc} margin="0 0 0 10px ">
                {btn}
              </Button>
            </div>
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

const InputBox = styled.div`
  width: ${(props) => (props.width ? props.width : "")};
  margin: ${(props) => (props.width ? props.margin : "")};
  border: 1px solid ${Color.Light_3};
  display: flex;
  align-items: center;
  border-radius: 16px;
  padding: 10px;
  transition: border 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  ${(props) =>
    props.output
      ? `background-color: ${Color.Light_3}; user-select: none; height: 50px;`
      : `background-color: white;
      &:focus-within {
    border: 1px solid ${Color.Primary};
    box-shadow: 0 0 0 3px ${Color.Primary}33;
  }`}

  input {
    background-color: transparent;
    ::placeholder {
      text-align: left;
      align-items: center;
      font-size: 16px;
      font-weight: 400;
      color: #c0c0c0;
    }
    border: 0px;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    align-items: center;
    font-weight: 400;
    ${(props) => (props.info ? "font-size: 16px; text-align: center;" : props.left ? "font-size: 16px; text-align: left;" : "font-size: 20px;")}
    ${(props) => (props.num ? `text-align: right; ` : "")}
    &:focus {
      outline: none;
    }
  }
  span {
    padding-right: 10px;
    font-size: 16px;
    font-weight: 400;
    align-items: center;
    padding: auto 0;
    width: max-content;
    ${(props) => (props.adorn ? `width: 70px;` : `width: max-content;`)}
  }
`;

const RadioCheck = styled.label`
  align-items: center;
  display: flex;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
    display: flex;
    align-items: center;

    height: 20px;
    width: 20px;
    background-color: ${Color.Light_3};
    border-radius: 50%;
    transition: box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    :hover {
      box-shadow: 0 0 0 3px ${Color.Primary}33;
    }
  }
  // desc
  div {
    display: flex;
    align-items: center;
  }
`;

const CheckBox = styled.label`
  align-items: center;
  display: flex;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
    height: 20px;
    width: 20px;
    transition: box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    :hover {
      box-shadow: 0 0 0 3px ${Color.Primary}33;
    }
  }
  // desc
  div {
    display: flex;
    align-items: center;
  }
`;

const TextareaBox = styled.div`
  width: ${(props) => (props.width ? props.width : "")};
  height: 178px;
  margin: ${(props) => (props.margin ? props.margin : "")};
  min-height: 100px;
  border: 1px solid ${Color.Light_3};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  padding: 25px;
  box-sizing: border-box;

  transition: border 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  ${(props) => (props.output ? `background-color: ${Color.Light_3}; user-select: none; height: 50px;` : "background-color: white;")}
  &:focus-within {
    border: 1px solid ${Color.Primary};
    box-shadow: 0 0 0 3px ${Color.Primary}33;
  }
  textarea {
    ${(props) => (props.fix ? `resize: none;` : "")}
    box-sizing: border-box;
    width: 100%;
    background-color: transparent;
    ::placeholder {
      text-align: left;
      align-items: center;
      font-size: 16px;
      font-weight: 400;
      color: #c0c0c0;
    }
    border: 0px;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    min-height: 65px;
    // height: 100%;
    align-items: center;
    font-weight: 400;
    font-size: 16px;
    ${(props) => (props.num ? "text-align: right;" : "")}
    &:focus {
      outline: none;
    }
  }
  div {
    width: 30%;
    display: inline-flex;
    justify-content: flex-end;
    text-align: right;
    align-items: center;
    margin: 20px 0 0 auto;
  }
`;

export default Input;
