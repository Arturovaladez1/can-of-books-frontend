import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import './Header.css'

class Header extends React.Component {
  render() {
    return (
      // here's where we do the login/logout buttons like in the demo
      <>
        {this.props.auth0.isAuthenticated
          ?
          <LogoutButton />
          :
          <LoginButton />
        }
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>My Favorite Books</Navbar.Brand>
          <NavItem>
            <Link to="/" className="nav-link">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/about" className="nav-link">About</Link>
          </NavItem>
        </Navbar>
      </>
    )
  }
}

export default withAuth0(Header);
