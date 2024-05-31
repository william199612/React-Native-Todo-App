import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

import Task from '../components/Task';
import { useTheme } from '../contexts/useTheme';
import { useAuth } from '../contexts/useAuth';
import { Colors } from '../components/styles';

const CalendarScreen = () => {
	const { theme } = useTheme();
	const { currentUser } = useAuth();
	const [items, setItems] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
	const [refresh, setRefresh] = useState(false);
	const [message, setMessage] = useState('');

	useEffect(() => {
		const fetchData = () => {
			const url = 'http://10.0.2.2:8080/todos';
			fetch(`${url}/${currentUser}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			})
				.then((response) => response.json())
				.then((result) => {
					if (result.error !== false) {
						const filteredTasks = result.todos.filter((todo) => {
							const taskDate = new Date(todo.due_date).toISOString().split('T')[0];
							return taskDate === selectedDate;
						});
						setItems(filteredTasks);
					} else {
						setMessage(result.message);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		};
		fetchData();
	}, [selectedDate, refresh]);

	const handleDayPress = (date) => {
		setSelectedDate(date.dateString);
	};

	return (
		<View style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
			<Calendar
				theme={theme === 'dark' ? styles.darkCalendar : styles.calendar}
				onDayPress={handleDayPress}
				markedDates={{ [selectedDate]: { selected: true } }}
			/>
			<ScrollView style={styles.scrollContainer}>
				{items && items.map((data, index) => <Task key={index} data={data} setRefresh={setRefresh} />)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	lightContainer: {
		flex: 1,
		backgroundColor: Colors.primary,
	},
	darkContainer: {
		flex: 1,
		backgroundColor: Colors.tertiary,
	},
	calendar: {
		backgroundColor: Colors.secondary,
		calendarBackground: Colors.secondary,
		textSectionTitleColor: Colors.black,
		selectedDayBackgroundColor: Colors.brand,
		selectedDayTextColor: Colors.primary,
		todayTextColor: Colors.brand,
		dayTextColor: Colors.darkLight,
		textDisabledColor: Colors.secondary,
		dotColor: Colors.brand,
		selectedDotColor: Colors.black,
		monthTextColor: Colors.black,
	},
	darkCalendar: {
		backgroundColor: Colors.tertiary,
		calendarBackground: Colors.tertiary,
		textSectionTitleColor: Colors.primary,
		selectedDayBackgroundColor: Colors.brand,
		selectedDayTextColor: Colors.primary,
		todayTextColor: Colors.brand,
		dayTextColor: Colors.secondary,
		textDisabledColor: Colors.darkLight,
		dotColor: Colors.brand,
		selectedDotColor: Colors.primary,
		monthTextColor: Colors.primary,
	},
	scrollContainer: {
		flex: 1,
		height: '100%',
		paddingHorizontal: 30,
		marginTop: 10,
		marginBottom: 80,
	},
});

export default CalendarScreen;
