import React from 'react';
import styled from 'styled-components';


interface SubjectWrapperProps {
  onClick: () => void;
  $backgroundColor?: string;
  imageSrc: string;
  text: string;
  $isHeader?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

const SubjectButton = styled.button<{ $backgroundColor?: string }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  background: ${(props) => props.theme.backgroundTwo};
  border: none;
  box-shadow: 0px 16px 40px rgba(143, 160, 193, 0.14);
  border-radius: 0.75rem;
  height: 4rem;
  font-family: inherit;
  width:100%;
  padding: 0 0.75rem;
  margin-bottom: 0.75rem;
  transition: background-color 0.6s ease-out;

  &:hover {
    background-color: ${(props) => props.$backgroundColor || 'transparent'};
  }


  @media only screen and (min-width: 768px) {
    height: 5rem;
    border-radius: 1.5rem;
    padding: 0 .75rem;
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }

  @media only screen and (min-width: 1024px) {
    height: 6rem;
    border-radius: 1.5rem;
    padding: 0 2rem;
  }
`;

const SubjectImage = styled.img<{ $backgroundColor?: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  margin-right: 0.75rem;
  background-color: ${(props) => props.$backgroundColor};
  
 

  @media only screen and (min-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.75rem;
    margin-right: 2rem;
  }
`;

const SubjectText = styled.span`
font-weight: 500;
font-size: 1.125rem;
color: ${(props) => props.theme.textColorOne};

  @media only screen and (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SubjectWrapper: React.FC<SubjectWrapperProps> = ({ onClick, $backgroundColor, imageSrc, text }) => {
  return (
    <SubjectButton onClick={onClick} $backgroundColor={$backgroundColor}>
      <SubjectImage src={imageSrc} alt={""} $backgroundColor={$backgroundColor} />
      <SubjectText >{text}</SubjectText>
    </SubjectButton>
  );
};

export default SubjectWrapper;

