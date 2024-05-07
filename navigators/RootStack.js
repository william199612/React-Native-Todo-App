import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors } from '../components/styles';

// screen
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Settings from '../screens/Settings';

const Stack = createNativeStackNavigator();

const RootStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
				initialRouteName="Login"
			>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Signup" component={Signup} />
				<Stack.Screen name="Settings" component={Settings} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootStack;
