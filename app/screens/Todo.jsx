import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Colors } from '../components/styles';
import { useAuth } from '../contexts/useAuth';
import { useTheme } from '../contexts/useTheme';
import Task from '../components/Task';
import Create from '../components/Create';

const Todo = () => {
	const { currentUser } = useAuth();
	const { theme } = useTheme();
	const [todayTask, setTodayTask] = useState([]);
	const [message, setMessage] = useState(null);
	const [refresh, setRefresh] = useState(false);

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
					if (result.status === 200) {
						console.log(result);
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
					setMessage('An error has occurred, please try again later.');
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
					{todayTask.length != 0 ? (
						todayTask.map((data, index) => <Task key={index} data={data} setRefresh={setRefresh} />)
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
});

export default Todo;
