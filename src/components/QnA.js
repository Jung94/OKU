import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Grid, Input, Line, Button, Text, Profile } from "elements/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle as fasQC, faHeart as fasHeart, faPen as fasPen } from "@fortawesome/free-solid-svg-icons";

import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";

import moment from "moment";
import "moment/locale/ko";

import { actionCreators as productActions } from "redux/modules/product";

import { Color } from "shared/DesignSys";

const QnA = (props) => {
  const dispatch = useDispatch();
  // console.log("๐QnA", props);
  const is_seller = localStorage.getItem("uid");
  const { buyernickname, buyerprofile, profileImg, sellernickname, contents, answer, createdAt, updatedAt, productId, sellerId, _id, noProfile } = props;

  const [_answer, setAnswer] = useState("");
  const onChangeContents = useCallback((e) => setAnswer(e.target.value), []);

  const qId = useSelector((state) => state.product.questId);
  // const new_qna = useSelector((state) => state.product.new_qna);

  const addAnswer = () => {
    dispatch(productActions.addAnswerAPI(_id || qId, _answer, sellerId, Date.now()));
    setAnswer("");
    setACnt("");
    setOpen(false);
  };

  const [openPost, setOpen] = useState(false);

  const [ACnt, setACnt] = useState(""); // ๋ฌธ์ ๋ต๊ธ

  if (noProfile) {
    return (
      <QnAWrap>
        <Grid dp_flex>
          <Grid is_flex column>
            <Grid is_flex justify="space-between" margin="1px 0 5px 0">
              {sellernickname === buyernickname ? (
                <IfSeller>
                  {buyernickname}
                  <span sytle={{ fontWeight: "400", color: Color.Dark_4 }}>(ํ๋งค์)</span>
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
                          <span>ํ๋งค์</span>
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
                {answer ? "์์?ํ๊ธฐ" : "๋ต๋ณํ๊ธฐ"}
              </OpenPostBtn>
            )}

            {openPost && (
              <AnswerWrap openPost>
                <QnAPost openPost>
                  <Input
                    text
                    fix
                    adornment={`${ACnt.length} / 500`}
                    plcholder={answer ? "๋ฌธ์ ๋ต๊ธ์ ์์?ํฉ๋๋ค." : "๋ต๋ณ์ ์์ฑํด์ฃผ์ธ์! ๊ฐ์ฅ ๋ง์ง๋ง์ ๋จ๊ธด ๊ธ๋ง ๋ฑ๋ก๋ฉ๋๋ค."}
                    width="100%"
                    fnc={addAnswer}
                    _onChange={(e) => {
                      setAnswer(e.target.value);
                      setACnt(e.target.value);
                    }}
                    maxLength="500"
                    btn={answer ? "์์?ํ๊ธฐ" : "๋ฑ๋กํ๊ธฐ"}
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
                <span sytle={{ fontWeight: "400", color: Color.Dark_4 }}>(ํ๋งค์)</span>
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
                        <span>ํ๋งค์</span>
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
              {answer ? "์์?ํ๊ธฐ" : "๋ต๋ณํ๊ธฐ"}
            </OpenPostBtn>
          )}

          {openPost && (
            <AnswerWrap openPost>
              <QnAPost openPost>
                <Input
                  text
                  fix
                  adornment={`${ACnt.length} / 500`}
                  plcholder={answer ? "๋ฌธ์ ๋ต๊ธ์ ์์?ํฉ๋๋ค." : "๋ต๋ณ์ ์์ฑํด์ฃผ์ธ์! ๊ฐ์ฅ ๋ง์ง๋ง์ ๋จ๊ธด ๊ธ๋ง ๋ฑ๋ก๋ฉ๋๋ค."}
                  width="100%"
                  fnc={addAnswer}
                  _onChange={(e) => {
                    setAnswer(e.target.value);
                    setACnt(e.target.value);
                  }}
                  maxLength="500"
                  btn={answer ? "์์?ํ๊ธฐ" : "๋ฑ๋กํ๊ธฐ"}
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

// ๋ฌธ์๊ธ ๋จ๊ธด ์ฌ๋์ด ํ๋งค์์ผ๋
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

// ๋ฌธ์ํ๊ธฐ
const QnAPost = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

// ๋๋ฅด๋ฉด ์ด๋ฆฌ๋ ๋ฒํผ
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
