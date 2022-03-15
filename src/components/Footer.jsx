import React from 'react';

function Footer({ hovered }) {
  if (hovered === true) {
    return <div className="footer hovered">2022 AD</div>;
  } else {
    return <div className="footer">2022 AD</div>;
  }
}

export default Footer;
