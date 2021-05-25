import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import { Badge } from "@material-ui/core";

import { history } from "../redux/configureStore";
import { actionCreators as alertActions } from "redux/modules/alert";
import { useDispatch, useSelector } from "react-redux";
import { Timer } from "components/";
import { Grid, Input, Button, Tag, Modal, Text } from "elements/";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

import List from "images/list.png";
import IconRingOff from "images/icon_RingOff.svg";
import RingContents from "components/RingContents";

import { Color } from "shared/DesignSys";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return isDesktop ? children : null;
};

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  return isTablet ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

const DetailRing = (props) => {
  const dispatch = useDispatch();
  const is_login = localStorage.getItem("uid");

  // 렌더될 때 ~ 한다
  useEffect(() => {
    // useEffect 랑 친한 얘
    dispatch(alertActions.getAlertAPI());
  }, [is_login]);

  const alert = useSelector((state) => state.alert.all_alert);

  const [is_read, setIsRead] = React.useState(true);

  const notiCheck = () => {
    props._onClick();
  };

  const [Ringshowing, setRingShowing] = useState(false);

  const RingDetailShowing = () => setRingShowing(!Ringshowing);

  if (Ringshowing && is_login) {
    return (
      // 로그인이 되어있을 때
      <>
        <Desktop>
          <Wrap>
            <div className="alarm" onClick={notiCheck}>
              <Overlay onClick={RingDetailShowing} />
              <Badge invisible={is_read} color="secondary" variant="dot">
                <Img src={IconRingOff} onClick={RingDetailShowing} />
                {/* <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge> */}
              </Badge>
              <Text h4 margin="2px 0 0">
                알림
              </Text>
            </div>
            <RingDetail>
              {alert.alreadyCheck && alert.alreadyCheck.length > 0 ? (
                <Contents>
                  {alert.alreadyCheck.map((i, idx) => {
                    return <RingContents key={idx} {...i} />;
                  })}
                  {alert.notCheck.map((i, idx) => {
                    return <RingContents key={idx} {...i} />;
                  })}
                </Contents>
              ) : (
                <ContentsX>
                  <span>최근 알림이 없습니다.</span>
                </ContentsX>
              )}
            </RingDetail>
          </Wrap>
        </Desktop>

        <Mobile>
          <Wrap>
            <div className="alarm" onClick={notiCheck}>
              <Overlay onClick={RingDetailShowing} />
              <Badge invisible={is_read} color="secondary" variant="dot">
                {/* <Img src={IconRingOff}/> */}
                {/* <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge> */}
              </Badge>
            </div>
            <RingDetail>
              {alert.alreadyCheck && alert.alreadyCheck.length > 0 ? (
                <Contents>
                  {alert.alreadyCheck.map((i, idx) => {
                    return <RingContents key={idx} {...i} />;
                  })}
                  {alert.notCheck.map((i, idx) => {
                    return <RingContents key={idx} {...i} />;
                  })}
                </Contents>
              ) : (
                <ContentsX>
                  <span>최근 알림이 없습니다.</span>
                </ContentsX>
              )}
            </RingDetail>
          </Wrap>
        </Mobile>
      </>
    );
  } else if (is_login) {
    return (
      <>
        <Desktop>
          <Wrap>
            {alert.notCheck && alert.notCheck.length === 0 ? (
              <div className="alarm" onClick={notiCheck} onClick={RingDetailShowing}>
                <Badge invisible={is_read} color="secondary" variant="dot">
                  <Img src={IconRingOff} />
                  {/* <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge> */}
                </Badge>
                <Text h4 margin="2px 0 0">
                  알림
                </Text>
              </div>
            ) : (
              <div className="alarm" onClick={notiCheck} onClick={RingDetailShowing}>
                <Badge color="secondary" variant="dot">
                  <Img src={IconRingOff} />
                  {/* <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge> */}
                </Badge>
                <Text h4 margin="2px 0 0">
                  알림
                </Text>
              </div>
            )}
          </Wrap>
        </Desktop>

        <Mobile>
          <Wrap>
            {alert.notCheck && alert.notCheck.length === 0 ? (
              <div className="alarm" onClick={notiCheck} onClick={RingDetailShowing}>
                <Badge invisible={is_read} color="secondary" variant="dot">
                  <Img src={IconRingOff} />
                  {/* <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge> */}
                </Badge>
              </div>
            ) : (
              <div className="alarm" onClick={notiCheck} onClick={RingDetailShowing}>
                <Badge color="secondary" variant="dot">
                  <Img src={IconRingOff} />
                  {/* <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge> */}
                </Badge>
              </div>
            )}
          </Wrap>
        </Mobile>
      </>
    );
  } else {
    return (
      <>
        <Desktop>
          <Wrap
            onClick={() => {
              window.alert("로그인이 필요한 서비스입니다.");
              history.push("/login");
            }}
          >
            <div className="alarm" onClick={notiCheck} onClick={RingDetailShowing}>
              <Img src={IconRingOff} />
              {/* <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge> */}
              <Text h4 margin="2px 0 0">
                알림
              </Text>
            </div>
          </Wrap>
        </Desktop>

        <Mobile>
          <Wrap
            onClick={() => {
              window.alert("로그인이 필요한 서비스입니다.");
              history.push("/login");
            }}
          >
            <div className="alarm" onClick={notiCheck} onClick={RingDetailShowing}>
              <Img src={IconRingOff} />
              {/* <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge> */}
            </div>
          </Wrap>
        </Mobile>
      </>
      // <>
      //   <Desktop>
      //     <Wrap
      //       onClick={() => {
      //         window.alert("로그인이 필요한 서비스입니다.");
      //         history.push("/login");
      //       }}
      //     >
      //       <div className="alarm" onClick={notiCheck} onClick={RingDetailShowing}>
      //         <Img src={IconRingOff} />
      //         {/* <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge> */}
      //         <Text h4 margin="4px 0 0">
      //           알림
      //         </Text>
      //       </div>
      //     </Wrap>
      //   </Desktop>

      //   <Mobile>
      //     <Wrap
      //       onClick={() => {
      //         window.alert("로그인이 필요한 서비스입니다.");
      //         history.push("/login");
      //       }}
      //     >
      //       <div className="alarm" onClick={notiCheck} onClick={RingDetailShowing}>
      //         <Img src={IconRingOff} />
      //         {/* <NotiBadge onClick={RingDetailShowing} src={List}></NotiBadge> */}
      //       </div>
      //     </Wrap>
      //   </Mobile>
      // </>
    );
  }
};

