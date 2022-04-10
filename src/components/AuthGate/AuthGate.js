import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { StorageContext } from '../../StorageContext';

const CLOSED_ROUTES_IF_UNAUTHORIZED = ['/adminPanel'];
const CLOSED_ROUTES_IF_AUTHORIZED = ['/admin'];

export const AuthGate = ({children}) => {
  const [signIn, setSignIn] = useState(false);
  const storage = useContext(StorageContext);
  const token = useSelector(({auth}) => auth.token);
  const {pathname} = useLocation();

  useEffect(() => {
    if (storage.getItem('token')) setSignIn(true);
  }, [token]);

  if (!signIn && CLOSED_ROUTES_IF_UNAUTHORIZED.includes(pathname)) {
    return <Redirect to="/admin" />;
  }

  if (signIn && CLOSED_ROUTES_IF_AUTHORIZED.includes(pathname)) {
    return <Redirect to="/adminPanel" />;
  }

  return <>{children}</>;
};
