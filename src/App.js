import React from "react";
import "./App.css";
import RoleLayoff from "./components/RoleLayoff";
import Top10 from "./components/Top10";
import Navbar from "./components/Navbar";
import { Container, Grid } from "semantic-ui-react";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container className="container-flex">
        <Grid columns={2}>
          <RoleLayoff />
        </Grid>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Top10 />
          </Grid.Column>
          <Grid.Column width={6}>
            <div>a</div>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
