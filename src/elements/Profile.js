import React from "react";
import styled from "styled-components";

const Profile = (props) => {
  const { img } = props;
  return <ProfileBlock {...props} />;
};

Profile.defaultProps = {
  img: "",
  color: "#d2d2d2",
};

const ProfileBlock = styled.div`
  background: url(${(props) => props.img});
  min-width: 40px;
  height: 40px;
  margin: 2%;
  background-color: #f112ff;
  border-radius: 10rem;
`;

export default Profile;
