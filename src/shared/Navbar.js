import React from 'react';
import {NavLink, Route} from "react-router-dom";
import {Menu, Container} from 'semantic-ui-react';

const Navbar = () => {
  const logout = <NavLink to='/logout/' className='logo-link'>Logout</NavLink>;
  return (
    <Menu size='massive' className='main-header' color='teal' inverted>
      <Container>
        <NavLink to='/dashboard/' className='logo-link'>BOGO Alert</NavLink>
        <Route path="/dashboard/" render={() => logout}/>

      </Container>
    </Menu>
  )
};

export default Navbar;
