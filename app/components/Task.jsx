import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Card, Text } from 'react-native-paper';
import { Colors } from './styles';

const Task = ({ data }) => {
	const handleComplete = () => {
		data.isCompleted = !data.isCompleted;
	};

	return (
		<Card style={styles.container}>
			<Card.Content style={styles.item}>
				<Text style={[styles.description, data.isCompleted && styles.completedText]}>{data.description}</Text>
				<Text style={styles.time}>{data.dueTime}</Text>
			</Card.Content>
			<TouchableOpacity style={styles.taskContainer} onPress={handleComplete}>
				<FontAwesome5
					name={data.isCompleted ? 'check-circle' : 'circle'}
					size={20}
					color={data.isCompleted ? 'green' : 'grey'}
				/>
			</TouchableOpacity>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		marginVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 10,
	},
	item: {
		width: 400,
		padding: 20,
	},
	description: {
		flexWrap: 'wrap',
		width: '80%',
		fontSize: 18,
	},
	time: {
		fontSize: 14,
		color: Colors.tertiary,
		marginTop: 10,
		opacity: 0.5,
	},
	taskContainer: {
		position: 'absolute',
		right: 10,
		top: 0,
		bottom: 0,
		justifyContent: 'center',
		width: 20,
		opacity: 0.5,
	},
	completedText: {
		textDecorationLine: 'line-through',
	},
});

export default Task;
