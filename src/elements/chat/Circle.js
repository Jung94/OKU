import React from "react";
import styled from "styled-components";

import Color from "elements/DesignSys";

const Circle = (props) => {
  const { sub, img, _onClick } = props;
  const styles = { img: img, onClick: _onClick };

  return (
    <>
      {sub ? (
        <MiniCir {...styles}></Cir>
      ) : (
        <Cir {...styles}></Cir>
      )}
    </>
  );
};

Circle.defaultProps = {
  img: "https://w7.pngwing.com/pngs/340/956/png-transparent-profile-user-icon-computer-icons-user-profile-head-ico-miscellaneous-black-desktop-wallpaper.png",
  size: ,
  _onClick: () => {},
};

const Cir = styled.div`
  width: 30px;
  height: 30px;
  border: 30px;
  background-image: url("${(props) => props.img}");
  background-size: cover;
  background-position: center;
`;

const MiniCir = styled.div`
  width: 20px;
  height: 20px;
  border: 30px;
  background-image: url("${(props) => props.img}");
  background-size: cover;
  background-position: center;
`;

export default Circle;
