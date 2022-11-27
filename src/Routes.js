/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from './contexts/AuthContext';

import Loader from './components/Loader';

import signIn from './pages/Autheticate/SignIn';
import signUp from './pages/Autheticate/SignUp';
import Home from './pages/Home';
import NewProduct from './pages/NewProduct';
import UpdateProduct from './pages/UpdateProduct';
import profile from './pages/profile';

function CustomRoute({ isPrivate, ...rest }) {
  const { isLoading, authenticated } = useContext(Context);

  if (isLoading) {
    <Loader isLoading={isLoading} />;
  }

  if (!authenticated && isPrivate) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={signIn} />
      <Route path="/SignUp" component={signUp} />
      <CustomRoute isPrivate path="/home" component={Home} />
      <CustomRoute isPrivate path="/new" component={NewProduct} />
      <CustomRoute isPrivate path="/edit/:id" component={UpdateProduct} />
      <CustomRoute isPrivate path="/profile/:id" component={profile} />
    </Switch>
  );
}
