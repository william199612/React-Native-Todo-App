import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { Colors } from '../components/styles';

const Login = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [hidePassword, setHidePassword] = useState(true);
	const [message, setMessage] = useState('');

	const handleLogin = (setIsSubmitting) => {
		const url = 'http://localhost:8080/user/login';

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((response) => {
				setIsLoggedIn(true);
			})
			.catch((error) => {
				setMessage(error);
			});
		setIsSubmitting(false);
	};

	const handleSubmit = () => {
		navigation.navigate('Main');
	};

	const handleGoogleLogin = () => {
		console.log('Google login...');
	};

	return (
		<KeyboardAvoidingWrapper>
			<View style={styles.container}>
				<StatusBar style="dark" />
				<View style={styles.innerContainer}>
					<Feather name="check-circle" size={150} color={Colors.brand} />
					<Text style={styles.pageTitle}>JustDo</Text>
					<Text style={styles.subTitle}>Login</Text>

					<View style={styles.formArea}>
						{message !== null && <Text style={styles.msgBox}>{message}</Text>}
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
							onBlur={() => {}}
							value={password}
							secureTextEntry={hidePassword}
							isPassword={true}
							hidePassword={hidePassword}
							setHidePassword={setHidePassword}
						/>

						<View style={styles.line}></View>

						{!isSubmitting ? (
							<Pressable style={styles.button} onPress={handleSubmit}>
								<Text style={styles.buttonText}>Login</Text>
							</Pressable>
						) : (
							<Pressable style={styles.button} disable={true}>
								<ActivityIndicator size="large" color={Colors.primary} />
							</Pressable>
						)}

						{/* <Pressable style={styles.googleBtn} onPress={handleGoogleLogin}>
							<View style={styles.gWrapper}>
								<Fontisto name="google" color={Colors.primary} size={25} />
								<Text style={styles.googleBtnText}>Sign in with Google</Text>
							</View>
						</Pressable> */}
						<View style={styles.extraView}>
							<Text style={styles.extraText}>Don't have an account? </Text>
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
		marginBottom: 10,
		height: 50,
	},
	buttonText: {
		color: Colors.primary,
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
	textLink: {
		justifyContent: 'center',
		alignItems: Colors.center,
	},
	textLinkContent: {
		color: Colors.brand,
		fontSize: 15,
	},
	line: {
		height: 1,
		width: 100,
		backgroundColor: Colors.darkLight,
		marginVertical: 40,
		alignSelf: 'center',
	},
});

export default Login;
