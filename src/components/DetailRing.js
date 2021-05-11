import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import List from "images/list.png";

const DetailRing = (props) => {
  const dispatch = useDispatch();

  // 렌더될 때 ~ 한다
  useEffect(() => {
    // useEffect 랑 친한 얘
    dispatch(postActions.getAlertAPI());
  }, []);
  const _alert = useSelector((state) => state.post.all_alert);
  console.log("🧡",_alert)
  const [Ringshowing, setRingShowing] = useState(false);
  // const [Boxshowing, setBoxShowing] = useState(false);
  const RingDetailShowing = () => setRingShowing(!Ringshowing);

  // const ShowBox = () => setBoxShowing(true);

  // const HideBox = () => setBoxShowing(false)

  if (Ringshowing) {
    return (
      <>
        {/* <Badge color="#" variant="dot" invisible={is_read}/> */}
        <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge>

        <RingDetail>
          <Contents>
            <Box>
              <AlertTitle>
                <TitleLeft>낙찰성사</TitleLeft>
                <TitleRight>1분전</TitleRight>
              </AlertTitle>
              <AlertCotents>'손오공 드래곤볼'의 낙찰이 성사되었습니다.</AlertCotents>
            </Box>
            <Line />
            <Box>
              <AlertTitle>
                <TitleLeft>입찰실패</TitleLeft>
                <TitleRight>10분전</TitleRight>
              </AlertTitle>
              <AlertCotents>'손오공 드래곤볼'의 입찰이 실패하였습니다.</AlertCotents>
            </Box>
            <Line />
            <Box>
              <AlertTitle>
                <TitleLeft>거래연결</TitleLeft>
                <TitleRight>10분전</TitleRight>
              </AlertTitle>
              <AlertCotents>'손오공 드래곤볼'의 거래를 진행해주세요.</AlertCotents>
              <Chatting>
                <p style={{ fontSize: "12px" }}> 거래 채팅 진행하기</p>
              </Chatting>
            </Box>
            <Line />
          </Contents>
        </RingDetail>
      </>
    );
  } else {
    return (
      <div>
        <img onClick={RingDetailShowing} src={List} />
      </div>
    );
  }
};
const RingDetail = styled.div`
  z-index: 10;
  position: absolute;
  width: 300px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 1.5px 5px 0 rgba(129, 129, 129, 0.16);
  margin: 24px 0;
`;
const Box = styled.div`
  margin: 9.2px 29px 9.2px 15px;
  cursor: Default;
`;
const Contents = styled.div`
  margin: 26px 0 103.6px 0;
`;

const NotiBadge = styled.img``;
const AlertTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleLeft = styled.span`
  color: #ae00ff;
  font-size: 14px;
`;
const TitleRight = styled.span`
  color: #cacaca;
  font-size: 12px;
`;
const AlertCotents = styled.div`
  color: #707070;
  font-size: 14px;
`;
const Chatting = styled.button`
  width: 217.8px;
  height: 25px;
  border-radius: 7px;
  color: #ffffff;
  background: #ae00ff;
  border: 1px solid #ae00ff;
  cursor: pointer;
`;
const Line = styled.hr`
  border: 1px solid #c0c0c0; ;
`;

export default DetailRing;
