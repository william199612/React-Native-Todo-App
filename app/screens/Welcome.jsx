import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

import { Colors } from '../components/styles';
import { useTheme } from '../contexts/useTheme';

const Welcome = ({ navigation }) => {
	const { theme } = useTheme();
	return (
		<View style={theme === 'dark' ? styles.darkContainer : styles.container}>
			<StatusBar style="dark" />
			<View style={styles.innerContainer}>
				<Feather name="check-circle" size={150} color={Colors.brand} />
				<Text style={styles.pageTitle}>JustDo</Text>
				<Text style={theme === 'dark' ? styles.darkText : styles.text}>Manage your time & task, JustDo it!</Text>
				<View style={styles.buttonWrapper}>
					<Pressable
						style={theme === 'dark' ? styles.darkButton : styles.button}
						onPress={() => navigation.navigate('Login')}
					>
						<Text style={theme === 'dark' ? styles.darkButtonText : styles.buttonText}>Login</Text>
					</Pressable>
					<View style={styles.space}></View>
					<Pressable
						style={theme === 'dark' ? styles.darkButton : styles.button}
						onPress={() => navigation.navigate('Signup')}
					>
						<Text style={theme === 'dark' ? styles.darkButtonText : styles.buttonText}>Signup</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 25,
		paddingTop: 250,
		backgroundColor: Colors.primary,
	},
	darkContainer: {
		flex: 1,
		padding: 25,
		paddingTop: 250,
		backgroundColor: Colors.tertiary,
	},
	innerContainer: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
	},
	pageTitle: {
		fontSize: 30,
		textAlign: 'center',
		fontWeight: 'bold',
		color: Colors.brand,
		padding: 10,
	},
	text: {
		fontSize: 16,
		textAlign: 'center',
		fontWeight: 'bold',
		color: Colors.tertiary,
		padding: 10,
	},
	darkText: {
		fontSize: 16,
		textAlign: 'center',
		fontWeight: 'bold',
		color: Colors.primary,
		padding: 10,
	},
	buttonWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
	},
	space: {
		width: 40,
	},
	button: {
		width: '40%',
		padding: 10,
		backgroundColor: Colors.brand,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		height: 50,
	},
	darkButton: {
		padding: 10,
		backgroundColor: Colors.secondary,
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
	},
	buttonText: {
		color: Colors.primary,
		fontSize: 18,
	},
	darkButtonText: {
		color: Colors.brand,
		fontSize: 18,
	},
});

export default Welcome;
