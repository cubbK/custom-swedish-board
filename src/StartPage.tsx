import React, { useState } from "react";
import { Button } from "@kiwicom/orbit-components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Heading } from "@kiwicom/orbit-components/";
import data from "./scrappedData.json";
import Stepper from "@kiwicom/orbit-components/lib/Stepper";

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export function StartPage({ success = false }) {
  const [dificulty, setDificulty] = useState(6);
  const numberOfTotalWords = Object.values(data)
    .map((val) => val.length)
    .reduce((sum, val) => sum + val, 0);

  const onDificultyChange = (number) => {
    setDificulty(number);
  };
  return (
    <Container>
      <Heading type="display">Swedish Vocabulary Improver 3000</Heading>
      <Heading type="display">{numberOfTotalWords} Core Words to Learn</Heading>
      <div style={{ height: 50 }}>
        <Stepper
          minValue={2}
          maxValue={25}
          onChange={onDificultyChange}
          defaultValue={dificulty}
        />
      </div>
      {success && <Heading type="display">Great! You Made It</Heading>}
      <Link to={`/experience/${dificulty}`}>
        <Button>{success ? "Improve Again" : "Improve"}</Button>
      </Link>
    </Container>
  );
}
