import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CorrectImage, IncorrectImage } from '../assets';
import ProgressBar from './ProgressBar';
import useSound from 'use-sound';
import CorrectSound from '../assets/sounds/correct.mp3';
import WrongSound from '../assets/sounds/wrong.mp3';
import TimeUpSound from '../assets/sounds/timeup.mp3';

const QuizContainer = styled.div`
padding-bottom: 9.5rem;
@media only screen and (min-width: 768px) {
 padding-bottom: 3rem;
  }
 @media only screen and (min-width: 1024px) {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10.75rem;
  gap: 2rem;
  }
`;

const QuizQuestionContainer = styled.div`
@media only screen and (min-width: 1024px) {
  display: flex;
  flex-direction: column;
  gap: 7rem;
  width: 29.065rem;
  margin-bottom: 6rem;
  }

`
const QuestionNumberInfo = styled.p`
 font-style: italic;
font-weight: 400;
font-size: 0.875rem;
color: var(--color-grey-navy);
color: ${(props) => props.theme.textColorTwo};
-webkit-transition: color 0.6s ease-in-out;;
  -moz-transition: color 0.6s ease-in-out;;
  -o-transition: color 0.6s ease-in-out;;
  transition: color 0.6s ease-in-out;
@media only screen and (min-width: 768px) {
  font-size: 1.25rem;
  }
`;

const QuestionText = styled.p`
font-weight: 500;
font-size: 1.25rem;
color: ${(props) => props.theme.textColorOne};
-webkit-transition: color 0.6s ease-in-out;;
  -moz-transition: color 0.6s ease-in-out;;
  -o-transition: color 0.6s ease-in-out;;
  transition: color 0.6s ease-in-out;
margin: 0.75rem 0 1.5rem;
@media only screen and (min-width: 768px) {
  font-size: 2.25rem;
margin: 1.6875rem 0 2.5rem;
  }
  @media only screen and (min-width: 1024px) {

margin-top: 1.6875rem;
height: 15rem;
  }
`;

const AnswerChoices = styled.div`
margin-top: 2.5rem;
display: flex;
flex-direction: column;
gap: 0.75rem;
@media only screen and (min-width: 768px) {
margin-top: 4rem;
gap: 1.5rem;
  }
  @media only screen and (min-width: 1024px) {
width: 35.25rem;
margin-top: 0;
  }
`;

const AnswerChoiceLetter = styled.span<{ $isSelected: boolean, $isCorrect: boolean, $isWrong: boolean, $answerSubmitted: boolean }>`
   background-color: ${(props) => {
    if (props.$answerSubmitted && props.$isWrong) {
      return 'var(--color-red)';
    } else if (props.$isSelected && !props.$answerSubmitted) {
      return 'var(--color-purple)';
    } else if (props.$answerSubmitted && props.$isSelected && props.$isCorrect) {
      return 'var(--color-green)';
    } else {
      return 'var(--color-light-grey)';
    }
  }};
  color: ${(props) => {
    if (props.$answerSubmitted && props.$isWrong) {
      return 'var(--color-pure-white)';
    } else if (props.$isSelected && !props.$answerSubmitted) {
      return 'var(--color-pure-white)';
    } else if (props.$answerSubmitted && props.$isSelected && props.$isCorrect) {
      return 'var(--color-pure-white)';
    } else {
      return 'var(--color-grey-navy)';
    }
  }};
  height: 2.5rem;
  min-width: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.375rem;
  margin-right: 1rem;
  @media only screen and (min-width: 768px) {
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 0.75rem;
margin-right: 2rem;
  }
`

