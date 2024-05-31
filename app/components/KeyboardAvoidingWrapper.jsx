import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '../components/styles';
import { useTheme } from '../contexts/useTheme';

const KeyboardAvoidingWrapper = ({ children }) => {
	const { theme } = useTheme();
	return (
		<KeyboardAvoidingView style={theme === 'dark' ? styles.darkKeyboardAvoidingView : styles.KeyboardAvoidingView}>
			<ScrollView>{children}</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	KeyboardAvoidingView: {
		flex: 1,
		backgroundColor: Colors.primary,
	},
	darkKeyboardAvoidingView: {
		flex: 1,
		backgroundColor: Colors.tertiary,
	},
});

export default KeyboardAvoidingWrapper;
