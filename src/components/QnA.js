import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { Grid, Input, Line, Button, Text, Profile } from "elements/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart, faPen as fasPen } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";
import "moment/locale/ko";

import { actionCreators as productActions } from "redux/modules/product";

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
        <Grid is_flex>
          <Profile img={buyerprofile}></Profile>
          <div style={{ flexGrow: "1" }}>
            <Grid is_flex justify="space-between">
              <Text h3 weight="600">
                {buyernickname}
              </Text>
              <Text subBody>{moment(createdAt).fromNow()}</Text>
            </Grid>
            <Grid is_flex textAlign="left">
              {contents}
            </Grid>
          </div>
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
          답글
        </OpenPostBtn>
        <Line bottom />
        {/* {sellerId} */}
        {openPost && (
          <QnAWrap openPost>
            <Grid is_flex>
              <div style={{ flexGrow: "2" }}>
                <Grid is_flex justify="space-between">
                  <p style={{ fontWeight: "bold" }}>{sellernickname}</p>
                  <Text subBody>{answer && answer !== " " && moment(updatedAt).fromNow()}</Text>
                </Grid>
                <Grid is_flex textAlign="left">
                  {answer}
                </Grid>
              </div>
            </Grid>

            <QnAPost openPost>
              <Input
                plcholder="답변을 작성해주세요! 가장 마지막에 남긴 글만 등록됩니다."
                width="80%"
                margin="0 1% 0 0"
                _onChange={onChangeContents}
              ></Input>
              <Button _onClick={addAnswer}>등록</Button>
            </QnAPost>

            <Line bottom />
          </QnAWrap>
        )}
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
  ${(props) => (props.openPost ? "background-color: #efefef;" : "padding: 1%;")}
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// 문의하기
const QnAPost = styled.div`
  ${(props) => (props.openPost ? "padding-bottom: 1%;" : "padding: 1%;")}
  width: 100%;
  display: flex;
`;

// 누르면 열리는 버튼
const OpenPostBtn = styled.div`
  color: grey;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid grey;
  width: 80px;
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
