import React, { useState, useEffect } from "react";
import data from "./scrappedData.json";
import Card, { CardSection } from "@kiwicom/orbit-components/lib/Card";
import styled from "styled-components";
import { Button, Heading, ListChoice } from "@kiwicom/orbit-components/";
import { shuffle } from "lodash";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: auto;
`;

const ExperienceTitle = styled(Heading)`
  padding: 20px 10px;
`;

const CardImage = styled.img``;

function getRandomNwords(number, words) {
  const wordsShuffled = shuffle(words);
  return wordsShuffled.splice(0, number);
}

function LearningCard({
  wordSwedish,
  wordEnglish,
  sentenceSwedish,
  sentenceEnglish,
  wordSound,
  sentenceSound,
  image,
  onNextClick,
}) {
  return (
    <Container>
      <CardImage src={image} />
      <Card
        title={
          <div>
            {wordSwedish}
            <AudioButton url={wordSound} autoPlay />
          </div>
        }
        description={wordEnglish}
        actions={<Button onClick={onNextClick}>Next</Button>}
      >
        <CardSection
          title={
            <div>
              {sentenceSwedish}
              <AudioButton url={sentenceSound} />
            </div>
          }
          description={sentenceEnglish}
        ></CardSection>
      </Card>
    </Container>
  );
}

function QuizCard({
  wordSwedish,
  wordEnglish,
  sentenceSwedish,
  wordSound,
  sentenceSound,
  onFailure,
  onSuccess,
  wrongAnswers,
}) {
  const answers = shuffle([
    <ListChoice
      title={wordEnglish}
      selectable
      onClick={onSuccess}
      key={wordEnglish}
    />,
    <ListChoice
      title={wrongAnswers[0].wordEnglish}
      key={wrongAnswers[0].wordEnglish}
      selectable
      onClick={onFailure}
    />,
    <ListChoice
      title={wrongAnswers[1].wordEnglish}
      key={wrongAnswers[1].wordEnglish}
      selectable
      onClick={onFailure}
    />,
    <ListChoice
      title={wrongAnswers[2].wordEnglish}
      key={wrongAnswers[2].wordEnglish}
      selectable
      onClick={onFailure}
    />,
  ]);
  return (
    <Container>
      <Card
        title={
          <div>
            {wordSwedish}
            <AudioButton url={wordSound} autoPlay />
          </div>
        }
      >
        <CardSection>{answers}</CardSection>
      </Card>
    </Container>
  );
}

function LearningCards({ words, setLearningMode }) {
  const [learnWordIndex, setLearnWordIndex] = useState(0);
  function nextLearningStep() {
    if (learnWordIndex === 5) {
      setLearningMode(false);
    } else {
      setLearnWordIndex(learnWordIndex + 1);
    }
  }
  return (
    <LearningCard {...words[learnWordIndex]} onNextClick={nextLearningStep} />
  );
}

function QuizCards({ words, allWords, setPreviousAnswerStatus }) {
  const [wordsQuiz, setWordsQuiz] = useState([
    ...getRandomNwords(words.length, words),
    ...getRandomNwords(words.length, words),
  ]);

  const allWordsWithoutShowedOne = allWords.filter(
    (word) => word.wordSwedish !== wordsQuiz[0].wordSwedish
  );
  const random3WrongAnswers = getRandomNwords(3, allWordsWithoutShowedOne);

  function onSuccess() {
    console.log(wordsQuiz);
    setWordsQuiz(wordsQuiz.filter((_, i) => i !== 0));
  }

  function onFailure() {
    setWordsQuiz(shuffle(wordsQuiz));
  }
  return (
    <>
      <ExperienceTitle type="">{wordsQuiz.length} cards left</ExperienceTitle>
      <QuizCard
        {...wordsQuiz[0]}
        onFailure={onFailure}
        onSuccess={onSuccess}
        wrongAnswers={random3WrongAnswers}
      />
    </>
  );
}

function AudioButton({ url, autoPlay = false }) {
  const audio = new Audio(url);
  useEffect(() => {
    autoPlay && audio.play();
  }, [audio, autoPlay]);
  function onClick() {
    audio.play();
  }
  return <button onClick={onClick}>play</button>;
}

export function Experience() {
  //   const cashedData = JSON.parse(window.localStorage.getItem("words"));
  const words = data;
  const keys = Object.keys(words);
  const [learningMode, setLearningMode] = useState(true);
  const [groupName] = useState(keys[Math.floor(Math.random() * keys.length)]);
  const group = words[groupName];
  const [selectedWords] = useState(getRandomNwords(6, group));
  const [previousAnswerStatus, setPreviousAnswerStatus] = useState("");

  return (
    <>
      <ExperienceTitle type="display">{groupName}</ExperienceTitle>
      {learningMode ? (
        <LearningCards
          words={selectedWords}
          setLearningMode={setLearningMode}
        />
      ) : (
        <>
          {previousAnswerStatus}
          <QuizCards
            words={selectedWords}
            allWords={group}
            setPreviousAnswerStatus={setPreviousAnswerStatus}
          />{" "}
        </>
      )}
    </>
  );
}
