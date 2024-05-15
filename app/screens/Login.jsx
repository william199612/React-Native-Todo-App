import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Feather, Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import {
	Colors,
	StyledContainer,
	InnerContainer,
	PageTitle,
	SubTitle,
	StyledFormArea,
	StyledTextInput,
	StyledInputLabel,
	LeftIcon,
	RightIcon,
	StyledButton,
	ButtonText,
	MsgBox,
	Line,
	ExtraView,
	ExtraText,
	TextLink,
	TextLinkContent,
} from '../components/styles';

const Login = ({ navigation }) => {
	const [hidePassword, setHidePassword] = useState(true);
	const [message, setMessage] = useState('');

	const handleLogin = (credentials, setSubmitting) => {
		const url = 'http://localhost:8080/user/login';

		fetch(url, credentials)
			.then((response) => {
				navigation.navigate('Todo');
			})
			.catch((error) => {
				setMessage(error);
			});
		setSubmitting(false);
	};

	return (
		<KeyboardAvoidingWrapper>
			<StyledContainer>
				<StatusBar style="dark" />
				<InnerContainer>
					<Feather name="check-circle" size={150} color={Colors.brand} />
					<PageTitle>JustDo</PageTitle>
					<SubTitle>Login</SubTitle>

					<Formik
						initialValues={{ email: '', password: '' }}
						validator={() => ({})}
						onSubmit={(values, { setSubmitting }) => {
							console.log(values);
							console.log('Submit form, navigating to main stack...');
							if (values.email == '' || values.password == '') {
								setMessage('Please fill all the fields.');
								setSubmitting(false, setSubmitting);
							} else {
								handleLogin(values);
							}
							navigation.navigate('Home');
						}}
					>
						{({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
							<StyledFormArea>
								{message !== null && <MsgBox>{message}</MsgBox>}
								<LoginTextInput
									label="Email Address"
									icon="mail"
									placeholder="Enter your email..."
									placeholderTextColor={Colors.darkLight}
									onChangeText={handleChange('email')}
									onBlur={handleBlur('email')}
									value={values.email}
									keyboardType="email-address"
								/>
								<LoginTextInput
									label="Password"
									icon="lock"
									placeholder="Enter your password..."
									placeholderTextColor={Colors.darkLight}
									onChangeText={handleChange('password')}
									onBlur={handleBlur('password')}
									value={values.password}
									secureTextEntry={hidePassword}
									isPassword={true}
									hidePassword={hidePassword}
									setHidePassword={setHidePassword}
								/>

								{!isSubmitting ? (
									<StyledButton onSubmit={handleSubmit}>
										<ButtonText>Login</ButtonText>
									</StyledButton>
								) : (
									<StyledButton disabled={true}>
										<ActivityIndicator size="large" color={Colors.primary} />
									</StyledButton>
								)}

								<Line />
								<StyledButton google={true} onSubmit={handleSubmit}>
									<Fontisto name="google" color={Colors.primary} size={25} />
									<ButtonText google={true}>Sign in with Google</ButtonText>
								</StyledButton>
								<ExtraView>
									<ExtraText>Don't have an account? </ExtraText>
									<TextLink onPress={() => navigation.navigate('Signup')}>
										<TextLinkContent>Sign up</TextLinkContent>
									</TextLink>
								</ExtraView>
							</StyledFormArea>
						)}
					</Formik>
				</InnerContainer>
			</StyledContainer>
		</KeyboardAvoidingWrapper>
	);
};

const LoginTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
	return (
		<View>
			<LeftIcon>
				<Octicons name={icon} size={30} color={Colors.brand} />
			</LeftIcon>
			<StyledInputLabel>{label}</StyledInputLabel>
			<StyledTextInput {...props} />
			{isPassword && (
				<RightIcon onPress={() => setHidePassword(!hidePassword)}>
					<Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={Colors.darkLight} />
				</RightIcon>
			)}
		</View>
	);
};

export default Login;