import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorScreen from './components/ErrorScreen';
import LoadingScreen from './components/LoadingScreen';
import AuthContext from './contexts/auth';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';

interface props{
  Private?: any;
  [x: string]: any;
}

function CustomRoute({ Private, ...props }:props){
  const {loading,authenticated} = useContext(AuthContext);

  if (loading) return <LoadingScreen />;

  if (Private && !authenticated) return <ErrorScreen />;

  return <Route {...props}/>;
}

export default function Routes(){
  return(
    <Switch>
      <Route exact path="/" component={Login} />
      <CustomRoute Private path="/dashboard" component={Dashboard} />
      <CustomRoute Private path="/profile" component={Profile} />
    </Switch>
  );
}