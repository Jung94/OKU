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
import Header from 'components/Header';
import Footer from 'components/Footer'

const App = (props) => {
  return (
  <div>
    <Header/>
    <Grid>
      <Wrap>
        
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/Signup" exact component={Signup} />
              <Route path="/detail/:id" exact component={Detail} />
              <Route component={NotFound} />
            </Switch>
          </ConnectedRouter>
          <Footer/>
      </Wrap>
    </Grid>
    </div>
  );
}

const Grid = styled.div`
background : #eee;
margin : 0 auto;
max-width : 1030px;
height : 100%;

`;

const Wrap = styled.div`
  position: relative;
  min-height: 100vh;
`;




export default App;
