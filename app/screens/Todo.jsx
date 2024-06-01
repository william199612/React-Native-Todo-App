import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Colors } from '../components/styles';
import { useAuth } from '../contexts/useAuth';
import { useTheme } from '../contexts/useTheme';
import Task from '../components/Task';
import Create from '../components/Create';

const Todo = () => {
	const { currentUser, setTasks, refresh } = useAuth();
	const { theme } = useTheme();
	const [todayTask, setTodayTask] = useState([]);
	const [message, setMessage] = useState(null);

	const url = 'http://10.0.2.2:8080/todos';

	useEffect(() => {
		const fetchData = () => {
			fetch(`${url}/${currentUser}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			})
				.then((response) => response.json())
				.then((result) => {
					if (result.error == false) {
						// console.log(result);
						setTasks(result.todos);
						const currentDate = new Date().toISOString().split('T')[0];
						const filteredTasks = result.todos.filter((todo) => {
							const taskDate = new Date(todo.due_date).toISOString().split('T')[0];
							return taskDate === currentDate;
						});
						setTodayTask(filteredTasks);
					}
				})
				.catch((error) => {
					console.error(error);
					setMessage('An error has occurred, please try again later.');
					setTimeout(() => {
						setMessage(null);
					}, 2000);
				});
		};
		if (currentUser !== null) {
			fetchData();
		}
	}, [refresh]);

	return (
		<View style={theme === 'dark' ? styles.darkTasksWrapper : styles.lightTasksWrapper}>
			{message && (
				<View style={styles.msgWrapper}>
					<Text style={theme === 'dark' ? styles.darkMsg : styles.msg}>{message}</Text>
				</View>
			)}
			<Create />
			<ScrollView style={theme === 'dark' ? styles.darkScroll : styles.lightScroll}>
				<View style={styles.items}>
					{todayTask.length != 0 ? (
						todayTask.map((data, index) => <Task key={index} data={data} setMessage={setMessage} />)
					) : (
						<View style={styles.msgContainer}>
							<Text style={theme === 'dark' ? styles.darkNoTaskMsg : styles.noTaskMsg}>
								You have no todos today, Add one below!
							</Text>
						</View>
					)}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	lightTasksWrapper: {
		position: 'relative',
		paddingHorizontal: 20,
		height: '100%',
		paddingBottom: 100,
		backgroundColor: Colors.primary,
	},
	darkTasksWrapper: {
		position: 'relative',
		paddingHorizontal: 20,
		height: '100%',
		paddingBottom: 100,
		backgroundColor: Colors.tertiary,
	},
	lightScroll: {
		paddingHorizontal: 10,
		backgroundColor: Colors.primary,
	},
	darkScroll: {
		paddingHorizontal: 10,
		backgroundColor: Colors.tertiary,
	},
	items: {
		marginTop: 20,
	},
	msgContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	noTaskMsg: {
		marginTop: 280,
		fontSize: 18,
	},
	darkNoTaskMsg: {
		marginTop: 280,
		fontSize: 18,
		color: Colors.primary,
	},
	msgWrapper: {
		position: 'absolute',
		top: 10,
		left: 50,
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	msg: {
		padding: 10,
		backgroundColor: Colors.secondary,
		color: Colors.brand,
		fontWeight: 'bold',
		borderRadius: 10,
		zIndex: 50,
	},
	darkMsg: {
		padding: 10,
		backgroundColor: Colors.secondary,
		color: Colors.brand,
		fontWeight: 'bold',
		borderRadius: 10,
		zIndex: 50,
	},
});

export default Todo;
