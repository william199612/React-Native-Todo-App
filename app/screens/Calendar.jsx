import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

import Task from '../components/Task';
import Create from '../components/Create';
import { useTheme } from '../contexts/useTheme';
import { useAuth } from '../contexts/useAuth';
import { Colors } from '../components/styles';

const CalendarScreen = () => {
	const { theme } = useTheme();
	const { tasks, refresh } = useAuth();
	const [items, setItems] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		const filteredTasks = tasks.filter((todo) => {
			const taskDate = new Date(todo.due_date).toISOString().split('T')[0];
			return taskDate == selectedDate;
		});
		setItems(filteredTasks);
	}, [tasks, selectedDate, refresh]);

	const handleDayPress = (date) => {
		// console.log(items);
		setSelectedDate(date.dateString);
	};

	return (
		<View style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
			<Calendar
				theme={theme === 'dark' ? styles.darkCalendar : styles.calendar}
				onDayPress={handleDayPress}
				markedDates={{ [selectedDate]: { selected: true } }}
			/>
			<Create />
			<ScrollView style={styles.scrollContainer}>
				{items.length != 0 ? (
					items.map((data, index) => <Task key={index} data={data} setMessage={setMessage} />)
				) : (
					<View style={styles.msgContainer}>
						<Text style={theme === 'dark' ? styles.darkNoTaskMsg : styles.noTaskMsg}>You have no todos today</Text>
					</View>
				)}
				{message && (
					<View style={styles.popUpContainer}>
						<Text style={theme === 'dark' ? styles.darkMsg : styles.msg}>{message}</Text>
					</View>
				)}
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
		textDisabledColor: Colors.darkLight,
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
	popUpContainer: {
		position: 'absolute',
		top: 0,
		left: 40,
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 10,
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
		backgroundColor: Colors.darkLight,
		color: Colors.brand,
		fontWeight: 'bold',
		borderRadius: 10,
		zIndex: 50,
	},
});

export default CalendarScreen;
