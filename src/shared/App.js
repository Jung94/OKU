import React, { useEffect } from "react";
import "shared/css/App.css";
import styled from "styled-components";

import { actionCreators as userActions } from "redux/modules/user";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { history } from "redux/configureStore";
import NotFound from "shared/NotFound";
import Header from "components/Header";
import Footer from "components/Footer";
import { Home, Product, ProductUpload, Signup, Login, Agreement, SocialLogin, Result, Mypage, Chat } from "pages/";

const App = (props) => {
  const dispatch = useDispatch();
  const is_login = localStorage.getItem("access_token") ? true : false;

  useEffect(() => {
    if (is_login) {
      dispatch(userActions.isLogin());
    }
  }, []);

  return (
    <div>
      <Header />
      <Grid>
        <Wrap>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/sociallogin" exact component={SocialLogin} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/agreement" exact component={Agreement} />
              <Route path="/product" exact component={Product} />
              <Route path="/productupload" exact component={ProductUpload} />
              <Route path="/Mypage" exact component={Mypage} />
              <Route path="/result" exact component={Result} />
              <Route path='/chat' exact component={Chat} />
              <Route component={NotFound} />
            </Switch>
          </ConnectedRouter>
        </Wrap>
      </Grid>
      <Footer />
    </div>
  );
};

const Grid = styled.div`
  margin: 0 auto;
  max-width: 1920px;
`;

const Wrap = styled.div`
  position: relative;
  min-height: 100%;
`;

export default App;
