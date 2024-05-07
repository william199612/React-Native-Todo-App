import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	InnerContainer,
	PageTitle,
	StyledFormArea,
	StyledButton,
	ButtonText,
	Line,
	SettingsContainer,
} from '../components/styles';

const Settings = ({ navigation }) => {
	return (
		<>
			<StatusBar style="dark" />
			<InnerContainer>
				<SettingsContainer>
					<PageTitle settings={true}>Settings</PageTitle>
					<StyledFormArea>
						<Line />
						<StyledButton onPress={() => {}}>
							<ButtonText>Other</ButtonText>
						</StyledButton>
						<StyledButton onPress={() => navigation.navigate('Login')}>
							<ButtonText>Logout</ButtonText>
						</StyledButton>
					</StyledFormArea>
				</SettingsContainer>
			</InnerContainer>
		</>
	);
};

export default Settings;
