import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Badge } from "@material-ui/core";

import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { Timer } from "components/";
import { Grid, Input, Button, Tag, Modal, Text } from "elements/";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

import List from "images/list.png";
import RingContents from "components/RingContents";

const DetailRing = (props) => {
  const dispatch = useDispatch();
  const is_login = localStorage.getItem("uid");

  // 렌더될 때 ~ 한다
  useEffect(() => {
    // useEffect 랑 친한 얘
    dispatch(postActions.getAlertAPI());
    
  }, [is_login]);

  const alert = useSelector((state) => state.post.all_alert);

  const [is_read, setIsRead] = React.useState(true);

  const notiCheck = () => {
    props._onClick();
  };

  const [Ringshowing, setRingShowing] = useState(false);

  const RingDetailShowing = () => setRingShowing(!Ringshowing);
  if (Ringshowing && is_login) {
    return (
      // 로그인이 되어있을 때
      <Wrap>
        <div className="alarm" onClick={notiCheck}  >
        <Overlay onClick={RingDetailShowing}/>
          <Badge invisible={is_read} color="secondary" variant="dot">
            <FontAwesomeIcon icon={faBell} />
            {/* <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge> */}
          </Badge>
          알림
        </div>
        <RingDetail>
        {alert.alreadyCheck && alert.alreadyCheck.length > 0 ? (
          <Contents>
            {alert.alreadyCheck.map((i, idx) => {
              return (
            <RingContents key={idx} {...i} />
            );
            })}
            {alert.notCheck.map((i, idx) => {
              return (
            <RingContents key={idx} {...i}  />
            );
            })}
            
          </Contents>
          ) : (
          <ContentsX>
          <span>
            최근 알림이 없습니다.
          </span>
          </ContentsX>
          ) }
        </RingDetail>
      </Wrap>
      
    );
  } else if (is_login) {
    return (
      <Wrap>
        {alert.notCheck && alert.notCheck.length === 0 ?(
        <div className="alarm" onClick={notiCheck} onClick={RingDetailShowing} >
          <Badge invisible={is_read} color="secondary" variant="dot">
            <FontAwesomeIcon icon={faBell} />
            {/* <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge> */}
          </Badge>
          알림
        </div>
        ) : (
          <div className="alarm" onClick={notiCheck} onClick={RingDetailShowing}>
          <Badge color="secondary" variant="dot">
            <FontAwesomeIcon icon={faBell} />
            {/* <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge> */}
          </Badge>
          알림
          </div>
        )}
      </Wrap>)
    
  } else {
    return (
      <Wrap onClick={() => {window.alert("로그인이 필요한 서비스입니다.")
      history.push("/login")
      }} >
        <div className="alarm" onClick={notiCheck} onClick={RingDetailShowing}>
            <FontAwesomeIcon icon={faBell} />
            {/* <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge> */}
          알림
        </div>
      </Wrap>
    );

  }
};

DetailRing.defaultProps = {
  _onClick: () => {},
};

const Wrap = styled.div`
  width: 80px;
  justify-content: flex-start;
  .alarm {
    display: flex;
    gap: 8px;
    margin-bottom: -0.5px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
  }
`;

const RingDetail = styled.div`
  overflow : auto;
  height :330px;
  z-index: 10;
  position: absolute;
  width: 300px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 1.5px 5px 0 rgba(129, 129, 129, 0.16);
  margin: 30px 0;
  cursor: default;
`;
const Overlay = styled.div`
  box-sizing: border-box;
  position: absolute;
  left : 0;
  width: 100%;
  height: 10000px;
  background-color: rgba(0, 0, 0, 0);
  cursor : Default;
`;

const Contents = styled.div`
  margin: 26px 0 103.6px 0;
`;

const ContentsX = styled.div`
  display : block;
  margin : 100px 69px 0 ;
  color : #dadada;
`;

export default DetailRing;
