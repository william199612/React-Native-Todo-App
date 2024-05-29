import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

import Task from '../components/Task';
import { useTheme } from '../contexts/useTheme';
import { Colors } from '../components/styles';

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
	'2024-05-16': [{ description: 'Event 3' }, { description: 'Event 4' }],
};

const CalendarScreen = () => {
	const { theme } = useTheme();
	const [items, setItems] = useState(todos);
	const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

	useEffect(() => {
		setItems(todos);
	}, [todos]);

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
				{items[selectedDate] && items[selectedDate].map((data, index) => <Task key={index} data={data} />)}
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
		todayTextColor: Colors.primary,
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
