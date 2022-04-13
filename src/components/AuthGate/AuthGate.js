import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AdminTable } from '../../pages/AdminTable/AdminTable';
import { Auth } from '../../pages/Auth/Auth';


export const AuthGate = ({children}) => {
  const [signIn, setSignIn] = useState(false);
  const token = useSelector(({auth}) => auth.token);

  useEffect(() => {
    if (sessionStorage.getItem('token')) setSignIn(true);
  }, [token]);

  if (!signIn ) {
    return <Auth/>;
  }

  if (signIn) {
    return <AdminTable/>;
  }

  return <>{children}</>;
};
