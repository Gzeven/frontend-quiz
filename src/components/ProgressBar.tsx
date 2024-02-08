import styled from 'styled-components';

type ProgressBarProps = {
  progress: number;
  $isProgressActive: boolean; 
};

const ProgressBarContainer = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.backgroundTwo};
  background-color: ${(props) => props.theme.backgroundTwo};
-webkit-transition: color 1s ease-in-out;;
  -moz-transition: color 1s ease-in-out;;
  -o-transition: color 1s ease-in-out;;
  transition: color 1s ease-in-out;
  border-radius: 999px;
  padding: 0.25rem; 
`;

const ProgressBarFill = styled.div<ProgressBarProps>`
  height: 0.5rem;
  border-radius: 6.5rem;
  width: ${(props) => (props.$isProgressActive ? props.progress : 100)}%; 
  background-color: var(--color-purple);
  transition: ${(props) => (props.$isProgressActive ? 'width 10ms linear' : 'none')}; 
`;

const ProgressBar = ({ progress, $isProgressActive }: ProgressBarProps) => (
  <ProgressBarContainer>
    <ProgressBarFill progress={progress} $isProgressActive={$isProgressActive} />
  </ProgressBarContainer>
);

export default ProgressBar;
