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
`;

const SubjectImageContainer = styled.div<{ $backgroundColor: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.$backgroundColor};
  
  @media only screen and (min-width: 768px) {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  }
`;

const SubjectImage = styled.img`
  max-width: 2.03125rem
`;

const SubjectText = styled.span`
  font-weight: 500;
  font-size: 1.125rem;
  margin-left: 1rem;
  color: ${(props) => props.theme.textColorOne};
  -webkit-transition: color 0.6s ease-in-out;;
  -moz-transition: color 0.6s ease-in-out;;
  -o-transition: color 0.6s ease-in-out;;
  transition: color 0.6s ease-in-out;
  @media only screen and (min-width: 768px) {
  font-size: 1.75rem;
  margin-left: 1.5rem;
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

