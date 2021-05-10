import React, { useEffect } from "react";
import "shared/css/App.css";
import styled from "styled-components";

import { actionCreators as userActions } from "redux/modules/user";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, useRoutes, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { history } from "redux/configureStore";

import NotFound from "shared/NotFound";
import { Header, Footer } from "components/";
import { Home, Product, ProductUpload, Signup, Login, Agreement, SocialLogin, Result, My, Chat, CategoryResult } from "pages/";

const App = (props) => {
  const dispatch = useDispatch();
  const is_login = localStorage.getItem("access_token") ? true : false;

  useEffect(() => {
    if (is_login) {
      dispatch(userActions.isLogin());
    }
  }, []);

  return (
    <Wrap>
      <Header />
      <Grid>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/sociallogin" exact component={SocialLogin} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/agreement" exact component={Agreement} />
            <Route path="/product" exact component={Product} />
            <Route path="/productupload" exact component={ProductUpload} />
            <Route path="/result" exact component={Result} />
            <Route path="/category" exact component={CategoryResult} />
            <Route path="/chat/:otherId/:myId/:otherName" exact component={Chat} />
            <Route path="/my" component={My} />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </Grid>
      <Footer />
    </Wrap>
  );
};

const Grid = styled.div`
  margin: 0 auto;
  max-width: 1920px;
  position: relative;
`;

const Wrap = styled.div``;

export default App;
