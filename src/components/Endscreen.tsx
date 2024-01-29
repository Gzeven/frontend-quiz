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
  /* Add your styling for the end screen */
  @media only screen and (min-width: 1440px) {
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
 font-size: 64px;
  }
  @media only screen and (min-width: 1440px) {
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
 font-size: 64px;
 
  }
`

const PlayerScore = styled.p`
  font-size: 88px;
  font-family: 'Rubik';
font-style: normal;
font-weight: 500;
color: ${(props) => props.theme.textColorOne};
  -webkit-transition: color 0.6s ease-in-out;;
  -moz-transition: color 0.6s ease-in-out;;
  -o-transition: color 0.6s ease-in-out;;
  transition: color 0.6s ease-in-out;
@media only screen and (min-width: 768px) {
 font-size: 144px;
 
  }
`


const TotalScore = styled.p`
  font-size: 18px;
  font-family: 'Rubik';
font-style: normal;
font-weight: 400;
color: ${(props) => props.theme.textColorTwo};
  -webkit-transition: color 0.6s ease-in-out;;
  -moz-transition: color 0.6s ease-in-out;;
  -o-transition: color 0.6s ease-in-out;;
  transition: color 0.6s ease-in-out;
@media only screen and (min-width: 768px) {
 font-size: 24px;
 
  }
`

const Box = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
box-shadow: 0px 16px 40px rgba(143, 160, 193, 0.14);
border-radius: 12px;
background: ${(props) => props.theme.backgroundTwo};
      -webkit-transition: background-color 1s ease-out;
  -moz-transition: background-color 1s ease-out;
  -o-transition: background-color 1s ease-out;
  transition: background-color 1s ease-out;
  padding: 32px;
  margin: 20px auto;
  height: 242px;
  width: 100%;
  text-align: center;
  /* Additional styling for the box */
  @media only screen and (min-width: 768px) {
 height: 388px;
 padding: 48px;
 margin: 64px auto 32px;
 border-radius: 24px;
  }
  @media only screen and (min-width: 1440px) {
 width: 564px;
 margin-top: 0;
  }
`;

const PlayAgainButton = styled.button`
 height: 56px;
font-family: 'Rubik';
background: var(--color-purple);
color: var(--color-pure-white);
border-radius: 12px;
border: none;
font-weight: 500;
font-size: 18px;
width: 100%;
@media(hover: hover) and (pointer: fine) {
      &:hover {   
      background: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), #A729F5;    
    }
  }
  @media only screen and (min-width: 768px) {
    height: 92px;
 font-size: 28px;
 border-radius: 24px;
 
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
  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === 'Enter') {
  //       // Trigger the onPlayAgain function when Enter is pressed
  //       onPlayAgain();
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [onPlayAgain]);

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




