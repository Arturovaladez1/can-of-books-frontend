import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About'
import { withAuth0 } from '@auth0/auth0-react';
import Profile from './Profile';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginSplashPage from './LoginSplashPage';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        isLoggedIn : false,
      }
  }

  render() {
    console.log(this.props.auth0.isAuthenticated)
    return (
      <>
        <Router>
          {this.props.auth0.isAuthenticated
          ?
          <Profile />
          : <LoginSplashPage />}

          <Header />
          <Routes>
            {this.props.auth0.isAuthenticated
            ?
            <Route
            exact path="/"
            element={<BestBooks />}>
            </Route>
            :
            <Route
            exact path="/"
            element={<LoginSplashPage />}>
            </Route>
            }

            <Route
              path="/about"
              element={
                <About />
              }
            >
            </Route>
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
