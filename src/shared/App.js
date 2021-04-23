import React from 'react';
import 'shared/css/App.css';
import styled from 'styled-components';

import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from 'redux/configureStore';

import Home from 'pages/Home';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import Detail from 'pages/Detail';
import NotFound from 'shared/NotFound';

const App = (props) => {
  return (
    <Wrap>
      {/* <Header>
        <NavBar />
      </Header> */}
      <Container>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/Signup" exact component={Signup} />
            <Route path="/detail/:id" exact component={Detail} />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </Container>
      {/* <Footer>

      </Footer> */}
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1400px;
  height: 100%;
  padding-bottom: 180px;
`;

export default App;
