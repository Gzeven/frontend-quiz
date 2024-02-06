import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SubjectDisplay from './SubjectDisplay';
import ConfettiExplosion from 'react-confetti-explosion';

interface EndScreenProps {
  subject: string;
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  subjectImageGetter: (subject: string) => string;
  backgroundColors: Record<string, string>;
}

const EndScreenContainer = styled.div`
  text-align: left;
  margin-bottom: 2rem;
  @media only screen and (min-width: 1024px) {
 display: flex;
 justify-content: space-between;
 
  }
`;

const ConfettiContainer = styled.div`
 position: absolute;
  top: 30%;
  left: 50%;
`

const EndScreenMessage = styled.h1`
    font-size: 2.5rem;
    color: ${(props) => props.theme.textColorOne};
  -webkit-transition: color 0.6s ease-in-out;;
  -moz-transition: color 0.6s ease-in-out;;
  -o-transition: color 0.6s ease-in-out;;
  transition: color 0.6s ease-in-out;
  margin-top: 2rem;
  @media only screen and (min-width: 768px) {
 font-size: 4rem;
  }
  @media only screen and (min-width: 1024px) {
 margin-top: 0;
  }
`

const EndScreenSubMessage = styled.h2`
    font-size: 2.5rem;
    color: ${(props) => props.theme.textColorOne};
  -webkit-transition: color 0.6s ease-in-out;;
  -moz-transition: color 0.6s ease-in-out;;
  -o-transition: color 0.6s ease-in-out;;
  transition: color 0.6s ease-in-out;
  font-weight: 800;
  margin-bottom: 2.5rem;
  @media only screen and (min-width: 768px) {
 font-size: 4rem;
 
  }
`

const PlayerScore = styled.p`
  font-size: 5.5rem;
  font-family: 'Rubik';
font-style: normal;
font-weight: 500;
color: ${(props) => props.theme.textColorOne};
  -webkit-transition: color 0.6s ease-in-out;;
  -moz-transition: color 0.6s ease-in-out;;
  -o-transition: color 0.6s ease-in-out;;
  transition: color 0.6s ease-in-out;
@media only screen and (min-width: 768px) {
 font-size: 9rem;
 
  }
`


const TotalScore = styled.p`
  font-size: 1.125rem;
  font-family: 'Rubik';
font-style: normal;
font-weight: 400;
color: ${(props) => props.theme.textColorTwo};
  -webkit-transition: color 0.6s ease-in-out;;
  -moz-transition: color 0.6s ease-in-out;;
  -o-transition: color 0.6s ease-in-out;;
  transition: color 0.6s ease-in-out;
@media only screen and (min-width: 768px) {
 font-size: 1.5rem;
 
  }
`

const Box = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
box-shadow: 0px 16px 40px rgba(143, 160, 193, 0.14);
border-radius: 0.75rem;
background: ${(props) => props.theme.backgroundTwo};
      -webkit-transition: background-color 1s ease-out;
  -moz-transition: background-color 1s ease-out;
  -o-transition: background-color 1s ease-out;
  transition: background-color 1s ease-out;
  padding: 2rem;
  margin: 1.25rem auto;
  height: 15.125rem;
  width: 100%;
  text-align: center;
  /* Additional styling for the box */
  @media only screen and (min-width: 768px) {
 height: 24.25rem;
 padding: 3rem;
 margin: 4rem auto 2rem;
 border-radius: 1.5rem;
  }
  @media only screen and (min-width: 1024px) {
 width: 35.25rem;
 margin-top: 0;
  }
`;

const PlayAgainButton = styled.button`
 height: 3.5rem;
font-family: 'Rubik';
background: var(--color-purple);
color: var(--color-pure-white);
border-radius: 0.75rem;
border: none;
font-weight: 500;
font-size: 1.125rem;
width: 100%;
cursor:pointer;
@media(hover: hover) and (pointer: fine) {
      &:hover {   
      background: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), #A729F5;    
    }
  }
  @media only screen and (min-width: 768px) {
    height: 5.75rem;
 font-size: 1.75rem;
 border-radius: 1.5rem;
 
  }
`

const EndScreen: React.FC<EndScreenProps> = ({
  subject,
  score,
  totalQuestions,
  onPlayAgain,
  subjectImageGetter,
  backgroundColors,

  
}) => {
  const [perfectScore, setPerfectScore] = useState(false);

  const imageSrc = subjectImageGetter(subject);
  const backgroundColor = backgroundColors[subject];


  useEffect(() => {
    if (score === totalQuestions) {
      setPerfectScore(true);

    }
  }, [score, totalQuestions]);
  

  return (
    <EndScreenContainer>
    <ConfettiContainer>{perfectScore &&   <ConfettiExplosion
    force={0.8}
    duration={3000}
    particleCount={250}
    
   
  />} </ConfettiContainer>
      <div>
        <EndScreenMessage>Quiz completed</EndScreenMessage>
        <EndScreenSubMessage>You scored... </EndScreenSubMessage>
      </div>
      <div>
        <Box>
          <SubjectDisplay
            $backgroundColor={backgroundColor}
            imageSrc={imageSrc}
            text={subject}
          />
          <PlayerScore>{score}</PlayerScore>
         
          <TotalScore>out of {totalQuestions}</TotalScore>
         
        </Box>

        <PlayAgainButton onClick={onPlayAgain}>Play Again  </PlayAgainButton>
      </div>
    </EndScreenContainer>
  );
};

export default EndScreen;




