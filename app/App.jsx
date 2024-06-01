import React from 'react';
import { AuthProvider } from './contexts/useAuth';
import { ThemeProvider } from './contexts/useTheme';
import RootStack from './navigators/RootStack';

export default function App() {
	return (
		<AuthProvider>
			<ThemeProvider>
				<RootStack />
			</ThemeProvider>
		</AuthProvider>
	);
}
