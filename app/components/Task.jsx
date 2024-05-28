import React, { useEffect } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Card, Text } from 'react-native-paper';
import { useTheme } from '../theme/useTheme';
import { Colors } from './styles';

const Task = ({ data }) => {
	const { theme } = useTheme();

	const handleComplete = () => {
		data.isCompleted = !data.isCompleted;
	};

	return (
		<Card style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
			<Card.Content style={styles.item}>
				<Text
					style={
						theme === 'dark'
							? [styles.darkDescription, data.isCompleted && styles.completedText]
							: [styles.lightDescription, data.isCompleted && styles.completedText]
					}
				>
					{data.description}
				</Text>
				<Text style={theme === 'dark' ? styles.darkTime : styles.lightTime}>{data.dueTime && data.dueTime}</Text>
			</Card.Content>
			<Pressable style={styles.taskContainer} onPress={handleComplete}>
				<FontAwesome5
					name={data.isCompleted ? 'check-circle' : 'circle'}
					size={25}
					color={
						theme === 'dark'
							? data.isCompleted
								? Colors.primary
								: Colors.tertiary
							: data.isCompleted
							? Colors.green
							: Colors.tertiary
					}
				/>
			</Pressable>
		</Card>
	);
};

const styles = StyleSheet.create({
	lightContainer: {
		position: 'relative',
		marginVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: Colors.primary,
		borderWidth: 0.8,
		borderRadius: 10,
		borderColor: Colors.darkLight,
	},
	darkContainer: {
		position: 'relative',
		marginVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: Colors.brand,
		borderRadius: 10,
	},
	item: {
		width: 380,
		padding: 20,
	},
	lightDescription: {
		flexWrap: 'wrap',
		width: '80%',
		fontSize: 18,
	},
	darkDescription: {
		flexWrap: 'wrap',
		width: '80%',
		fontSize: 18,
		color: Colors.primary,
	},
	lightTime: {
		fontSize: 16,
		color: Colors.tertiary,
		fontWeight: 'bold',
		marginTop: 10,
		opacity: 0.5,
	},
	darkTime: {
		fontSize: 16,
		color: Colors.secondary,
		fontWeight: 'bold',
		marginTop: 10,
		opacity: 0.5,
	},
	taskContainer: {
		position: 'absolute',
		right: 10,
		top: 0,
		bottom: 0,
		justifyContent: 'center',
		width: 30,
		opacity: 0.5,
	},
	completedText: {
		color: Colors.darkLight,
		textDecorationLine: 'line-through',
	},
});

export default Task;
