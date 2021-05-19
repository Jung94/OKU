import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { Grid, Input, Line, Button, Text, Profile } from "elements/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart, faPen as fasPen } from "@fortawesome/free-solid-svg-icons";

import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";

import moment from "moment";
import "moment/locale/ko";

import { actionCreators as productActions } from "redux/modules/product";
import { toEnter } from "shared/common";

import { Color } from "shared/DesignSys";

const QnA = (props) => {
  const dispatch = useDispatch();
  // console.log("🔘QnA", props);
  const is_seller = localStorage.getItem("uid");
  const { buyernickname, buyerprofile, profileImg, sellernickname, contents, answer, createdAt, updatedAt, productId, sellerId, _id, noProfile } = props;

  const [_answer, setAnswer] = useState("");
  const onChangeContents = useCallback((e) => setAnswer(e.target.value), []);

  const addAnswer = () => {
    dispatch(productActions.addAnswerAPI(_id, _answer, sellerId, Date.now()));
    setAnswer("");
    setOpen(false);
  };

  const [openPost, setOpen] = useState(false);

  const [ACnt, setACnt] = useState(""); // 문의 답글

  if (noProfile) {
    return (
      <QnAWrap>
        <Grid dp_flex>
          <Grid is_flex column>
            <Grid is_flex justify="space-between" margin="1px 0 5px 0">
              {sellernickname === buyernickname ? (
                <IfSeller>
                  {buyernickname}
                  <span sytle={{ fontWeight: "400", color: Color.Dark_4 }}>(판매자)</span>
                </IfSeller>
              ) : (
                <Text h4 weight="700">
                  {buyernickname}
                </Text>
              )}
              <Text subBody textAlign="right" color={Color.Dark_4}>
                {moment(createdAt).fromNow()}
              </Text>
            </Grid>
            <Grid is_flex textAlign="left">
              <Text h4>{contents}</Text>
            </Grid>

            {answer && (
              <>
                <Grid is_flex textAlign="left">
                  <Grid column>
                    <Line bottom color={Color.Light_4} margin="20px 0 25px 0" />

                    <Grid dp_flex textAlign="left" justify="space-between" margin="0 0 15px 0">
                      <Grid dp_flex width="80%">
                        <SubdirectoryArrowRightIcon style={{ marginTop: "2px", marginRight: "5px", fontSize: "15px", color: Color.Dark_4, cursor: "default" }} />
                        <AnswerContents>
                          <span>판매자</span>
                          {answer}
                        </AnswerContents>
                      </Grid>
                      <Text subBody color={Color.Dark_4}>
                        {answer && moment(updatedAt).fromNow()}
                      </Text>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
            {is_seller === sellerId && (
              <OpenPostBtn
                onClick={() => {
                  if (openPost === false) {
                    setOpen(true);
                  } else {
                    setOpen(false);
                  }
                }}
              >
                {answer ? "수정하기" : "답변하기"}
              </OpenPostBtn>
            )}

            {openPost && (
              <AnswerWrap openPost>
                <QnAPost openPost>
                  <Input
                    text
                    fix
                    adornment={`${ACnt.length} / 500`}
                    plcholder={answer ? "문의 답글을 수정합니다." : "답변을 작성해주세요! 가장 마지막에 남긴 글만 등록됩니다."}
                    width="100%"
                    fnc={addAnswer}
                    _onChange={(e) => {
                      setAnswer(e.target.value);
                      setACnt(e.target.value);
                    }}
                    maxLength="500"
                    btn={answer ? "수정하기" : "등록하기"}
                  ></Input>
                </QnAPost>
              </AnswerWrap>
            )}
          </Grid>
        </Grid>
      </QnAWrap>
    );
  }
  // if (_qna_list) {
  return (
    <QnAWrap>
      <Grid dp_flex>
        <Profile img={buyerprofile || profileImg} size="50px" margin="0 15px 0 0" />

        <Grid is_flex column>
          <Grid is_flex justify="space-between" margin="2.5px 0 5px 0">
            {sellernickname === buyernickname ? (
              <IfSeller>
                {buyernickname}
                <span sytle={{ fontWeight: "400", color: Color.Dark_4 }}>(판매자)</span>
              </IfSeller>
            ) : (
              <Text h4 weight="700">
                {buyernickname}
              </Text>
            )}
            <Text subBody textAlign="right" color={Color.Dark_4}>
              {moment(createdAt).fromNow()}
            </Text>
          </Grid>
          <Grid is_flex textAlign="left">
            <Text h4>{contents}</Text>
          </Grid>

          {answer && (
            <>
              <Grid is_flex textAlign="left">
                <Grid column>
                  <Line bottom color={Color.Light_4} margin="20px 0 25px 0" />

                  <Grid dp_flex textAlign="left" justify="space-between" margin="0 0 15px 0">
                    <Grid dp_flex width="90%">
                      <SubdirectoryArrowRightIcon style={{ marginTop: "2px", marginRight: "5px", fontSize: "15px", color: Color.Dark_4, cursor: "default" }} />
                      <AnswerContents>
                        <span>판매자</span>
                        {answer}
                      </AnswerContents>
                    </Grid>
                    <Text subBody color={Color.Dark_4}>
                      {answer && moment(updatedAt).fromNow()}
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
          {is_seller === sellerId && (
            <OpenPostBtn
              onClick={() => {
                if (openPost === false) {
                  setOpen(true);
                } else {
                  setOpen(false);
                }
              }}
            >
              {answer ? "수정하기" : "답변하기"}
            </OpenPostBtn>
          )}

          {openPost && (
            <AnswerWrap openPost>
              <QnAPost openPost>
                <Input
                  text
                  fix
                  adornment={`${ACnt.length} / 500`}
                  plcholder={answer ? "문의 답글을 수정합니다." : "답변을 작성해주세요! 가장 마지막에 남긴 글만 등록됩니다."}
                  width="100%"
                  fnc={addAnswer}
                  _onChange={(e) => {
                    setAnswer(e.target.value);
                    setACnt(e.target.value);
                  }}
                  maxLength="500"
                  btn={answer ? "수정하기" : "등록하기"}
                ></Input>
              </QnAPost>
            </AnswerWrap>
          )}
        </Grid>
      </Grid>
    </QnAWrap>
  );
  // }
};

QnA.defaultProps = {
  buyerprofile: false,
  answer: false,
  updatedAt: false,
};

// QNA
const QnAWrap = styled.div`
  width: 100%;
  display: flex;
  padding: 21px 25px;
  flex-direction: column;
  background-color: ${Color.Light_3};
  border-radius: 12px;
  margin-bottom: 10px;
`;

const AnswerWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${Color.Light_3};
  border-radius: 12px;
  margin-top: 10px;
`;

// 문의글 남긴 사람이 판매자일때
const IfSeller = styled.div`
  font-size: 14px;
  font-weight: 700;
  span {
    margin-left: 5px;
    font-size: 12px;
    font-weight: 500;
    color: ${Color.Dark_4};
  }
`;

// 문의하기
const QnAPost = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

// 누르면 열리는 버튼
const OpenPostBtn = styled.div`
  color: ${Color.Dark_4};
  font-size: 12px;
  cursor: pointer;
  margin: auto 0 0px auto;
  svg {
    color: whitesmoke;
    margin: auto 10px;
    font-size: 0.75rem;
    transition: color 100ms ease-in-out, transform 100ms ease-in-out;
  }
  :hover {
    svg {
      color: #dedede;
      transform: scale(1.2) rotate(20deg);
    }
  }
`;

const AnswerContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 90%;
  span {
    font-weight: 700;
    margin-bottom: 2px;
  }
`;

export default QnA;
