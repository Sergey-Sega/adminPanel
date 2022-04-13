import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const CLOSED_ROUTES_IF_UNAUTHORIZED = ['/adminPanel/admin'];
const CLOSED_ROUTES_IF_AUTHORIZED = ['/adminPanel'];

export const AuthGate = ({children}) => {
  const [signIn, setSignIn] = useState(false);
  const token = useSelector(({auth}) => auth.token);
  const {pathname} = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem('token')) setSignIn(true);
  }, [token, pathname]);

  if (!signIn && CLOSED_ROUTES_IF_UNAUTHORIZED.includes(pathname)) {
    return <Redirect to="/adminPanel" />;
  }

  if (signIn && CLOSED_ROUTES_IF_AUTHORIZED.includes(pathname)) {
    return <Redirect to="/adminPanel/admin" />;
  }

  return <>{children}</>;
};
