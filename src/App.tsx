import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import {
  HTMLLogo,
  CSSLogo,
  JSLogo,
  AccessibilityLogo,
  PatternMobileDark,
  PatternMobileLight,
  PatternTabletDark,
  PatternTabletLight,
  PatternDesktopDark,
  PatternDesktopLight,
} from './assets/index.js';
import data from './data/data.json';
import Quiz from './components/Quiz';
import EndScreen from './components/Endscreen';
import ThemeToggle from './components/ThemeToggle';
import SubjectWrapper from './components/SubjectWrapper';
import SubjectDisplay from './components/SubjectDisplay';
import { lightTheme, darkTheme, Theme, ThemeContext } from './themes/Themes';




const StartScreen = styled.div<{ $dark: boolean }>`
  background-image: url(${(props) => (props.$dark ? PatternMobileDark : PatternMobileLight)});
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.background};
  -webkit-transition: background-color 1s ease-out;
  -moz-transition: background-color 1s ease-out;
  -o-transition: background-color 1s ease-out;
  transition: background-color 1s ease-out;
  padding: 0 1.5rem;
  min-height: 100vh;
  @media only screen and (min-width: 768px) {
    background-image: url(${(props) => (props.$dark ? PatternTabletDark : PatternTabletLight)});
    padding: 0 4rem;
  }
  @media only screen and (min-width: 1024px) {
    background-image: url(${(props) => (props.$dark ? PatternDesktopDark : PatternDesktopLight)});
    padding: 0 8.75rem;
  }
`;

const AppHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 6.5rem;
  @media only screen and (min-width: 768px) {
    height: 9.0625rem;
  }
  @media only screen and (min-width: 1024px) {
    height: 14rem;
  }
`;

const StartMenuContainer = styled.div`
  @media only screen and (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
`;

const WelcomeTextContainer = styled.div`
  margin-bottom: 2.5rem;
  @media only screen and (min-width: 768px) {
    margin-bottom: 4rem;
  }
  @media only screen and (min-width: 1024px) {
    width:100%;
  }
`;

const WelcomeSubjectContainer = styled.div`
  @media only screen and (min-width: 1024px) {
    width: 100%;
  }
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: ${(props) => props.theme.textColorOne};
  -webkit-transition: color 0.6s ease-in-out;
  -moz-transition: color 0.6s ease-in-out;
  -o-transition: color 0.6s ease-in-out;
  transition: color 0.6s ease-in-out;
  @media only screen and (min-width: 768px) {
    font-size: 4rem;
  }
`;

const HeadingTwo = styled.h2`
  font-size: 2.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.textColorOne};
  -webkit-transition: color 0.6s ease-in-out;
  -moz-transition: color 0.6s ease-in-out;
  -o-transition: color 0.6s ease-in-out;
  transition: color 0.6s ease-in-out;
  padding-bottom: 1rem;

  @media only screen and (min-width: 768px) {
    font-size: 4rem;
  }
  @media only screen and (min-width: 1024px) {
    margin-bottom: 3rem;
  }
`;

const SubHeading = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  font-style: italic;
  color: ${(props) => props.theme.textColorTwo};
  -webkit-transition: color 0.6s ease-in-out;
  -moz-transition: color 0.6s ease-in-out;
  -o-transition: color 0.6s ease-in-out;
  transition: color 0.6s ease-in-out;
  @media only screen and (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

type Subject = 'HTML' | 'CSS' | 'JavaScript' | 'Accessibility' | string;

const App = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const dark = theme === darkTheme;

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  useEffect(() => {
    const body = document.body;
    if (body) {
      if (dark) {
        body.classList.add('dark-theme');
      } else {
        body.classList.remove('dark-theme');
      }
    }
  }, [dark]);

  const getSubjectImage = (subject: Subject): string => {
    return {
      HTML: HTMLLogo,
      CSS: CSSLogo,
      JavaScript: JSLogo,
      Accessibility: AccessibilityLogo,
    }[subject] || '';
  };

  const backgroundColors: Record<Subject, string> = {
    HTML: 'hsl(22, 100%, 96%)',
    CSS: 'hsl(151, 87%, 94%)',
    JavaScript: 'hsl(223, 100%, 96%)',
    Accessibility: 'hsl(277, 100%, 95%)',
  };

  const fetchQuestionsBySubject = (subject: Subject) => {
    const selectedQuiz = data.quizzes.find((quiz) => quiz.title === subject);
    return selectedQuiz ? selectedQuiz.questions : [];
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  const selectedSubjectQuestions = selectedSubject ? fetchQuestionsBySubject(selectedSubject) : [];

  const handleQuizCompletion = (finalScore: number) => {
    setScore(finalScore);
    setQuizCompleted(true);
  };

  const handlePlayAgain = () => {
    setSelectedSubject(null);
    setQuizCompleted(false);
    setScore(0);
  };

  const subjectImage = selectedSubject ? getSubjectImage(selectedSubject) : '';

 
  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ theme, dark, toggleTheme }}>
        <main>
          <StartScreen $dark={dark}>
            <AppHeader>
              {selectedSubject && subjectImage && (
                <SubjectDisplay
                  $backgroundColor={backgroundColors[selectedSubject || 'defaultSubject']}
                  imageSrc={getSubjectImage(selectedSubject || 'defaultSubject')}
                  text={selectedSubject}
                />
              )}
              <ThemeToggle />
            </AppHeader>
            {!selectedSubject && (
              <StartMenuContainer>
                <WelcomeTextContainer>
                  <Heading>Welcome to the </Heading>
                  <HeadingTwo>Frontend Quiz!</HeadingTwo>
                  <SubHeading>Pick a subject to get started.</SubHeading>
                </WelcomeTextContainer>
                {/* Use index as the second parameter in the map function */}
                {/* <div tabIndex={0} onKeyDown={handleKeyDown}> */}
                <WelcomeSubjectContainer>
  {data.quizzes.map((quiz, index) => (
    <SubjectWrapper
      key={index}
      onClick={() => handleSubjectSelect(quiz.title as Subject)}
      $backgroundColor={backgroundColors[quiz.title as Subject]}
      imageSrc={getSubjectImage(quiz.title as Subject)}
      text={quiz.title as Subject}
      
    />
  ))}
</WelcomeSubjectContainer>
              </StartMenuContainer>
            )}
            {selectedSubject && !quizCompleted && (
              <Quiz questions={selectedSubjectQuestions} onQuizCompletion={handleQuizCompletion} />
            )}
            {quizCompleted && (
              <EndScreen
                subject={selectedSubject || ''}
                score={score}
                totalQuestions={selectedSubjectQuestions.length}
                onPlayAgain={handlePlayAgain}
                subjectImageGetter={getSubjectImage}
                backgroundColors={backgroundColors}
              />
            )}
          </StartScreen>
        </main>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default App;