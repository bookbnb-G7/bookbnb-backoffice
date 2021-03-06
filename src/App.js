import React, { Component } from 'react';
import { isLoggedIn } from './services/FirebaseAuthService';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Page404 = React.lazy(() => import('./pages/Page404'));
const Page500 = React.lazy(() => import('./pages/Page500'));

const getViewFromAuthStatus = (props) => {
  if (isLoggedIn()) {
    return <TheLayout {...props} />;
  } else {
    return <Login {...props} />;
  }
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/" name="Login Page" render={(props) => <Login {...props} />} />
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            <Route exact path="/register" name="Register Page" render={(props) => <Register {...props} />} />
            <Route path="/" name="Home" render={(props) => getViewFromAuthStatus(props)} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
