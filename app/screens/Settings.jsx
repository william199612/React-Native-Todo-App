import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../components/styles';

// TODO: add global theme button
const Settings = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<StatusBar style="dark" />
			<View style={styles.innerContainer}>
				<Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
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
		paddingTop: 100,
		backgroundColor: Colors.primary,
	},
	innerContainer: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
	},
	button: {
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
