import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons, Ionicons } from '@expo/vector-icons';

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { Colors } from '../components/styles';
import { useAuth } from '../contexts/useAuth';
import { useTheme } from '../contexts/useTheme';

const Login = ({ navigation }) => {
	const { setIsLoggedIn, currentUser, setCurrentUser } = useAuth();
	const { theme } = useTheme();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [hidePassword, setHidePassword] = useState(true);
	const [message, setMessage] = useState('');

	const fetchData = () => {
		const url = 'http://localhost:8080/users/login';

		setIsSubmitting(true);

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				if (result.error === false) {
					setMessage('Login successfully! Redirecting to home page.');
					setTimeout(() => {
						setMessage('');
						setCurrentUser(result.user.id);
						setIsSubmitting(false);
						setIsLoggedIn(true);
					}, 1000);
				} else {
					setMessage(result.message);
					setIsSubmitting(false);
					setTimeout(() => {
						setMessage('');
					}, 3000);
				}
			})
			.catch((error) => {
				console.error('Fetch error:', error);
				setMessage('An error occurred. Please try again.');
				setTimeout(() => {
					setIsSubmitting(false);
					setMessage('');
				}, 3000);
			});
	};

	const handleSubmit = () => {
		console.log('Submitting...');
		fetchData();
	};

	// const handleGoogleLogin = () => {
	// 	console.log('Google login...');
	// };

	return (
		<KeyboardAvoidingWrapper>
			<View style={theme === 'dark' ? styles.darkContainer : styles.container}>
				<StatusBar style="dark" />
				<View style={styles.innerContainer}>
					<Feather name="check-circle" size={150} color={Colors.brand} />
					<Text style={styles.pageTitle}>JustDo</Text>
					<Text style={theme === 'dark' ? styles.darkSubTitle : styles.subTitle}>Login</Text>

					<View style={styles.formArea}>
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
						{message !== '' && <Text style={styles.msgBox}>{message}</Text>}
						{!isSubmitting ? (
							<Pressable style={theme === 'dark' ? styles.darkButton : styles.button} onPress={handleSubmit}>
								<Text style={theme === 'dark' ? styles.darkButtonText : styles.buttonText}>Login</Text>
							</Pressable>
						) : (
							<Pressable style={theme === 'dark' ? styles.darkButton : styles.button} disable={true}>
								<ActivityIndicator size="large" color={theme === 'dark' ? Colors.brand : Colors.primary} />
							</Pressable>
						)}
						{/* TODO: add google login */}
						{/* <Pressable style={styles.googleBtn} onPress={handleGoogleLogin}>
							<View style={styles.gWrapper}>
								<Fontisto name="google" color={Colors.primary} size={25} />
								<Text style={styles.googleBtnText}>Sign in with Google</Text>
							</View>
						</Pressable> */}
						<View style={styles.extraView}>
							<Text style={theme === 'dark' ? styles.darkExtraText : styles.extraText}>Don't have an account? </Text>
							<Pressable style={styles.textLink} onPress={() => navigation.navigate('Signup')}>
								<Text style={styles.textLinkContent}>Sign up</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</View>
		</KeyboardAvoidingWrapper>
	);
};

const LoginTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
	return (
		<View>
			<View style={styles.leftIcon}>
				<Octicons name={icon} size={30} color={Colors.brand} />
			</View>
			<Text style={styles.inputLabel}>{label}</Text>
			<TextInput style={styles.textInput} {...props} />
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
		padding: 25,
		paddingTop: 100,
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
		marginVertical: 10,
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
		top: 30,
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
	googleBtn: {
		backgroundColor: Colors.green,
		flexDirection: 'col',
		justifyContent: 'center',
		borderRadius: 5,
		height: 50,
	},
	gWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	googleBtnText: {
		color: Colors.primary,
		fontSize: 18,
		paddingLeft: 20,
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

export default Login;
