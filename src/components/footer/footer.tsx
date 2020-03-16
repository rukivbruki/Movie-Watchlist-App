import * as React from 'react';
import Logo from "../logo/logo";

const Footer = () => (
  <footer className="page-footer">
    <Logo />

    <div className="copyright">
      <p>© 2019 What to watch Ltd.</p>
    </div>
  </footer>
);

export default React.memo(Footer);
