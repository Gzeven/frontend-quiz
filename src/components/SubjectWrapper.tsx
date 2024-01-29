// import React from 'react';
// import styled, { css } from 'styled-components';

// interface SubjectWrapperProps {
//   onClick: () => void;
//   tabIndex: number;
//   focusedSubject: boolean;
//   $backgroundColor?: string;
//   imageSrc: string;
//   text: string;
//   $isHeader?: boolean; // New prop to indicate if it's used in the header
// }

// const SubjectContainer = styled.div<{ $isHeader?: boolean }>`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   ${(props) =>
//     !props.$isHeader &&
//     css`
//       background: ${(props) => props.theme.backgroundTwo};
//       -webkit-transition: background-color 1s ease-out;
//   -moz-transition: background-color 1s ease-out;
//   -o-transition: background-color 1s ease-out;
//   transition: background-color 1s ease-out;
//       box-shadow: 0px 16px 40px rgba(143, 160, 193, 0.14);
//       height: 64px;
//       margin-bottom: 12px;
//       border-radius: 12px;
//     `}
//     @media only screen and (min-width: 768px) {
//       ${(props) =>
//     !props.$isHeader &&
//     css`
//       height: 80px;
//       margin-bottom: 24px;
//       border-radius: 24px;
//     `}
//   }
//   @media only screen and (min-width: 1440px) {
//     ${(props) =>
//     !props.$isHeader &&
//     css`
//       height: 96px;
//       width: 564px;
//     `}
   
//   }
// `;

// const SubjectImageContainer = styled.div<{ $isHeader?: boolean; $backgroundColor?: string }>`
//   width: 40px;
//   height: 40px;
//   border-radius: ${(props) => (props.$isHeader ? '4px' : '6px')};
//   margin-left: ${(props) => (props.$isHeader ? '0px' : '12px')};
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   $background-color: ${(props) => props.$backgroundColor || 'transparent'};
//   /* transition: all ease-in-out 1.4s; */
//   @media only screen and (min-width: 768px) {
//     width: 56px;
//     height: 56px;
//     border-radius: ${(props) => (props.$isHeader ? '8px' : '12px')};
//   }
// `;

// const SubjectImage = styled.img`
//   max-width: 32.5px;
// `;

// const SubjectText = styled.span<{ $isHeader?: boolean }>`
//   font-weight: 500;
//   font-size: 1.125rem;
//   margin-left: 1rem;
//   color: ${(props) => props.theme.textColorOne};
//   transition: color ease-in-out 0.6s;
//   @media only screen and (min-width: 768px) {
//     font-size: 1.75rem;
//     margin-left: 2rem;
//   }
// `;

// const SubjectWrapper: React.FC<SubjectWrapperProps> = ({
//   onClick,
//   tabIndex,
//   focusedSubject,
//   $backgroundColor,
//   imageSrc,
//   text,
//   $isHeader = false,
// }) => {
//   const setFocusedSubject = (index: number) => {
//     // Logic for setting focused subject
//   };

//   return (
//     <SubjectContainer
//       onClick={onClick}
//       tabIndex={tabIndex}
     
//       onFocus={() => setFocusedSubject(tabIndex)}
//       onBlur={() => setFocusedSubject(-1)}
//       $isHeader={$isHeader}
//     >
//       <SubjectImageContainer $isHeader={$isHeader} $backgroundColor={$backgroundColor}>
//         <SubjectImage src={imageSrc} alt={text} /> {/* Image */}
//       </SubjectImageContainer>
//       <SubjectText $isHeader={$isHeader}>{text}</SubjectText> {/* Text */}
//     </SubjectContainer>
//   );
// };

// export default SubjectWrapper;

import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

interface SubjectWrapperProps {
  onClick: () => void;
  tabIndex: number;
  focusedSubject: boolean;
  $backgroundColor?: string;
  imageSrc: string;
  text: string;
  $isHeader?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

const SubjectContainer = styled.div<{ $isHeader?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${(props) =>
    !props.$isHeader &&
    css`
      background: ${(props) => props.theme.backgroundTwo};
      -webkit-transition: background-color 1s ease-out;
      -moz-transition: background-color 1s ease-out;
      -o-transition: background-color 1s ease-out;
      transition: background-color 1s ease-out;
      box-shadow: 0px 16px 40px rgba(143, 160, 193, 0.14);
      height: 64px;
      margin-bottom: 12px;
      border-radius: 12px;
    `}
  @media only screen and (min-width: 768px) {
    ${(props) =>
      !props.$isHeader &&
      css`
        height: 80px;
        margin-bottom: 24px;
        border-radius: 24px;
      `}
  }
  @media only screen and (min-width: 1440px) {
    ${(props) =>
      !props.$isHeader &&
      css`
        height: 96px;
        width: 564px;
      `}
  }
`;

const SubjectImageContainer = styled.div<{ $isHeader?: boolean; $backgroundColor?: string }>`
  width: 40px;
  height: 40px;
  border-radius: ${(props) => (props.$isHeader ? '4px' : '6px')};
  margin-left: ${(props) => (props.$isHeader ? '0px' : '12px')};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.$backgroundColor || 'transparent'};
  @media only screen and (min-width: 768px) {
    width: 56px;
    height: 56px;
    border-radius: ${(props) => (props.$isHeader ? '8px' : '12px')};
  }
`;

const SubjectImage = styled.img`
  max-width: 32.5px;
`;

const SubjectText = styled.span<{ $isHeader?: boolean }>`
  font-weight: 500;
  font-size: 1.125rem;
  margin-left: 1rem;
  color: ${(props) => props.theme.textColorOne};
  transition: color ease-in-out 0.6s;
  @media only screen and (min-width: 768px) {
    font-size: 1.75rem;
    margin-left: 2rem;
  }
`;

const SubjectWrapper: React.FC<SubjectWrapperProps> = forwardRef<HTMLDivElement, SubjectWrapperProps>(
  ({ onClick, tabIndex, focusedSubject, $backgroundColor, imageSrc, text, $isHeader = false }, ref) => {
    const setFocusedSubject = (index: number) => {
      // Logic for setting focused subject
    };

    return (
      <SubjectContainer
        ref={ref}
        tabIndex={focusedSubject ? 0 : -1}
        onFocus={() => setFocusedSubject(tabIndex)}
        onClick={onClick}
        $isHeader={$isHeader}
      >
        <SubjectImageContainer $isHeader={$isHeader} $backgroundColor={$backgroundColor}>
          <SubjectImage src={imageSrc} alt={text} />
        </SubjectImageContainer>
        <SubjectText $isHeader={$isHeader}>{text}</SubjectText>
      </SubjectContainer>
    );
  }
);

export default SubjectWrapper;