const ChoiceButton = styled.button<{  $isSelected: boolean, $isCorrect: boolean, $isWrong: boolean, $answerSubmitted: boolean }>`

  border: ${(props) => {
    if (props.$answerSubmitted && props.$isWrong) {
      return '2px solid var(--color-red)';
    } else if (props.$isSelected && !props.$answerSubmitted) {
      return '2px solid var(--color-purple)';
    } else if (props.$answerSubmitted && props.$isSelected && props.$isCorrect) {
      return '2px solid var(--color-green)';
    } else {
      return 'none';
    }
  }};

margin: 0;
padding: 0 0.75rem;
height: 4rem;
text-align: left;
display: flex;
justify-content: flex-start ;
align-items: center;
font-weight: 500;
font-size: 1.125rem;
font-family: 'Rubik';
color: var(--color-dark-navy);
background-color: ${(props) => props.theme.backgroundTwo};
-webkit-transition: color 1s ease-in-out;;
  -moz-transition: color 1s ease-in-out;;
  -o-transition: color 1s ease-in-out;;
  transition: color 1s ease-in-out;

border-radius: 0.375rem;
cursor: pointer;
@media only screen and (min-width: 768px) {
  border: ${(props) => {
    if (props.$answerSubmitted && props.$isWrong) {
      return '3px solid var(--color-red)';
    } else if (props.$isSelected && !props.$answerSubmitted) {
      return '3px solid var(--color-purple)';
    } else if (props.$answerSubmitted && props.$isSelected && props.$isCorrect) {
      return '3px solid var(--color-green)';
    } else {
      return 'none';
    }
  }};
 height: 5rem;
 font-size: 1.75rem;
 border-radius: 1.5rem;
  }
  @media(hover: hover) and (pointer: fine) {
    &:hover ${AnswerChoiceLetter} {
    background-color: #F6E7FF;;
    color: var(--color-purple);
  }
  }

  @media only screen and (min-width: 1024px) {
 height: 5.75rem;
  }
`;

const ChoiceText = styled.p`
    color: ${(props) => props.theme.textColorOne};
  -webkit-transition: color 0.6s ease-in-out;;
  -moz-transition: color 0.6s ease-in-out;;
  -o-transition: color 0.6s ease-in-out;;
  transition: color 0.6s ease-in-out;
`

const CorrectImageContainer = styled.img`
  height: 1.5rem;
  margin-left: auto;
  @media only screen and (min-width: 768px) {
 height: 2.5rem;
 
  }
`

const WrongImageContainer = styled.img`
  height: 1.5rem;
  margin-left: auto;
  @media only screen and (min-width: 768px) {
 height: 2.5rem;

  }
`

const SubmitButton = styled.button`
height: 3.5rem;
font-family: 'Rubik';
background: var(--color-purple);
color: var(--color-pure-white);
border-radius: 0.75rem;
border: none;
font-weight: 500;
font-size: 1.125rem;
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
 margin-top: 0.5rem;
  }

`;

const NextButton = styled.button`
height: 3.5rem;
font-family: 'Rubik';
background: var(--color-purple);
color: var(--color-pure-white);
border-radius: 0.75rem;
border: none;
font-weight: 500;
font-size: 1.125rem;
cursor: pointer;

@media(hover: hover) and (pointer: fine) {
      &:hover {   
      background: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), #A729F5;    
    }
  }

@media only screen and (min-width: 768px) {
 height: 5.75rem;
 font-size: 1.75rem;
 border-radius: 1.5rem;
 margin-top: 0.5rem;
  }

`;

const SelectAnswerAttention = styled.p`
  color: var(--color-red);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-size: 1.125rem;
  @media only screen and (min-width: 768px) {
  font-size: 1.5rem;
  margin-top: 0.5rem;
  }
`

const SelectAnswerAttentionImage = styled.img`
height: 1.5rem;
margin-right: 0.5rem;
@media only screen and (min-width: 768px) {
 height: 2.5rem;
  }
`

const SelectAnswerText = styled.p`
      color: ${(props) => props.theme.warningColor};
  -webkit-transition: color 0.6s ease-in-out;;
  -moz-transition: color 0.6s ease-in-out;;
  -o-transition: color 0.6s ease-in-out;;
  transition: color 0.6s ease-in-out;
`

type Question = {
  question: string;
  options: string[];
  answer: string;
};

type QuizProps = {
  questions: Question[];
  onQuizCompletion: (finalScore: number) => void;
};

