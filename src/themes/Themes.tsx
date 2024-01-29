import React, { createContext,  useState, } from 'react';

export type Theme = {
  background: string;
  backgroundTwo: string;
  textColorOne: string;
  textColorTwo: string;
  appBackgroundColor: string;
  warningColor: string;
  // Add more theme properties as needed
};

export const lightTheme: Theme = {
  background: 'var(--color-light-grey)',
  backgroundTwo: 'var(--color-pure-white)',
  textColorOne: 'var(--color-dark-navy)',
  textColorTwo: 'var(--color-grey-navy)',
  warningColor: 'var(--color-red)',
  appBackgroundColor: 'var(--color-grey-navy)',
  // Define other properties for the light theme
};

export const darkTheme: Theme = {
  background: 'var(--color-dark-navy)',
  backgroundTwo: 'var(--color-navy)',
  textColorOne: 'var(--color-pure-white)',
  textColorTwo: 'var(--color-light-bluish)',
  warningColor: 'var(--color-light-grey)',
  appBackgroundColor: 'var(--color-green)',
  // Define other properties for the dark theme
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<{
  theme: Theme;
  dark: boolean; // Include a dark property
  toggleTheme: () => void;
}>({
  theme: lightTheme,
  dark: false,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [dark, setDark] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () => {
    setDark((prevDark) => !prevDark);
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };


  return (
    <ThemeContext.Provider value={{ theme, dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};