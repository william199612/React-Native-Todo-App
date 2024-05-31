import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

import Task from '../components/Task';
import { useTheme } from '../contexts/useTheme';
import { useAuth } from '../contexts/useAuth';
import { Colors } from '../components/styles';

const CalendarScreen = () => {
	const { theme } = useTheme();
	const { currentUser } = useAuth();
	const [items, setItems] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
	const [refresh, setRefresh] = useState(false);
	const [message, setMessage] = useState(null);

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
					if (result.status === 200) {
						console.log(result);
						const filteredTasks = result.todos.filter((todo) => {
							const taskDate = new Date(todo.due_date).toISOString().split('T')[0];
							return taskDate == selectedDate;
						});
						setItems(filteredTasks);
					} else {
						console.error(result.message);
						setMessage('Something went wrong, try again later.');
						setTimeout(() => {
							setMessage(null);
						}, 2000);
					}
				})
				.catch((error) => {
					console.error(error);
					setMessage('Something went wrong, try again later.');
					setTimeout(() => {
						setMessage(null);
					}, 2000);
				});
		};
		fetchData();
	}, [refresh]);

	useEffect(() => {
		const filteredTasks = items.filter((todo) => {
			const taskDate = new Date(todo.due_date).toISOString().split('T')[0];
			return taskDate === selectedDate;
		});
		setSelectedItems(filteredTasks);
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
				{selectedItems.length != 0 ? (
					selectedItems.map((data, index) => <Task key={index} data={data} setRefresh={setRefresh} />)
				) : (
					<View style={styles.msgContainer}>
						<Text style={theme === 'dark' ? styles.darkNoTaskMsg : styles.noTaskMsg}>You have no todos today</Text>
					</View>
				)}
				{message && <Text style={theme === 'dark' ? styles.darkMsg : styles.msg}>{message}</Text>}
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
	msgContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	noTaskMsg: {
		marginTop: 150,
		fontSize: 18,
	},
	darkNoTaskMsg: {
		marginTop: 150,
		fontSize: 18,
		color: Colors.primary,
	},
	msg: {
		fontSize: 14,
		fontWeight: 'bold',
		textAlign: 'center',
		color: Colors.tertiary,
		padding: 10,
		marginBottom: 20,
		position: 'absolute',
		bottom: 140,
		left: 160,
	},
	darkMsg: {
		fontSize: 14,
		fontWeight: 'bold',
		textAlign: 'center',
		color: Colors.primary,
		padding: 10,
		marginBottom: 20,
		position: 'absolute',
		bottom: 140,
		left: 160,
	},
});

export default CalendarScreen;
