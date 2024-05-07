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

const Settings = () => {
	return (
		<>
			<StatusBar style="dark" />
			<InnerContainer>
				<SettingsContainer>
					<PageTitle settings={true}>Settings</PageTitle>
					<StyledFormArea>
						<Line />
						<StyledButton onSubmit={() => {}}>
							<ButtonText>Other</ButtonText>
						</StyledButton>
						<StyledButton onSubmit={() => {}}>
							<ButtonText>Logout</ButtonText>
						</StyledButton>
					</StyledFormArea>
				</SettingsContainer>
			</InnerContainer>
		</>
	);
};

export default Settings;
