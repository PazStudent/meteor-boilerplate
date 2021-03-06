//NPM imports:
import {Meteor} from 'meteor/meteor';
import React from 'react';
import { Router , Route , browserHistory} from 'react-router';
//Project imports:
import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';

const unAuthenticatedPages = [ '/' , '/signup'];
const authenticatedPages =  ['/dashboard'];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

export const onAuthChange= (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unAuthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard') ;
  }
  if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
}


export const routes = (
  
    <Router history={browserHistory}>
      <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
      <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
      <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
      <Route path="*" component={NotFound}/>
    </Router>
    
);