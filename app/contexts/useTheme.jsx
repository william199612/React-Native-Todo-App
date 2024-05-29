import React, { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const systemTheme = useColorScheme();
	const [theme, setTheme] = useState(systemTheme);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
