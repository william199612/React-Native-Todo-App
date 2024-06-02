import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Octicons, Ionicons } from '@expo/vector-icons';

import { useTheme } from '../contexts/useTheme';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { Colors } from '../components/styles';

const Signup = ({ navigation }) => {
	const { theme } = useTheme();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [date, setDate] = useState(new Date());
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [hidePassword, setHidePassword] = useState(true);
	const [show, setShow] = useState(false);
	const [message, setMessage] = useState(null);

	const dateConvertor = (date) => {
		const dateString = new Date(date).toDateString();
		const parsedDate = new Date(dateString);
		const isoString = parsedDate.toISOString();
		return isoString.replace('T', ' ').replace('Z', '');
	};

	const handleSubmit = () => {
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
			setTimeout(() => {
				setMessage(null);
			}, 1500);
			return;
		}

		if (name === '' || email === '' || date === '' || password === '') {
			setMessage('All fiends are required.');
			setTimeout(() => {
				setMessage(null);
			}, 1500);
			return;
		}

		const url = 'http://10.0.2.2:8080/users/register';

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				birth: dateConvertor(date),
				password,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				if (result.error == false) {
					setMessage('Signup successfully! Redirecting to Login page.');
					setTimeout(() => {
						navigation.navigate('Login');
					}, 1000);
				} else if (result.error == true) {
					// console.error('Server error:', result.error);
					setMessage(result.message);
					setTimeout(() => {
						setMessage(null);
					}, 1500);
				}
			})
			.catch((error) => {
				// console.error('Fetch error:', error);
				setMessage('An error occurred. Please try again.');
				setTimeout(() => {
					setMessage(null);
				}, 1500);
			});
	};

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(false);
		// console.log(currentDate);
		setDate(currentDate);
	};

	const showDatePicker = () => {
		setShow(true);
	};

	return (
		<KeyboardAvoidingWrapper>
			<View style={theme === 'dark' ? styles.darkContainer : styles.container}>
				<StatusBar style={theme} />
				<View style={styles.innerContainer}>
					<Text style={styles.pageTitle}>JustDo</Text>
					<Text style={theme === 'dark' ? styles.darkSubTitle : styles.subTitle}>Account Signup</Text>

					{show && (
						<DateTimePicker
							testID="dateTimePicker"
							value={date}
							mode="date"
							is24Hour={true}
							display="default"
							onChange={onChange}
						/>
					)}

					<View style={styles.innerContainer}>
						<View style={styles.formArea}>
							<LoginTextInput
								label="Full Name"
								icon="person"
								placeholder="Enter your name..."
								placeholderTextColor={Colors.darkLight}
								onChangeText={setName}
								value={name}
								theme={theme}
							/>
							<LoginTextInput
								label="Email Address"
								icon="mail"
								placeholder="Enter your email..."
								placeholderTextColor={Colors.darkLight}
								onChangeText={setEmail}
								value={email}
								keyboardType="email-address"
								theme={theme}
							/>
							<LoginTextInput
								label="Date of Birth"
								icon="calendar"
								placeholder="YYYY-MM-DD"
								placeholderTextColor={Colors.darkLight}
								onChangeText={setDate}
								value={date.toDateString()}
								isDate={true}
								editable={false}
								showDatePicker={showDatePicker}
								theme={theme}
							/>
							<LoginTextInput
								label="Password"
								icon="lock"
								placeholder="Enter your password..."
								placeholderTextColor={Colors.darkLight}
								onChangeText={setPassword}
								value={password}
								secureTextEntry={hidePassword}
								isPassword={true}
								hidePassword={hidePassword}
								setHidePassword={setHidePassword}
								theme={theme}
							/>

							<LoginTextInput
								label="Confirm Password"
								icon="lock"
								placeholder="Enter again..."
								placeholderTextColor={Colors.darkLight}
								onChangeText={setConfirmPassword}
								value={confirmPassword}
								secureTextEntry={hidePassword}
								isPassword={true}
								hidePassword={hidePassword}
								setHidePassword={setHidePassword}
								theme={theme}
							/>
							{message !== null && <Text style={theme === 'dark' ? styles.darkMsgBox : styles.msgBox}>{message}</Text>}
							<Pressable style={theme === 'dark' ? styles.darkButton : styles.button} onPress={handleSubmit}>
								<Text style={theme === 'dark' ? styles.darkButtonText : styles.buttonText}>Signup</Text>
							</Pressable>
							<View style={styles.extraView}>
								<Text style={theme === 'dark' ? styles.darkExtraText : styles.extraText}>
									Already have an account?{' '}
								</Text>
								<Pressable style={styles.textLink} onPress={() => navigation.navigate('Login')}>
									<Text style={styles.textLinkContent}>Login</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</View>
			</View>
		</KeyboardAvoidingWrapper>
	);
};

