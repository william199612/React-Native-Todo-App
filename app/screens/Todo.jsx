import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { Colors } from '../components/styles';
import Task from '../components/Task';
import Create from '../components/Create';

const Todo = () => {
	const [task, setTask] = useState();
	const [taskList, setTaskList] = useState([]);

	return (
		<View style={styles.tasksWrapper}>
			<Create task={task} setTask={setTask} taskList={taskList} setTaskList={setTaskList} />
			<ScrollView>
				<View style={styles.items}>
					{taskList.map((item, index) => {
						return <Task key={index} text={item} />;
					})}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	tasksWrapper: {
		paddingHorizontal: 20,
	},
	items: {
		marginTop: 100,
	},
});

export default Todo;
