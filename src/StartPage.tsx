import React from "react";
import { Button } from "@kiwicom/orbit-components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Heading } from "@kiwicom/orbit-components/";
import data from "./scrappedData.json";

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export function StartPage({ success = false }) {
  const numberOfTotalWords = Object.values(data)
    .map((val) => val.length)
    .reduce((sum, val) => sum + val, 0);

  return (
    <Container>
      <Heading type="display">Swedish Vocabulary Improver 3000</Heading>
      <Heading type="display">{numberOfTotalWords} Core Words to Learn</Heading>
      {success && <Heading type="display">Great! You Made It</Heading>}
      <Link to="/experience">
        <Button>Improve Again</Button>
      </Link>
    </Container>
  );
}
