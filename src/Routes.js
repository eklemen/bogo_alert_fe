import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import FindMyStore from './FindMyStore';
import Dashboard from "./Dashboard";

const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const Routes = () => (
  <Router>
    <React.Fragment>
      <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/users/">Users</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact    component={Login}/>
      <Route path="/login/"    component={Login}/>
      <Route path="/register/" component={Register}/>
      <Route path="/findMyStore/" component={FindMyStore}/>
      <Route path="/dashboard/" component={Dashboard}/>
      <Route path="/about/"    component={About}/>
      <Route path="/users/"    component={Users}/>
    </React.Fragment>
  </Router>
);

export default Routes;
