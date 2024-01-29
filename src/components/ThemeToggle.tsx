import React, { useContext, useCallback } from 'react';
import { ThemeContext } from '../themes/Themes';
import styled from 'styled-components';
import { MoonLight, MoonDark, SunLight, SunDark } from '../assets/index';

const ToggleSwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  width: 80px;
  margin-left: auto;
  @media only screen and (min-width: 768px) {
    width: 128px;
  }
`;

const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 32px;
  height: 20px;
  background-color: purple;
  border-radius: 30px;
  cursor: pointer;
  @media only screen and (min-width: 768px) {
    width: 48px;
  height: 28px;
  }
`;

const ToggleInput = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 0;
  height: 0;
`;

const ToggleSlider = styled.span<{ checked: boolean }>`
  position: absolute;
  top: 4px;
  left: ${(props) => (props.checked ? '16px' : '4px')};
  width: 12px;
  height: 12px;
  border-radius: 30px;
  background-color: white;
  transition: 0.4s;
  @media only screen and (min-width: 768px) {
    width: 20px;
  height: 20px;
  left: ${(props) => (props.checked ? '24px' : '4px')};
  }

`;


const ThemeImage = styled.img`
  height: 16px;
  width: 16px;
  @media only screen and (min-width: 768px) {
    width: 24px;
  height: 24px;
  }
`;


const ThemeToggle = () => {
  const { dark, toggleTheme } = useContext(ThemeContext);

  const handleToggleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLLabelElement>) => {
      // Handle Enter key to toggle theme
      if (event.key === 'Enter') {
        toggleTheme();
      }

      // Handle Left arrow key to toggle to dark theme
      if (event.key === 'ArrowLeft') {
        dark && toggleTheme();
      }

      // Handle Right arrow key to toggle to light theme
      if (event.key === 'ArrowRight') {
        !dark && toggleTheme();
      }
    },
    [dark, toggleTheme]
  );


  return (
    <ToggleSwitchContainer>
        <ThemeImage src={dark ? SunLight : SunDark} alt="Sun" />
    <ToggleContainer onKeyDown={handleToggleKeyDown} tabIndex={0} >
      <ToggleInput type="checkbox" checked={dark} onChange={toggleTheme} tabIndex={-1} />
      <ToggleSlider checked={dark}  />
    </ToggleContainer>
    <ThemeImage src={dark ? MoonLight : MoonDark} alt="Moon" />
    </ToggleSwitchContainer>
  );
};

export default ThemeToggle;



