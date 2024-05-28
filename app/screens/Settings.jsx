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
		<View style={styles.container}>
			<StatusBar style="dark" />
			<View style={styles.innerContainer}>
				<View style={styles.modeWrapper}>
					<Text style={styles.modeText}>Dark Mode</Text>
					<Switch style={styles.switch} value={theme === 'dark'} onValueChange={toggleTheme} />
				</View>

				<Pressable style={styles.button} onPress={handleLogout}>
					<Text style={styles.buttonText}>Logout</Text>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 25,
		paddingTop: 30,
		backgroundColor: Colors.primary,
	},
	innerContainer: {
		flex: 1,
		width: '100%',
	},
	modeWrapper: {
		flexDirection: 'row',
	},
	modeText: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'left',
		width: '50%',
	},
	switch: {
		width: '50%',
		height: '50%',
	},
	button: {
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
	buttonText: {
		color: Colors.primary,
		fontSize: 18,
	},
});

export default Settings;
