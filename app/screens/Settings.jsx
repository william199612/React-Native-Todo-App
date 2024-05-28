import React from 'react';
import { View, Text, Switch, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../theme/useTheme';
import { Colors } from '../components/styles';

// TODO: add global theme button
const Settings = ({ navigation }) => {
	const { theme, toggleTheme } = useTheme();

	const handleLogout = () => {
		navigation.navigate('Login');
	};

	return (
		<View style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
			<StatusBar style="dark" />
			<View style={styles.innerContainer}>
				<View style={styles.modeWrapper}>
					<Text style={theme === 'dark' ? styles.darkText : styles.lightText}>Dark Mode</Text>
					<Switch style={styles.switch} value={theme === 'dark'} onValueChange={toggleTheme} />
				</View>

				<Pressable style={theme === 'dark' ? styles.darkButton : styles.lightButton} onPress={handleLogout}>
					<Text style={theme === 'dark' ? styles.darkButtonText : styles.lightButtonText}>Logout</Text>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	lightContainer: {
		flex: 1,
		padding: 25,
		paddingTop: 30,
		backgroundColor: Colors.primary,
	},
	darkContainer: {
		flex: 1,
		padding: 25,
		paddingTop: 30,
		backgroundColor: Colors.tertiary,
	},
	innerContainer: {
		flex: 1,
		width: '100%',
	},
	modeWrapper: {
		flexDirection: 'row',
	},
	lightText: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'left',
		width: '50%',
	},
	darkText: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'left',
		width: '50%',
		color: Colors.primary,
	},
	switch: {
		width: '50%',
		height: '50%',
	},
	lightButton: {
		position: 'absolute',
		bottom: 80,
		width: '100%',
		padding: 10,
		backgroundColor: Colors.brand,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginBottom: 10,
		height: 50,
	},
	darkButton: {
		position: 'absolute',
		bottom: 80,
		width: '100%',
		padding: 10,
		backgroundColor: Colors.secondary,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginBottom: 10,
		height: 50,
	},
	lightButtonText: {
		color: Colors.primary,
		fontSize: 18,
	},
	darkButtonText: {
		color: Colors.black,
		fontSize: 18,
	},
});

export default Settings;
