import React, { useEffect } from "react";
import "shared/css/App.css";
import styled from "styled-components";

import { actionCreators as userActions } from "redux/modules/user";
import { useSelector, useDispatch } from "react-redux";

import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, useRoutes, Link } from "react-router-dom";
import { history } from "redux/configureStore";

import ScrollToTop from "shared/ScrollToTop";
import Social from "shared/Social";
import NotFound from "shared/NotFound";
import Loading from "shared/Loading";
import Notice from "shared/Notice";
import { Header, Footer } from "components/";
import { Home, Product, ProductUpload, Signup, Login, Agreement, Result, My, Chat, CategoryResult, MdList, DeadList, MyShop, AllList, SellerShop } from "pages/";

const App = (props) => {
  const dispatch = useDispatch();
  const is_login = localStorage.getItem("access_token") ? true : false;
  const is_loading = useSelector((state) => state.loading.is_loading);
  const header_display = useSelector((state) => state.header.header_display);
  const footer_display = useSelector((state) => state.header.footer_display);

  useEffect(() => {
    if (is_login) {
      dispatch(userActions.isLogin());
    } else {
      dispatch(userActions.isLogout());
    }
  }, []);

  if (is_loading) {
    return <Loading />;
  }

  return (
    <Wrap>
      <Notice />
      <Header showHeader={header_display} />
      <Grid>
        <ConnectedRouter history={history}>
          <ScrollToTop>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              {/* <Route path="/agreement" exact component={Agreement} /> */}
              {/* <Route path="/product" exact component={Product} /> */}
              <Route path="/product/detail/:id" exact component={Product} />
              <Route path="/productupload" exact component={ProductUpload} />
              <Route path="/result" exact component={Result} />
              <Route path="/category" exact component={CategoryResult} />
              <Route path="/MDList" exact component={MdList} />
              <Route path="/DeadlineList" exact component={DeadList} />
              <Route path="/chat" exact component={Chat} />
              <Route path="/chat/:productId/:otherId/:myId/:otherName/:title" exact component={Chat} />
              <Route path="/alllist" component={AllList} />
              <Route path="/myshop" component={MyShop} />
              <Route path="/sellershop" component={SellerShop} />
              <Route path="/my" component={My} />
              <Route path="/social/:id" exact component={Social} />
              <Route component={NotFound} />
            </Switch>
          </ScrollToTop>
        </ConnectedRouter>
      </Grid>
      <Footer />
    </Wrap>
  );
};

const Grid = styled.div`
  margin: 0 auto;
  max-width: 100%;
  position: relative;

  /* border: 1px solid red; */

  @media only screen and (max-width: 767px) {
    max-width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const Wrap = styled.div`
  margin: 0 auto;
  max-width: 100%;

  position: relative;
  /* border: 10px solid red; */
`;

export default App;
