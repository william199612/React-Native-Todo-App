import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { Colors } from '../components/styles';

const StatusBarHeight = Constants.statusBarHeight;

const Signup = ({ navigation }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [birth, setBirth] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [hidePassword, setHidePassword] = useState(true);
	const [show, setShow] = useState(false);
	const [date, setDate] = useState(new Date());
	const [message, setMessage] = useState('');

	const handleSubmit = () => {
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
			return;
		}

		const url = 'http://localhost:8080/user/register';

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				birth,
				password,
			}),
		})
			.then((response) => {
				setIsLoggedIn(true);
			})
			.catch((error) => {
				setMessage(error);
			});
	};

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(false);
		setDate(currentDate);
		setBirth(currentDate);
	};

	const showDatePicker = () => {
		setShow(true);
	};

	return (
		<KeyboardAvoidingWrapper>
			<View style={styles.container}>
				<StatusBar style="dark" />
				<View style={styles.innerContainer}>
					<Text style={styles.pageTitle}>JustDo</Text>
					<Text style={styles.subTitle}>Account Signup</Text>

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
							{message !== null && <Text style={styles.msgBox}>{message}</Text>}
							<LoginTextInput
								label="Full Name"
								icon="person"
								placeholder="Enter your name..."
								placeholderTextColor={Colors.darkLight}
								onChangeText={setName}
								value={email}
								keyboardType="email-address"
							/>
							<LoginTextInput
								label="Email Address"
								icon="mail"
								placeholder="Enter your email..."
								placeholderTextColor={Colors.darkLight}
								onChangeText={setEmail}
								value={email}
								keyboardType="email-address"
							/>
							<LoginTextInput
								label="Date of Birth"
								icon="calendar"
								placeholder="YYYY-MM-DD"
								placeholderTextColor={Colors.darkLight}
								onChangeText={setBirth}
								value={birth}
								isDate={true}
								editable={false}
								showDatePicker={showDatePicker}
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
							/>

							<Pressable style={styles.button} onSubmit={handleSubmit}>
								<Text style={styles.buttonText}>Signup</Text>
							</Pressable>
							<View style={styles.extraView}>
								<Text style={styles.extraText}>Already have an account? </Text>
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
	...props
}) => {
	return (
		<View>
			<View style={styles.leftIcon}>
				<Octicons name={icon} size={30} color={Colors.brand} />
			</View>
			<Text style={styles.inputLabel}>{label}</Text>
			{!isDate && <TextInput style={styles.textInput} {...props} />}
			{isDate && (
				<Pressable onPress={showDatePicker}>
					<TextInput style={styles.textInput} {...props} />
				</Pressable>
			)}
			{isPassword && (
				<View style={styles.rightIcon} onPress={() => setHidePassword(!hidePassword)}>
					<Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={Colors.darkLight} />
				</View>
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
		paddingTop: 100,
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
		fontSize: 18,
	},
	darkButtonText: {
		color: Colors.brand,
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
