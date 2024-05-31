import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { Card, Text } from 'react-native-paper';
import { useTheme } from '../contexts/useTheme';
import { Colors } from './styles';

const Task = ({ data, setRefresh }) => {
	const { theme } = useTheme();
	const [timeLeft, setTimeLeft] = useState('');
	const [message, setMessage] = useState('');

	const formatDate = (date) => {
		const dateObj = new Date(date);
		const hours = String(dateObj.getHours()).padStart(2, '0');
		const minutes = String(dateObj.getMinutes()).padStart(2, '0');
		return `${hours}:${minutes}`;
	};

	const calculateTimeLeft = (dueDate) => {
		const due = new Date(dueDate);
		const now = new Date();
		const diff = (due - now) / 60000; // Difference in minutes

		if (data.completed) return 'Done';
		if (diff == 0) return 'Due now';
		if (diff <= 0) return 'Over due time';

		const hours = Math.floor(diff / 60);
		const minutes = Math.floor(diff % 60);

		if (hours === 0) return `${minutes}min left`;
		else return `${hours}hr ${minutes}min left`;
	};

	const handleComplete = () => {
		const url = `http://10.0.2.2:8080/todos/${data.id}`;

		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				completed: !data.completed,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				if (result !== null) {
					// console.log(result);
					setRefresh((prev) => !prev);
				} else {
					setMessage('Something went wrong. Please try again later.');
				}
			})
			.catch((error) => {
				console.error(error);
				setMessage('Something went wrong. Please try again later.');
			});
	};

	const handleDelete = () => {
		const url = `http://10.0.2.2:8080/todos/${data.id}`;

		fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		})
			.then((response) => response.json())
			.then((result) => {
				if (result.error == false) {
					console.log(result);
					setRefresh((prev) => !prev);
				} else {
					setMessage('Something went wrong. Please try again later.');
				}
			})
			.catch((error) => {
				console.error(error);
				setMessage('Something went wrong. Please try again later.');
			});
	};

	useEffect(() => {
		const updateDueTime = () => {
			setTimeLeft(calculateTimeLeft(data.due_date));
		};
		updateDueTime();

		const intervalId = setInterval(updateDueTime, 60000);
		return () => clearInterval(intervalId);
	}, [timeLeft]);

	return (
		<Card style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
			<Pressable style={styles.taskContainer} onPress={handleComplete}>
				<FontAwesome5
					name={data.completed ? 'check-circle' : 'circle'}
					size={25}
					color={
						theme === 'dark'
							? data.completed
								? Colors.primary
								: Colors.tertiary
							: data.completed
							? Colors.green
							: Colors.tertiary
					}
				/>
			</Pressable>
			<Card.Content style={styles.item}>
				<Text
					style={
						theme === 'dark'
							? [styles.darkDescription, data.completed && styles.completedText]
							: [styles.lightDescription, data.completed && styles.completedText]
					}
				>
					{data.description}
				</Text>
				<Text style={styles.lightTime}>
					{data.due_date && formatDate(data.due_date)}
					<Text style={styles.leftTime}>{`    ${calculateTimeLeft(data.due_date)}`}</Text>
				</Text>
			</Card.Content>
			<Pressable style={styles.deleteContainer} onPress={handleDelete}>
				<AntDesign name="delete" size={25} color={Colors.red} />
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
		width: 350,
		paddingVertical: 20,
		paddingLeft: 60,
	},
	lightDescription: {
		flexWrap: 'wrap',
		width: '80%',
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.brand,
	},
	darkDescription: {
		flexWrap: 'wrap',
		width: '80%',
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.primary,
	},
	lightTime: {
		fontSize: 16,
		color: Colors.black,
		fontWeight: 'bold',
		marginTop: 10,
	},
	leftTime: {
		fontSize: 14,
		color: Colors.darkLight,
		fontWeight: 'bold',
	},
	taskContainer: {
		position: 'absolute',
		left: 20,
		top: 0,
		bottom: 0,
		justifyContent: 'center',
		width: 30,
	},
	deleteContainer: {
		position: 'absolute',
		right: 20,
		top: 0,
		bottom: 0,
		justifyContent: 'center',
		width: 30,
		opacity: 0.8,
	},
	completedText: {
		color: Colors.darkLight,
		textDecorationLine: 'line-through',
	},
});

export default Task;
