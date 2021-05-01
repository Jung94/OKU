import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// // # 만들어야하는 버튼 종류
// // 로그인 / 회원가입 / 장바구니 / 구매하기 / 리뷰등록

// // # 버튼 element 구성 순서
// // 1. import Button from @material-ui
// // 2. material-ui 버튼 커스텀 스타일 참조 (makeStyles)
// // 3. JS에서 태그 style = {{ color : "red" }} 와 같은 문법이 아래 형식에 동일하게 적용
// // 4. element로 버튼을 넘겨줄 경우 onClick 기능을 따로 지정해야 한다. () => {}
// // 5. react hooks 에서는 if문의 분기 처리가 안된다고 오류가 뜨는데 *** 이 부분 공부해보기

const useStyles = makeStyles({
  primary: (props) => ({
    background: `linear-gradient(45deg, #33313188 30%, #5a565688 90%)`,
    border: "1.8px solid #3331311a",
    borderRadius: 30,
    boxShadow: "0 2px 5px 2px rgba(90, 86, 86, .2)",
    color: "white",
    height: 42,
    padding: "0 30px",
    margin: props.margin,
    width: props.width,
    transition: "color 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), border 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    "&:hover": {
      color: "#fff",
      background: "linear-gradient(45deg, #EE7B10 10%, #f112ff 90%)",
      border: "1.8px solid #f112ff",
      boxShadow: "0 2px 5px 2px #F112FF33",
    },
  }),
  // 수정 해야함
  primaryNoBorder: (props) => ({
    background: `linear-gradient(45deg, #33313188 30%, #5a565688 90%)`,
    border: "1px solid #ffffff",
    color: "white",
    borderRadius: 0,
    flexGrow: 1,
    height: 42,
    padding: "0 30px",
    margin: props.margin,
    width: "max-content",
    transition: "color 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), border 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    "&:hover": {
      color: "#fff",
      background: "linear-gradient(45deg, #EE7B10 10%, #f112ff 90%)",
      border: "1px solid #ffffff00",
      boxShadow: "0 2px 5px 2px #F112FF33",
    },
  }),
  // 있던 소스 가지고 온거라 일단 무시 요망!!!
  // 새로운 스타일 추가시 참고
  payment: (props) => ({
    background: `linear-gradient(45deg, #333131 30%, #5a5656 90%)`,
    border: 0,
    borderRadius: 30,
    boxShadow: "0 2px 5px 2px rgba(90, 86, 86, .2)",
    color: "white",
    height: 42,
    padding: "0 30px",
    margin: props.margin,
    width: props.width,
    "&:hover": {
      color: "#fff",
      background: `linear-gradient(45deg, #EE7B10 30%, orange 90%)`,
    },
    "&.active": {
      color: "#fff",
      background: `linear-gradient(45deg, #EE7B10 30%, orange 90%)`,
    },
  }),
});

// Hook.defaultProps = {
//   children: null,
//   _onClick: () => {},
// };

export default function Hook(props) {
  const classes = useStyles(props);
  const { _onClick } = props;
  return (
    <Button onClick={_onClick} className={props.primaryNoBorder ? classes.primaryNoBorder : props.yellow ? classes.yellow : classes.primary}>
      {props.text ? props.text : props.children}
    </Button>
  );
}
