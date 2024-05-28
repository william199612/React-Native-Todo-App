import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { useTheme } from '../theme/useTheme';
import { Colors } from './styles';

const Create = ({ task, setTask, taskList, setTaskList }) => {
	const { theme } = useTheme();
	const handleAddTask = () => {
		console.log(task);
		setTaskList([...taskList, task]);
		setTask(null);
	};

	return (
		<View style={theme ? styles.darkAddContainer : styles.addContainer}>
			<TextInput
				style={theme ? styles.darkInput : styles.input}
				placeholder={'Write a task...'}
				placeholderTextColor={theme === 'dark' ? Colors.primary : Colors.darkLight}
				onChangeText={(text) => setTask(text)}
				value={task}
			/>
			<TouchableOpacity onPress={handleAddTask}>
				<View style={styles.addWrapper}>
					<FontAwesome5 name="plus" size={20} color={theme ? Colors.primary : Colors.brand} />
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	addContainer: {
		position: 'absolute',
		top: 20,
		left: 20,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: Colors.tertiary,
		zIndex: 10,
	},
	darkAddContainer: {
		position: 'absolute',
		top: 20,
		left: 20,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: Colors.darkLight,
		zIndex: 10,
	},
	input: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		width: '100%',
		backgroundColor: Colors.primary,
		borderRadius: 60,
		borderWidth: 1,
		borderColor: Colors.secondary,
	},
	darkInput: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		width: '100%',
		color: Colors.primary,
		backgroundColor: Colors.tertiary,
		borderRadius: 60,
		borderWidth: 1,
		borderColor: Colors.darkLight,
	},
	addWrapper: {
		position: 'absolute',
		top: -20,
		right: 10,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Create;
