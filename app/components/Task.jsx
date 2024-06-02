import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { FontAwesome5, AntDesign, Feather } from '@expo/vector-icons';
import { Card, Text } from 'react-native-paper';
import { useTheme } from '../contexts/useTheme';
import { useAuth } from '../contexts/useAuth';
import { Colors } from './styles';
import PopUpModal from './PopUpModal';

const Task = ({ data, setMessage }) => {
	const { theme } = useTheme();
	const { refresh, setRefresh } = useAuth();
	const [timeLeft, setTimeLeft] = useState('');

	const [modalVisible, setModalVisible] = useState(false);

	const formatDateLeft = (date) => {
		const dateObj = new Date(date);
		const hours = String(dateObj.getHours()).padStart(2, '0');
		const minutes = String(dateObj.getMinutes()).padStart(2, '0');
		return `${hours}:${minutes}`;
	};

	const calculateTimeLeft = (dueDate) => {
		const due = new Date(dueDate);
		const now = new Date();
		const diff = (due - now) / 60000;

		if (data.completed) return 'Done';
		if (diff == 0) return 'Due now';
		if (diff <= 0) return 'Over due time';

		const hours = Math.floor(diff / 60);
		const minutes = Math.floor(diff % 60);

		if (hours === 0) return `${minutes}min left`;
		else return `${hours}hr ${minutes}min left`;
	};

	const updateData = () => {
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
				if (result.error == false) {
					setRefresh((prev) => !prev);
				} else if (result.error == true) {
					setMessage(`Something went wrong. ${result.message}`);
				}
			})
			.catch((error) => {
				console.error(error);
				setMessage('Something went wrong. Please try again later.');
			});
	};

	const deleteData = () => {
		setMessage('Deleting a todo.');
		setTimeout(() => {
			setMessage(null);
		}, 1000);
		const url = 'http://10.0.2.2:8080/todos';

		fetch(`${url}/${data.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		})
			.then((response) => response.json())
			.then((result) => {
				if (result.error == false) {
					// console.log(result);
					setRefresh((prev) => !prev);
				} else if (result.error == true) {
					setMessage(`Something went wrong. ${result.message}`);
					setTimeout(() => {
						setMessage(null);
					}, 2000);
				}
			})
			.catch((error) => {
				// console.error(error);
				setMessage('Something went wrong. Please try again later.');
				setTimeout(() => {
					setMessage(null);
				}, 2000);
			});
	};

	const handleComplete = () => {
		// console.log('Press complete.');
		updateData();
	};

	const handleDelete = () => {
		// console.log('Press delete.');
		deleteData();
	};

	const handleEdit = () => {
		// console.log('Press edit.');
		setModalVisible(!modalVisible);
	};

	useEffect(() => {
		const updateDueTime = () => {
			setTimeLeft(calculateTimeLeft(data.due_date));
		};
		updateDueTime();

		const intervalId = setInterval(updateDueTime, 60000);
		return () => clearInterval(intervalId);
	}, [refresh, timeLeft]);

	return (
		<View>
			<PopUpModal modalVisible={modalVisible} setModalVisible={setModalVisible} data={data} />
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
					<View style={theme === 'dark' ? styles.darkEditBtnContainer : styles.editBtnContainer}>
						<Pressable onPress={handleEdit}>
							<Feather name="edit" size={20} color={theme === 'dark' ? Colors.tertiary : Colors.brand} />
						</Pressable>
					</View>
					<Text style={styles.lightTime}>
						{data.due_date && formatDateLeft(data.due_date)}
						<Text style={styles.leftTime}>{`    ${calculateTimeLeft(data.due_date)}`}</Text>
					</Text>
				</Card.Content>
				<Pressable style={styles.deleteContainer} onPress={handleDelete}>
					<AntDesign name="delete" size={20} color={Colors.red} />
				</Pressable>
			</Card>
		</View>
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
	editBtnContainer: {
		width: 60,
		position: 'absolute',
		right: 10,
		top: 10,
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
		height: 35,
		opacity: 0.8,
		borderWidth: 1,
		borderRadius: 50,
		borderColor: Colors.brand,
	},
	darkEditBtnContainer: {
		width: 60,
		position: 'absolute',
		right: 10,
		top: 10,
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
		height: 35,
		opacity: 0.8,
		borderWidth: 1,
		borderRadius: 50,
		borderColor: Colors.tertiary,
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
		right: 10,
		bottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
		height: 35,
		opacity: 0.8,
		borderWidth: 1,
		borderRadius: 50,
		borderColor: Colors.red,
	},
	completedText: {
		color: Colors.darkLight,
		textDecorationLine: 'line-through',
	},
});

export default Task;
