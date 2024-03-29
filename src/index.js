import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


// Auth0Provider logic from the Auth0 quick setup documentation gets plugged into the Render function, inside of the React.StrictMode tags.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<Auth0Provider
  domain={process.env.REACT_APP_DOMAIN}
  clientId={process.env.REACT_APP_CLIENTID}
  authorizationParams={{
    redirect_uri: process.env.REACT_APP_REDIRECT_URI
  }}
>
    <App />
    </Auth0Provider>

  </React.StrictMode>
);