DetailRing.defaultProps = {
  _onClick: () => {},
};

const Img = styled.div`
  // border: 1px solid red;
  width: 20px;
  height: 20px;
  background-color: transparent;
  background: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  transition: all 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
  align-items: center;
  cursor: pointer;
  margin: 1.5px 9px 0 0;
`;

const Wrap = styled.div`
  width: 80px;
  justify-content: flex-start;
  .alarm {
    display: flex;
    margin-bottom: -0.5px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
  }
`;

const RingDetail = styled.div`
  overflow: auto;
  height: 330px;
  z-index: 10;
  position: absolute;
  min-width: 300px;
  width: 15%;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 1.5px 5px 0 rgba(129, 129, 129, 0.16);
  margin: 30px 0;
  cursor: default;

  /* overflow-x scrollbar css */
  ::-webkit-scrollbar {
    width: 12px;
  }
  // scrollbar
  ::-webkit-scrollbar-thumb {
    background: ${Color.Secondary_1};
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  // scrollbar 배경 (트랙)
  ::-webkit-scrollbar-track {
    background-color: ${Color.Light_1};
    border-radius: 10px;
    /* box-shadow: inset 0px 0px 6px #ff000080; */
  }

  @media only screen and (max-width: 767px) {
    right: 10px;
  }
`;

const Overlay = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10000px;
  background-color: rgba(0, 0, 0, 0);
  cursor: Default;
`;
const Contents = styled.div`
  margin: 5px;
`;

const ContentsX = styled.div`
  display: block;
  margin: 100px 69px 0;
  color: #dadada;
`;

export default DetailRing;
