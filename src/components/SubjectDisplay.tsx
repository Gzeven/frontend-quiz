import React from 'react';
import styled from 'styled-components';

interface SubjectDisplayProps {
  $backgroundColor: string;
  imageSrc: string;
  text: string;
}


const SubjectContainer = styled.div`
  display: flex;
  align-items: center;
  /* Add styling for the subject display */
`;

const SubjectImageContainer = styled.div<{ $backgroundColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.$backgroundColor};
  
  @media only screen and (min-width: 768px) {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  }
`;

const SubjectImage = styled.img`
  max-width: 32.5px;
`;

const SubjectText = styled.span`
  font-weight: 500;
  font-size: 18px;
  margin-left: 16px;
  color: ${(props) => props.theme.textColorOne};
  -webkit-transition: color 0.6s ease-in-out;;
  -moz-transition: color 0.6s ease-in-out;;
  -o-transition: color 0.6s ease-in-out;;
  transition: color 0.6s ease-in-out;
  @media only screen and (min-width: 768px) {
  font-size: 28px;
  margin-left: 24px;
  }

`;

const SubjectDisplay: React.FC<SubjectDisplayProps> = ({ $backgroundColor, imageSrc, text }) => (
  <SubjectContainer>
    <SubjectImageContainer $backgroundColor={$backgroundColor}>
      <SubjectImage src={imageSrc} alt={text} />
    </SubjectImageContainer>
    <SubjectText>{text}</SubjectText>
  </SubjectContainer>
);

export default SubjectDisplay;

