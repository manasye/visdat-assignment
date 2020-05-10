import React from "react";
import { Container } from "semantic-ui-react";

const Navbar = () => {
  return (
    <div className="topnav">
      <Container>
        <a className="active" href="/">
          COVID Startup Layoff
        </a>
        <a
          className="active right"
          href="http://seacosystem.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Data as of May 10, 2020 09:00 AM
        </a>
      </Container>
    </div>
  );
};

export default Navbar;