const LoginTextInput = ({
	label,
	icon,
	isPassword,
	hidePassword,
	setHidePassword,
	isDate,
	showDatePicker,
	theme,
	...props
}) => {
	return (
		<View>
			<View style={styles.leftIcon}>
				<Octicons name={icon} size={30} color={Colors.brand} />
			</View>
			<Text style={theme === 'dark' ? styles.darkInputLabel : styles.inputLabel}>{label}</Text>
			{!isDate && <TextInput style={styles.textInput} {...props} />}
			{isDate && (
				<Pressable onPress={showDatePicker}>
					<TextInput style={styles.textInput} {...props} />
				</Pressable>
			)}
			{isPassword && (
				<Pressable style={styles.rightIcon} onPress={() => setHidePassword(!hidePassword)}>
					<Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={Colors.darkLight} />
				</Pressable>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingTop: 80,
		backgroundColor: Colors.primary,
	},
	darkContainer: {
		flex: 1,
		padding: 25,
		paddingTop: 80,
		backgroundColor: Colors.tertiary,
	},
	innerContainer: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
	},
	pageTitle: {
		fontSize: 30,
		textAlign: 'center',
		fontWeight: 'bold',
		color: Colors.brand,
		padding: 10,
	},
	subTitle: {
		fontSize: 20,
		marginTop: 15,
		marginBottom: 20,
		letterSpacing: 1,
		fontWeight: 'bold',
		color: Colors.tertiary,
	},
	darkSubTitle: {
		fontSize: 20,
		marginTop: 15,
		marginBottom: 20,
		letterSpacing: 1,
		fontWeight: 'bold',
		color: Colors.primary,
	},
	formArea: {
		width: '90%',
	},
	msgBox: {
		textAlign: 'center',
		fontSize: 14,
	},
	darkMsgBox: {
		textAlign: 'center',
		fontSize: 14,
		color: Colors.primary,
	},
	leftIcon: {
		left: 15,
		top: 35,
		position: 'absolute',
		zIndex: 1,
	},
	rightIcon: {
		right: 15,
		top: 35,
		position: 'absolute',
		zIndex: 1,
	},
	inputLabel: {
		color: Colors.tertiary,
		fontSize: 13,
		textAlign: 'left',
		paddingLeft: 5,
	},
	darkInputLabel: {
		color: Colors.secondary,
		fontSize: 13,
		textAlign: 'left',
		paddingLeft: 5,
	},
	textInput: {
		backgroundColor: Colors.secondary,
		paddingVertical: 15,
		paddingLeft: 55,
		paddingRight: 30,
		borderRadius: 5,
		fontSize: 16,
		marginVertical: 3,
		marginBottom: 10,
		color: Colors.tertiary,
	},
	button: {
		padding: 10,
		backgroundColor: Colors.brand,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginTop: 20,
		marginBottom: 10,
		height: 50,
	},
	darkButton: {
		padding: 10,
		backgroundColor: Colors.secondary,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginBottom: 10,
		height: 50,
	},
	buttonText: {
		color: Colors.primary,
		fontWeight: 'bold',
		fontSize: 18,
	},
	darkButtonText: {
		color: Colors.brand,
		fontWeight: 'bold',
		fontSize: 18,
	},
	extraView: {
		justifyContent: 'center',
		flexDirection: 'row',
		padding: 10,
	},
	extraText: {
		justifyContent: 'center',
		alignContent: 'center',
		color: Colors.tertiary,
		fontSize: 15,
	},
	darkExtraText: {
		justifyContent: 'center',
		alignContent: 'center',
		color: Colors.primary,
		fontSize: 15,
	},
	textLink: {
		justifyContent: 'center',
	},
	textLinkContent: {
		color: Colors.brand,
		fontWeight: 'bold',
		fontSize: 15,
	},
});

export default Signup;
