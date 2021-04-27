import React from 'react';
import 'shared/css/App.css';
import styled from 'styled-components';

import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from 'redux/configureStore';
import NotFound from 'shared/NotFound';
import Header from 'components/Header';
import Footer from 'components/Footer';
import  { Home, Product, ProductUpload, Signup, Login, Agreement } from "pages/";

const App = (props) => {
  return (
  <div>
    <Header/>
      <Wrap>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Grid>
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/agreement" exact component={Agreement} />
              <Route path="/product" exact component={Product} />
              <Route path="/productupload" exact component={ProductUpload} />
              <Route component={NotFound} />
              </Grid>
            </Switch>
          </ConnectedRouter>  
      </Wrap>  
    <Footer/>
  
    
    </div>
  );
}

const Grid = styled.div`
background : #eee;
margin : 0 auto;
max-width : 1030px;
`;

const Wrap = styled.div`
  position: relative;
  min-height: 100vh;
`;




export default App;
