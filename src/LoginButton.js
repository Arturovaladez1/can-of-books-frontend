import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

// we installed auth0 with npm i @auth0/auth0
// then created the LoginButton arrow function per the lab video/documentation from Auth0
// the login button has redirect logic because we want it to go to the correct page after

const LoginButton = () => {
  const {loginWithRedirect} = useAuth0();
  return <button onClick={() =>
  loginWithRedirect()}>Log in for books</button>
};

export default LoginButton;
