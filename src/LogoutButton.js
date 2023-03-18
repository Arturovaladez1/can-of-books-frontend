import { useAuth0 } from "@auth0/auth0-react";
import React from "react";


// same functionality and idea as the login button, except we're doing a return to the login page, not a redirect to the post-login can of books page.
const LogoutButton = () => {
  const {logout} = useAuth0();
  return (
    <button onClick={() =>
      logout({})
    }>
      Log Out
    </button>
  )
}

export default LogoutButton;
