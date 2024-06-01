import React, { useState } from 'react';
import { Modal, Pressable, Text, TextInput, View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from './styles';
import { useTheme } from '../contexts/useTheme';
import { useAuth } from '../contexts/useAuth';

const AddButton = ({ setModalVisible }) => {
	return (
		<View>
			<Pressable onPress={() => setModalVisible(true)}>
				<FontAwesome5 style={styles.icon} name="plus" size={30} color={Colors.primary} />
			</Pressable>
		</View>
	);
};

const CreateModal = ({ modalVisible, setModalVisible }) => {
	const { theme } = useTheme();
	const { currentUser, setRefresh } = useAuth();
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const [task, setTask] = useState('');
	const [showDate, setShowDate] = useState(false);
	const [showTime, setShowTime] = useState(false);
	const [message, setMessage] = useState(null);

	const showDatePicker = () => {
		setShowDate(true);
	};

	const showTimePicker = () => {
		setShowTime(true);
	};

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowDate(false);
		setDate(currentDate);
	};

	const onChangeTime = (event, selectedTime) => {
		const currentTime = selectedTime || time;
		setShowTime(false);
		setTime(currentTime);
	};

	const handleSubmit = () => {
		const url = 'http://10.0.2.2:8080/todos';

		console.log(task, date, time);

		const convertedDate = dateConvertor();

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				description: task,
				due_date: convertedDate,
				user_id: currentUser,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				if (result.error == false) {
					setMessage('Created a todo!');
					setTimeout(() => {
						setMessage(null);
						setModalVisible(false);
						setRefresh((prev) => !prev);
					}, 1000);
				} else {
					console.error('Server error:', result.error);
					setMessage('An error occurred. Please try again.');
					setTimeout(() => {
						setMessage(null);
					}, 3000);
				}
			})
			.catch((error) => {
				console.error('Fetch error:', error);
				setMessage('An error occurred. Please try again.');
				setTimeout(() => {
					setMessage(null);
				}, 3000);
			});
	};

	const dateConvertor = () => {
		const dateObj = new Date(date);
		const timeObj = new Date(time);

		const year = dateObj.getFullYear();
		const month = String(dateObj.getMonth() + 1).padStart(2, '0');
		const day = String(dateObj.getDate()).padStart(2, '0');

		const hours = String(timeObj.getHours()).padStart(2, '0');
		const minutes = String(timeObj.getMinutes()).padStart(2, '0');
		const seconds = String(timeObj.getSeconds()).padStart(2, '0');

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(false);
			}}
		>
			{modalVisible && <View style={styles.overlayBackground} />}
			{showDate && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode="date"
					is24Hour={true}
					display="spinner"
					onChange={onChange}
				/>
			)}
			{showTime && (
				<DateTimePicker
					testID="dateTimePicker"
					value={time}
					mode="time"
					is24Hour={true}
					display="spinner"
					onChange={onChangeTime}
				/>
			)}
			{message && (
				<View style={styles.msgContainer}>
					<Text style={theme === 'dark' ? styles.darkMsg : styles.msg}>{message}</Text>
				</View>
			)}
			<View style={theme === 'dark' ? styles.darkModalView : styles.modalView}>
				<Text style={theme === 'dark' ? styles.darkTitle : styles.title}>New Todo</Text>
				<View style={styles.modalContainer}>
					<Text style={theme === 'dark' ? styles.darkSubtitle : styles.subtitle}>What to do?</Text>
					<TextInput style={styles.textInput} placeholder="Go to gym" value={task} onChangeText={setTask} />
					<Text style={theme === 'dark' ? styles.darkSubtitle : styles.subtitle}>Date?</Text>
					<Pressable onPress={showDatePicker}>
						<TextInput
							style={styles.textInput}
							placeholder="Pick a date"
							value={date.toDateString()}
							editable={false}
							pointerEvents="none"
						/>
					</Pressable>
					<Text style={theme === 'dark' ? styles.darkSubtitle : styles.subtitle}>Time?</Text>
					<Pressable onPress={showTimePicker}>
						<TextInput
							style={styles.textInput}
							placeholder="Pick a date"
							value={time.toTimeString()}
							editable={false}
							pointerEvents="none"
						/>
					</Pressable>
					<View style={styles.centerView}>
						<Pressable style={theme === 'dark' ? styles.darkSubmitButton : styles.submitButton} onPress={handleSubmit}>
							<Text style={theme === 'dark' ? styles.darkButtonText : styles.buttonText}>Create</Text>
						</Pressable>
					</View>
				</View>
				<Pressable style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
					<AntDesign name="close" size={30} color={theme === 'dark' ? Colors.primary : Colors.black} />
				</Pressable>
			</View>
		</Modal>
	);
};

const Create = () => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View style={styles.container}>
			<AddButton setModalVisible={setModalVisible} />
			<CreateModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 110,
		right: 30,
		width: 60,
		height: 60,
		borderRadius: 50,
		backgroundColor: Colors.brand,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 10,
	},
	overlayBackground: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		zIndex: 15,
	},
	icon: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		position: 'absolute',
		top: 200,
		left: 40,
		width: '80%',
		height: 380,
		backgroundColor: Colors.primary,
		borderRadius: 20,
		padding: 20,
		shadowColor: Colors.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		zIndex: 20,
	},
	darkModalView: {
		position: 'absolute',
		top: 200,
		left: 40,
		width: '80%',
		height: 380,
		backgroundColor: Colors.brand,
		borderRadius: 20,
		padding: 20,
		elevation: 5,
		zIndex: 20,
	},
	modalContainer: {
		paddingVertical: 20,
	},
	title: {
		position: 'absolute',
		top: 15,
		left: 20,
		fontSize: 22,
		fontWeight: 'bold',
	},
	darkTitle: {
		position: 'absolute',
		top: 15,
		left: 20,
		fontSize: 22,
		fontWeight: 'bold',
		color: Colors.primary,
	},
	subtitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 20,
	},
	darkSubtitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 20,
		color: Colors.primary,
	},
	textInput: {
		color: Colors.black,
		borderBottomWidth: 1,
		borderBottomColor: Colors.darkLight,
		paddingVertical: 5,
	},
	centerView: {
		alignItems: 'center',
	},
	submitButton: {
		width: '80%',
		height: 50,
		backgroundColor: Colors.brand,
		borderRadius: 5,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	darkSubmitButton: {
		width: '80%',
		height: 50,
		backgroundColor: Colors.primary,
		borderRadius: 5,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.primary,
	},
	darkButtonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.brand,
	},
	closeButton: {
		position: 'absolute',
		top: 10,
		right: 10,
		width: 40,
		height: 40,
		borderRadius: 50,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 10,
	},
	msgContainer: {
		position: 'absolute',
		top: 150,
		left: 40,
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
		backgroundColor: Colors.darkLight,
		color: Colors.brand,
		fontWeight: 'bold',
		borderRadius: 10,
		zIndex: 50,
	},
});

export default Create;
