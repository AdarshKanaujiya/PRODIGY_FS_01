import React from "react";
import { Container, Typography } from "@mui/material";

function Home() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to MyApp
      </Typography>
      <Typography variant="body1">
        This is a simple authentication project using React and Material-UI.
      </Typography>
    </Container>
  );
}

export default Home;
