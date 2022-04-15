import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
export const SidebarLink = ({ title, url, icon }) => {
  const [currentPath, setcurrentPath] = useState('');
  const location = useLocation();
  useEffect(() => {
    setcurrentPath(location.pathname);
  }, [location]);
  return (
    <Link
      to={url}
      className={`sidebar__link ${currentPath === url ? 'active' : ''}`}
    >
      <span className={`sidebar__link__icon ${icon} `} />
      <p>{title}</p>
    </Link>
  );
};
