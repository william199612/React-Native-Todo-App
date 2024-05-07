import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons';
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
	ExtraView,
	ExtraText,
	TextLink,
	TextLinkContent,
} from '../components/styles';

const Signup = ({ navigation }) => {
	const [hidePassword, setHidePassword] = useState(true);
	const [show, setShow] = useState(false);
	const [date, setDate] = useState(new Date());

	const [birth, setBirth] = useState();

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
			<StyledContainer signup={true}>
				<StatusBar style="dark" />
				<InnerContainer>
					<PageTitle>JustDo</PageTitle>
					<SubTitle>Account Signup</SubTitle>

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

					<Formik
						initialValues={{ fullName: '', email: '', dateOfBirth: '', password: '', confirmPassword: '' }}
						onSubmit={(values) => {
							console.log(values);
						}}
					>
						{({ handleChange, handleBlur, handleSubmit, values }) => (
							<StyledFormArea>
								<MsgBox>...</MsgBox>
								<LoginTextInput
									label="Full Name"
									icon="person"
									placeholder="Enter your name..."
									placeholderTextColor={Colors.darkLight}
									onChangeText={handleChange('fullName')}
									onBlur={handleBlur('fullName')}
									value={values.fullName}
								/>
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
									label="Date of Birth"
									icon="calendar"
									placeholder="YYYY-MM-DD"
									placeholderTextColor={Colors.darkLight}
									onChangeText={handleChange('birth')}
									onBlur={handleBlur('birth')}
									value={birth ? birth.toDateString() : ''}
									isDate={true}
									editable={false}
									showDatePicker={showDatePicker}
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

								<LoginTextInput
									label="Confirm Password"
									icon="lock"
									placeholder="Enter again..."
									placeholderTextColor={Colors.darkLight}
									onChangeText={handleChange('confirmPassword')}
									onBlur={handleBlur('confirmPassword')}
									value={values.confirmPassword}
									secureTextEntry={hidePassword}
									isPassword={true}
									hidePassword={hidePassword}
									setHidePassword={setHidePassword}
								/>

								<StyledButton onSubmit={handleSubmit}>
									<ButtonText>Signup</ButtonText>
								</StyledButton>
								<ExtraView>
									<ExtraText>Already have an account? </ExtraText>
									<TextLink onPress={() => navigation.navigate('Login')}>
										<TextLinkContent>Login</TextLinkContent>
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
			<LeftIcon>
				<Octicons name={icon} size={30} color={Colors.brand} />
			</LeftIcon>
			<StyledInputLabel>{label}</StyledInputLabel>
			{!isDate && <StyledTextInput {...props} />}
			{isDate && (
				<TouchableOpacity onPress={showDatePicker}>
					<StyledTextInput {...props} />
				</TouchableOpacity>
			)}
			{isPassword && (
				<RightIcon onPress={() => setHidePassword(!hidePassword)}>
					<Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={Colors.darkLight} />
				</RightIcon>
			)}
		</View>
	);
};

export default Signup;
