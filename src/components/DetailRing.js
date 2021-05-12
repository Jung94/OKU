import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Badge } from "@material-ui/core";

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

  const [is_read, setIsRead] = React.useState(true);

  const notiCheck = () => {
    props._onClick();
  };

  const [Ringshowing, setRingShowing] = useState(false);
  
  const RingDetailShowing = () => setRingShowing(!Ringshowing);

  if (Ringshowing) {
    return (
      <>
        <Badge invisible={is_read} color="secondary" onClick={notiCheck} variant="dot">
        <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge>
        </Badge>

        <RingDetail>
          <Contents>
            {/* {_alert.map((i, idx) => {
              console.log("asdasd💜",_alert)
              return ( */}
            <Box>
            <Desc>
              <AlertTitle>
                <TitleLeft>안녕</TitleLeft>
                <TitleRight>1분전</TitleRight>
              </AlertTitle>
              <AlertCotents>'손오공 드래곤볼'의 낙찰이 성사되었습니다.</AlertCotents>
            </Desc>
            <Line/>
            </Box>
            {/* );
            })} */}
            
            <Box>
              <Desc>
                <AlertTitle>
                  <TitleLeft>
                    문의답글
                  </TitleLeft>
                  <TitleRight>
                    1분전
                  </TitleRight>
                </AlertTitle>
                <AlertCotents>
                  '손오공 드래곤볼'의 문의에 답글이 달렸습니다.
                </AlertCotents>
              </Desc> 
              <Line/> 
            </Box>

            
            <Box>
            <Desc>
              <AlertTitle>
                <TitleLeft>문의</TitleLeft>
                <TitleRight>1분전</TitleRight>
              </AlertTitle>
              <AlertCotents>'손오공 드래곤볼'의 문의댓글이 달렸습니다.</AlertCotents>
              </Desc>
              <Line/>
            </Box>
            
            <Box>
              <Desc>
              <AlertTitle>
                <TitleLeft>입찰실패</TitleLeft>
                <TitleRight>10분전</TitleRight>
              </AlertTitle>
              <AlertCotents>'손오공 드래곤볼'의 입찰이 실패하였습니다.</AlertCotents>
              </Desc>
              <Line/>
            </Box>
            
            <Box>
              <Desc>
              <AlertTitle>
                <TitleLeft>거래연결</TitleLeft>
                <TitleRight>10분전</TitleRight>
              </AlertTitle>
              <AlertCotents>'손오공 드래곤볼'의 거래를 진행해주세요.</AlertCotents>
              <Chatting>
                거래 채팅 진행하기
              </Chatting>
              </Desc>
              <Line/>
            </Box>
            
          </Contents>
        </RingDetail>
      </>
    );
  } else {
    return (
      <>
      <Badge color="secondary" onClick={notiCheck} variant="dot">
        <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge>
      </Badge>
      </>
    );
  }
};

DetailRing.defaultProps = {
  _onClick: () => {},
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
  cursor : default;
`;
const Box = styled.div`
  cursor : pointer;

`;
const Desc = styled.div`
margin: 9.2px 29px 9.2px 15px;
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
  font-size: 13px;
  margin-top : 3px;
  font-weight : 400;
`;
const Chatting = styled.button`
  display : block;
  margin : 0px auto;
  width: 217.8px;
  height: 25px;
  border-radius: 7px;
  color: #ffffff;
  background: #ae00ff;
  border : none;
  cursor: pointer;
  font-size : 12px;
`;
const Line = styled.div`
border-bottom : 1px solid #d0d0d0;
cursor : default;
`;

export default DetailRing;
