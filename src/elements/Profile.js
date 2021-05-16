import React from "react";
import styled from "styled-components";

import { Color } from "shared/DesignSys";

const Profile = (props) => {
  const { img, size, nomargin } = props;
  const styles = { img: img, size: size, nomargin: nomargin };

  if (img === "public/profile.png" || !img) {
    return <ProfileBlock img="https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg" size={size} />;
  }

  return <ProfileBlock {...styles} />;
};

Profile.defaultProps = {
  img: "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg",
  size: "68px",
};

const ProfileBlock = styled.div`
  background: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;

  min-width: ${(props) => props.size};
  height: ${(props) => props.size};

  ${(props) => (props.nomargin ? "" : "margin: 2%;")}
  border-radius: 10rem;

  box-shadow: 0 0 5px 0 ${Color.Light_4};
`;

export default Profile;
