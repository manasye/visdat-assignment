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
          Data as of May 1st, 2020
        </a>
      </Container>
    </div>
  );
};

export default Navbar;
