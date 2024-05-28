import React from 'react';
import { ThemeProvider } from './theme/useTheme';
import RootStack from './navigators/RootStack';

export default function App() {
	return (
		<ThemeProvider>
			<RootStack />
		</ThemeProvider>
	);
}
