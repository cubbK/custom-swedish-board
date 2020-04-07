import React from "react";
import { Button } from "@kiwicom/orbit-components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Heading } from "@kiwicom/orbit-components/";

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export function StartPage() {
  return (
    <Container>
      <Heading type="display">Swedish Vocabulary Improver 3000</Heading>
      <Link to="/experience">
        <Button>Improve</Button>
      </Link>
    </Container>
  );
}
