import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Colors } from '../components/styles';
import { useAuth } from '../contexts/useAuth';
import { useTheme } from '../contexts/useTheme';
import Task from '../components/Task';
import Create from '../components/Create';

function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

const Todo = () => {
	const { currentUser, setCurrentUser } = useAuth();
	const { theme } = useTheme();
	const [taskList, setTaskList] = useState([]);
	const [todayTask, setTodayTask] = useState([]);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState('');
	const [refresh, setRefresh] = useState(false);

	const url = 'http://10.0.2.2:8080/todos';

	useEffect(() => {
		setCurrentUser(1);
	}, [setCurrentUser]);

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
					if (result !== null) {
						console.log(result);
						setTaskList(result.todos);

						const currentDate = new Date().toISOString().split('T')[0];
						const filteredTasks = result.todos.filter((todo) => {
							const taskDate = new Date(todo.due_date).toISOString().split('T')[0];
							return taskDate === currentDate;
						});
						setTodayTask(filteredTasks);
					} else {
						setMessage('You have no todos today, Add one below!');
					}
				})
				.catch((error) => {
					console.error(error);
					setError(error);
				});
		};
		if (currentUser !== null) {
			fetchData();
		}
	}, [message, refresh]);

	return (
		<View style={theme === 'dark' ? styles.darkTasksWrapper : styles.lightTasksWrapper}>
			<Create setRefresh={setRefresh} />
			<ScrollView style={theme === 'dark' ? styles.darkScroll : styles.lightScroll}>
				<View style={styles.items}>
					{todayTask ? (
						todayTask.map((data, index) => <Task key={index} data={data} setRefresh={setRefresh} />)
					) : (
						<Text>{message}</Text>
					)}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	lightTasksWrapper: {
		paddingHorizontal: 20,
		height: '100%',
		paddingBottom: 100,
		backgroundColor: Colors.primary,
	},
	darkTasksWrapper: {
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
});

export default Todo;
