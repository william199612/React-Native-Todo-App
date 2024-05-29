import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { Colors } from '../components/styles';
import { useTheme } from '../contexts/useTheme';
import Task from '../components/Task';
import Create from '../components/Create';

const todos = {
	'2024-05-15': [
		{ description: 'Eat', dueTime: '10:00', isCompleted: false },
		{
			description: 'Event Event Event Event Event Event Event Event Event Event Event',
			dueTime: '10:01',
			isCompleted: true,
		},
		{ description: 'Eat sleep and netflix and chill', dueTime: '10:02', isCompleted: true },
		{ description: 'Event 2', dueTime: '10:03', isCompleted: true },
		{ description: 'Event 2', dueTime: '10:04', isCompleted: true },
		{ description: 'Event 2', dueTime: '10:05', isCompleted: true },
		{ description: 'Event 2', dueTime: '10:06', isCompleted: true },
		{ description: 'Event 2', dueTime: '10:07', isCompleted: true },
		{ description: 'Event 2', dueTime: '10:08', isCompleted: true },
	],
	'2024-05-16': [{ title: 'Event 3' }, { title: 'Event 4' }],
};

const Todo = () => {
	const { theme } = useTheme();
	const [task, setTask] = useState();
	const [taskList, setTaskList] = useState([]);

	const url = 'http://127.0.0.1:8080/todos';

	const fetchData = () => {
		fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	fetchData();

	return (
		<View style={theme === 'dark' ? styles.darkTasksWrapper : styles.lightTasksWrapper}>
			<Create task={task} setTask={setTask} taskList={taskList} setTaskList={setTaskList} />
			<ScrollView style={theme === 'dark' ? styles.darkScroll : styles.lightScroll}>
				<View style={styles.items}>
					{todos['2024-05-15'] && todos['2024-05-15'].map((data, index) => <Task index={index} data={data} />)}
					{/* {taskList.map((item, index) => {
						return <Task key={index} data={todos} />;
					})} */}
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
		marginTop: 100,
	},
});

export default Todo;