const Quiz = ({
  questions,
  onQuizCompletion,

}: QuizProps & {}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [questionsReady, setQuestionsReady] = useState(false); // Track if questions are ready
  const [isProgressBarActive, setProgressBarActive] = useState(true);
  const progressBarProgress = (10 - timeLeft) * (100 / 10);
  const [playCorrectSound] = useSound(CorrectSound);
  const [playWrongSound] = useSound(WrongSound);
  const [playTimeUpSound] = useSound(TimeUpSound);
  const isAnswerSelected = () => selectedAnswer !== null;
  const [attemptedSubmission, setAttemptedSubmission] = useState(false);

  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, [questions]);

  useEffect(() => {
    if (shuffledQuestions.length > 0) {
      const current = shuffledQuestions[currentQuestionIndex];
      const shuffledAnswers = [...current.options].sort(() => Math.random() - 0.5);
      current.options = shuffledAnswers;
      setQuestionsReady(true);
    }

  }, [currentQuestionIndex, shuffledQuestions]);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleAnswer = (selectedOption: string) => {
    if (!answerSubmitted && timeLeft > 0) {
      setSelectedAnswer(selectedOption);

    }
  };

  const handleNextQuestion = () => {
    setAnswerSubmitted(false);
    setSelectedAnswer(null);
    setQuestionsReady(false);
    setProgressBarActive(true);
    setAttemptedSubmission(false);
    
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(10);
    } else {
      onQuizCompletion(score);
    }
  };



  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft === 0 && !answerSubmitted) {
      clearInterval(timer);
      playTimeUpSound();
      setAnswerSubmitted(true); 
    }

    return () => clearInterval(timer);
  }, [timeLeft, answerSubmitted, playTimeUpSound]);


  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 0.01; 
        }
        return 0;
      });
    }, 10); 

    return () => clearInterval(interval);
  }, [currentQuestionIndex]);

  const handleSubmission = () => {
    if (selectedAnswer !== null || timeLeft === 0) {
      setAnswerSubmitted(true);
  
      if (selectedAnswer === currentQuestion.answer) {
        playCorrectSound();
        setScore((prevScore) => prevScore + 1);
      } else {
        playWrongSound();
      }
  
      setProgressBarActive(false); 
    } else {

      setAttemptedSubmission(true);
    }
  };


  return (
    <div >
      {questionsReady && currentQuestion && ( 
      <QuizContainer>
      <QuizQuestionContainer>
        <div>
   <QuestionNumberInfo>
    {`Question ${currentQuestionIndex + 1} of ${questions.length}`}
      </QuestionNumberInfo>
      <QuestionText> {currentQuestion.question} </QuestionText>
      </div>
      <ProgressBar progress={progressBarProgress} $isProgressActive={isProgressBarActive} />
            </QuizQuestionContainer>
    
    <AnswerChoices >  
    {currentQuestion.options.map((option, index) => (
  <ChoiceButton
  key={index}
  $isSelected={selectedAnswer === option}
  $answerSubmitted={answerSubmitted}
  $isCorrect={option === currentQuestion.answer}
  $isWrong={selectedAnswer === option && option !== currentQuestion.answer}
  onClick={() => handleAnswer(option)}
  style={{
    pointerEvents: answerSubmitted || timeLeft === 0 ? 'none' : 'auto',
  }}
  
>
        <AnswerChoiceLetter
          $isSelected={selectedAnswer === option}
          $answerSubmitted={answerSubmitted}
          $isCorrect={option === currentQuestion.answer}
          $isWrong={selectedAnswer === option && option !== currentQuestion.answer}>{String.fromCharCode(65 + index)} </AnswerChoiceLetter>
        <ChoiceText>{option}</ChoiceText>
        {answerSubmitted && option === currentQuestion.answer && (
          <CorrectImageContainer src={CorrectImage} alt="Correct" />
        )}
        {answerSubmitted && option === selectedAnswer && option !== currentQuestion.answer && (
          <>
            <WrongImageContainer src={IncorrectImage} alt="Incorrect" />
          </>
        )}
      </ChoiceButton>
    ))}
    {(!answerSubmitted) &&   (
      <SubmitButton id="submit-button" onClick={handleSubmission}>
        Submit
      </SubmitButton>
    )}
    {answerSubmitted && (
      <NextButton onClick={handleNextQuestion}>
        {currentQuestionIndex + 1 < questions.length ? 'Next Question' : 'Finish'}
      </NextButton>
    )}
 {attemptedSubmission && !isAnswerSelected() && (
  <SelectAnswerAttention>
    <SelectAnswerAttentionImage src={IncorrectImage} alt="Incorrect" />
    <SelectAnswerText>Please select an answer.</SelectAnswerText>
  </SelectAnswerAttention>
)}
  </AnswerChoices>
  </QuizContainer>
      )}
    </div>
  );
};

export default Quiz; 