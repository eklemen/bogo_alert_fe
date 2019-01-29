import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Container} from 'semantic-ui-react';
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import FindMyStore from './FindMyStore';
import Dashboard from "./Dashboard";
import PrivateRoute from './shared/PrivateRoute';
import Navbar from './shared/Navbar';

const Routes = () => {
  return (
  <Router>
    <React.Fragment>
      <Navbar />

      <Container className='page-container'>
        <Route path="/" exact    component={Login}/>
        <Route path="/login/"    component={Login}/>
        <Route path="/logout/"    component={Logout}/>
        <Route path="/register/" component={Register}/>

        <PrivateRoute path="/findMyStore/" component={FindMyStore}/>
        <PrivateRoute path="/dashboard/" component={Dashboard}/>
      </Container>
    </React.Fragment>
  </Router>)
};

export default Routes;
