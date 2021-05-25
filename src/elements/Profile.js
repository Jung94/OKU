import React from "react";
import styled from "styled-components";

import { Color } from "shared/DesignSys";

const Profile = (props) => {
  const { img, size, nomargin, margin } = props;
  const styles = { img: img, size: size, nomargin: nomargin, margin: margin };

  // console.log(img);

  if (img === "public/profile.png" || !img || img === "http://13.124.55.186/undefined") {
    return <ProfileBlock img={"https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"} size={size} nomargin={nomargin ? nomargin : false} margin={margin} />;
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

  ${(props) => (props.nomargin ? "" : props.margin ? `margin:${props.margin};` : "margin: 2%;")}
  border-radius: 10rem;

  box-shadow: 0 0 5px 0 ${Color.Light_4};
`;

export default Profile;
