
import styled from 'styled-components';

type ProgressBarProps = {
  progress: number;
  $isProgressActive: boolean; // New prop to control progress
};

const ProgressBarContainer = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.backgroundTwo};
  background-color: ${(props) => props.theme.backgroundTwo};
-webkit-transition: color 1s ease-in-out;;
  -moz-transition: color 1s ease-in-out;;
  -o-transition: color 1s ease-in-out;;
  transition: color 1s ease-in-out;
  /* margin-top: 1.5rem; */
  border-radius: 999px;
  padding: 0.25rem;
  @media only screen and (min-width: 768px) {
  /* margin-top: 2.5rem; */

  }
  @media only screen and (min-width: 1024px) {
  /* margin-top: 11.25rem; */
  }
  
`;

const ProgressBarFill = styled.div<ProgressBarProps>`
  height: 0.5rem;
  border-radius: 6.5rem;
  width: ${(props) => (props.$isProgressActive ? props.progress : 100)}%; /* Dynamically set the width based on progress */
  background-color: var(--color-purple);
  transition: ${(props) => (props.$isProgressActive ? 'width 10ms linear' : 'none')}; /* Control the transition */
`;

const ProgressBar = ({ progress, $isProgressActive }: ProgressBarProps) => (
  <ProgressBarContainer>
    <ProgressBarFill progress={progress} $isProgressActive={$isProgressActive} />
  </ProgressBarContainer>
);

export default ProgressBar;
