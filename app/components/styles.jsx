import styled from 'styled-components';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

// colors
export const Colors = {
	primary: '#ffffff',
	secondary: '#E5E7EB',
	tertiary: '#1F2937',
	darkLight: '#9CA3AF',
	brand: '#346ec9',
	green: '#10B981',
	red: '#EF4444',
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export const StyledContainer = styled.View`
	flex: 1;
	padding: 25px;
	padding-top: ${StatusBarHeight + 45}px;
	background-color: ${primary};

	${(props) =>
		props.signup &&
		`
		padding-top: ${StatusBarHeight + 20}px;
  `}
`;

export const InnerContainer = styled.View`
	flex: 1;
	width: 100%;
	align-items: center;
`;

export const SettingsContainer = styled(InnerContainer)`
	padding: 25px;
	padding-top: 50px;
`;

export const PageTitle = styled.Text`
	font-size: 30px;
	font-style: italic;
	text-align: center;
	font-weight: bold;
	color: ${brand};
	padding: 10px;

	${(props) =>
		props.settings &&
		`
		text-align: left;
    font-style: normal;
    font-size: 25px;
  `}
`;

export const SubTitle = styled.Text`
	font-size: 20px;
	margin-top: 15px;
	margin-bottom: 20px;
	letter-spacing: 1px;
	font-weight: bold;
	color: ${tertiary};

	${(props) =>
		props.welcome &&
		`
    margin-bottom: 5px;
    font-weight: normal;
  `}
`;

export const StyledFormArea = styled.View`
	width: 90%;
`;

export const StyledTextInput = styled.TextInput`
	background-color: ${secondary};
	padding: 15px 55px 15px 55px;
	border-radius: 20px;
	font-size: 16px;
	margin-vertical: 3px;
	margin-bottom: 10px;
	color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
	color: ${tertiary};
	font-size: 13px;
	text-align: left;
	padding-left: 5px;
`;

export const LeftIcon = styled.View`
	left: 15px;
	top: 35px;
	position: absolute;
	z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
	right: 15px;
	top: 35px;
	position: absolute;
	z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
	padding: 10px;
	background-color: ${brand};
	justify-content: center;
	align-items: center;
	border-radius: 20px;
	margin-vertical: 5px;
	height: 55px;

	${(props) =>
		props.google === true &&
		`
    background-color: ${green};
    flex-direction: row;
    justify-content: center;
  `}
`;

export const ButtonText = styled.Text`
	color: ${primary};
	font-size: 18px;

	${(props) =>
		props.google === true &&
		`
    padding-left: 20px;
  `}
`;

export const MsgBox = styled.Text`
	text-align: center;
	font-size: 14px;
`;

export const Line = styled.View`
	height: 1px;
	width: 300px;
	background-color: ${darkLight};
	margin-vertical: 10px;
	align-self: center;
`;

export const ExtraView = styled.View`
	justify-content: center;
	flex-direction: row;
	align-items: center;
	padding: 10px;
`;

export const ExtraText = styled.Text`
	justify-content: center;
	align-content: center;
	color: ${tertiary};
	font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
`;

export const TextLinkContent = styled.Text`
	color: ${brand};
	font-size: 15px;
`;
