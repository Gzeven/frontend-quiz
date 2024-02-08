import React, { useContext, useCallback } from 'react';
import { ThemeContext } from '../themes/Themes';
import styled from 'styled-components';
import { MoonLight, MoonDark, SunLight, SunDark } from '../assets/index';

const ToggleSwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 5rem;
  margin-left: auto;
  @media only screen and (min-width: 768px) {
    width: 8rem;
  }
`;

const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 2rem;
  height: 1.25rem;
  background-color: var(--color-purple);
  border-radius: 1.875rem;
  cursor: pointer;
  @media only screen and (min-width: 768px) {
    width: 3rem;
    height: 1.75rem;
  }
`;

const ToggleInput = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 0;
  height: 0;
`;

const ToggleSlider = styled.span<{ checked: boolean }>`
  position: absolute;
  top: 0.25rem;
  left: ${(props) => (props.checked ? '16px' : '4px')};
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 1.875rem;
  background-color: white;
  transition: 0.4s;
  @media only screen and (min-width: 768px) {
    width: 1.25rem;
    height: 1.25rem;
    left: ${(props) => (props.checked ? '1.5rem' : '0.25rem')};
  }
`;

const ThemeImage = styled.img`
  height: 1rem;
  width: 1rem;
  @media only screen and (min-width: 768px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const HiddenText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

const ThemeToggle = () => {
  const { dark, toggleTheme } = useContext(ThemeContext);

  const handleToggleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLLabelElement>) => {
      if (event.key === 'Enter') {
        toggleTheme();
      }
      if (event.key === 'ArrowLeft') {
        dark && toggleTheme();
      }
      if (event.key === 'ArrowRight') {
        !dark && toggleTheme();
      }
    },
    [dark, toggleTheme]
  );

  return (
    <ToggleSwitchContainer>
      <ThemeImage src={dark ? SunLight : SunDark} alt="Sun" />
      <ToggleContainer htmlFor="theme-toggle" onKeyDown={handleToggleKeyDown} tabIndex={0}>
        <HiddenText>Toggle Dark Mode</HiddenText>
        <ToggleInput id="theme-toggle" type="checkbox" checked={dark} onChange={toggleTheme} tabIndex={-1} role="switch" aria-checked={dark} />
        <ToggleSlider checked={dark} />
      </ToggleContainer>
      <ThemeImage src={dark ? MoonLight : MoonDark} alt="Moon" />
    </ToggleSwitchContainer>
  );
};

export default ThemeToggle;


