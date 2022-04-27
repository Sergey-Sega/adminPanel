import React from 'react';
import './style.scss';
export const Loader = () => {
    return (
<div className="LoaderWrap clearfix">
  <div className="loader Large">
    <span className="dot dot_1"></span>
    <span className="dot dot_2"></span>
    <span className="dot dot_3"></span>
    <span className="dot dot_4"></span>
  </div>
</div>
    );
};
