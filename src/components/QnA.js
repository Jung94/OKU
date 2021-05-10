import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { Grid, Input, Line, Button, Text, Profile } from "elements/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart, faPen as fasPen } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";
import "moment/locale/ko";

import { actionCreators as productActions } from "redux/modules/product";

import { Color } from "shared/DesignSys";

const QnA = (props) => {
  const dispatch = useDispatch();
  // console.log("🔘QnA", props);
  const { buyernickname, buyerprofile, sellernickname, contents, answer, createdAt, updatedAt, productId, sellerId, _id } = props;

  const [_answer, setAnswer] = useState("");
  const onChangeContents = useCallback((e) => setAnswer(e.target.value), []);

  const addAnswer = () => {
    dispatch(productActions.addAnswerAPI(_id, _answer, sellerId, Date.now()));
  };

  const [openPost, setOpen] = useState(false);

  // if (_qna_list) {
  return (
    <>
      {/* qna리스트 시작 */}
      <QnAWrap>
        <Grid dp_flex>
          <Profile img={buyerprofile} />

          <Grid is_flex column>
            <Grid margin="1% 0">
              <Text subBody textAlign="right" color={Color.Dark_4}>
                {moment(createdAt).fromNow()}
              </Text>
              <Text h4 weight="700">
                {buyernickname}
              </Text>
              <Grid is_flex textAlign="left">
                {contents}
              </Grid>
            </Grid>

            <OpenPostBtn
              onClick={() => {
                if (openPost === false) {
                  setOpen(true);
                } else {
                  setOpen(false);
                }
              }}
            >
              <FontAwesomeIcon icon={fasPen} style={{ color: "grey", cursor: "pointer" }} />
              답변하기
            </OpenPostBtn>

            {openPost && (
              <AnswerWrap openPost>
                <Grid is_flex>
                  <Grid is_flex textAlign="left">
                    {answer && (
                      <Grid column>
                        <Line bottom margin="10px 0" />
                        <Grid is_flex textAlign="left" justify="space-between" margin="0 0 10px 0">
                          {answer}
                          <Text subBody color={Color.Dark_4}>
                            {answer !== " " && moment(updatedAt).fromNow()}
                          </Text>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>

                <QnAPost openPost>
                  <Input
                    text
                    fnc={addAnswer}
                    plcholder="답변을 작성해주세요! 가장 마지막에 남긴 글만 등록됩니다."
                    width="100%"
                    _onChange={onChangeContents}
                  ></Input>
                </QnAPost>
              </AnswerWrap>
            )}
          </Grid>
        </Grid>
      </QnAWrap>
    </>
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
  padding: 10px 30px;
  flex-direction: column;
  background-color: ${Color.Light_3};
  border-radius: 16px;
  margin-bottom: 10px;
`;

const AnswerWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${Color.Light_3};
  border-radius: 16px;
  margin-bottom: 10px;
`;

// 문의하기
const QnAPost = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

// 누르면 열리는 버튼
const OpenPostBtn = styled.div`
  color: grey;
  font-size: 14px;
  cursor: pointer;
  padding: 5px 5px 5px 0;
  margin: auto 0 1% auto;
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

export default QnA;
