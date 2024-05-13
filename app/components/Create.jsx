import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { Colors } from './styles';

const Create = ({ task, setTask, taskList, setTaskList }) => {
	const handleAddTask = () => {
		console.log(task);
		setTaskList([...taskList, task]);
		setTask(null);
	};

	return (
		<View style={styles.addContainer}>
			<TextInput
				style={styles.input}
				placeholder={'Write a task...'}
				onChangeText={(text) => setTask(text)}
				value={task}
			/>
			<TouchableOpacity onPress={handleAddTask}>
				<View style={styles.addWrapper}>
					<FontAwesome5 name="plus" size={20} color={Colors.brand} />
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
	input: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		width: '100%',
		backgroundColor: Colors.primary,
		borderRadius: 60,
		borderWidth: 1,
		borderColor: Colors.secondary,
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
