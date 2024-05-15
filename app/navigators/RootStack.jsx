import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screen
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import MainStack from './MainStack';

const Stack = createNativeStackNavigator();

const RootStack = () => {
	const [isLoggedIn, , setIsLoggedIn] = useState(true);
	return (
		<NavigationContainer>
			{isLoggedIn ? (
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
					initialRouteName="Login"
				>
					<Stack.Screen name="Main" component={MainStack} />
				</Stack.Navigator>
			) : (
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
					initialRouteName="Login"
				>
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Signup" component={Signup} />
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};

export default RootStack;
