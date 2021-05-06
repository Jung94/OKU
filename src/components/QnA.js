import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Input, Line, Button, Text, Profile } from "elements/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart, faPen as fasPen } from "@fortawesome/free-solid-svg-icons";
import { actionCreators as productActions } from "redux/modules/product";

const QnA = (props) => {
  const dispatch = useDispatch();
  console.log("🟣", props);
  const { _userId, contents, date, _id, nickname } = props;

  const [openPost, setOpen] = useState(false);

  // if (_qna_list) {
  return (
    <>
      {/* qna등록 */}
      <QnAPost>
        <Profile></Profile>
        <Input width="80%" margin="0 1% 0 0"></Input>
        <Button>등록</Button>
      </QnAPost>
      {/* qna리스트 시작 */}
      <QnAWrap>
        <Grid is_flex>
          <Profile></Profile>
          <div style={{ flexGrow: "1" }}>
            <Grid is_flex justify="space-between">
              <Text h3 weight="600">
                {_userId}
              </Text>
              <Text subBody>{date}</Text>
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
        {openPost && (
          <QnAWrap openPost>
            <Grid is_flex>
              <Profile></Profile>
              <div style={{ flexGrow: "2" }}>
                <Grid is_flex justify="space-between">
                  <p style={{ fontWeight: "bold" }}></p>
                  <Text subBody>2분전</Text>
                </Grid>
                <Grid is_flex textAlign="left">
                  최상급 풀박 패키지에요 놓치면 후회함
                </Grid>
              </div>
            </Grid>

            <QnAPost openPost>
              <Profile></Profile>
              <Input width="80%" margin="0 1% 0 0"></Input>
              <Button>등록</Button>
            </QnAPost>

            <Line bottom />
          </QnAWrap>
        )}
      </QnAWrap>
    </>
  );
  // }
};

QnA.defaultProps = {};

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
