import React from "react";
import styled from "styled-components";
import Container from "components/Container";
import Post from "components/Post";
import DeadlineP from "components/DeadlineP";
import Card from 'components/Card'

const Home = (props) => {
  return (
    <React.Fragment>
      <Container />
      <Post/>
      <DeadlineP/>
      <Card/>
    </React.Fragment>
  );
};


export default Home;
