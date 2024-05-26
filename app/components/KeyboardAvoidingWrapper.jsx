import React from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { Colors } from '../components/styles';

const KeyboardAvoidingWrapper = ({ children }) => {
	return (
		<KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
			<ScrollView>{children}</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	KeyboardAvoidingView: {
		flex: 1,
		backgroundColor: Colors.primary,
	},
});

export default KeyboardAvoidingWrapper;
