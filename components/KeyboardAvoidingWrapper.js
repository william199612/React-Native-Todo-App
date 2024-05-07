import React from 'react';

import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';

const KeyboardAvoidingWrapper = ({ children }) => {
	return (
		<KeyboardAvoidingView style={styles}>
			<ScrollView>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	KeyboardAvoidingView: {
		flex: 1,
	},
});

export default KeyboardAvoidingWrapper;
