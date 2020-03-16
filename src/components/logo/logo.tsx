import * as React from 'react';

const Logo = () => (
  <div className="logo">
    <a className="logo__link logo__link--light" href="/">
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </a>
  </div>
);

export default React.memo(Logo);
