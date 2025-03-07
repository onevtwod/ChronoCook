import React, { createContext, useContext, useState, useEffect } from 'react';
import { EraTheme } from '../models';
import { MODERN_THEME, getThemeByEra } from '../theme/eras';

interface ThemeContextType {
  currentTheme: EraTheme;
  currentEra: string;
  setEra: (era: string) => void;
  toggleTimeTravel: (enabled: boolean) => void;
  isTimeTravelMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: MODERN_THEME,
  currentEra: 'Modern',
  setEra: () => {},
  toggleTimeTravel: () => {},
  isTimeTravelMode: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentEra, setCurrentEra] = useState<string>('Modern');
  const [isTimeTravelMode, setIsTimeTravelMode] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<EraTheme>(MODERN_THEME);

  useEffect(() => {
    if (isTimeTravelMode) {
      setCurrentTheme(getThemeByEra(currentEra));
    } else {
      setCurrentTheme(MODERN_THEME);
    }
  }, [currentEra, isTimeTravelMode]);

  const setEra = (era: string) => {
    setCurrentEra(era);
  };

  const toggleTimeTravel = (enabled: boolean) => {
    setIsTimeTravelMode(enabled);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        currentEra,
        setEra,
        toggleTimeTravel,
        isTimeTravelMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}; 