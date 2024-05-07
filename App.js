import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';

// screens
import Login from './screens/Login';
import Signup from './screens/Signup';
import Settings from './screens/Settings';

import RootStack from './navigators/RootStack';

const Tab = createBottomTabNavigator();

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
	};

	return (
		<RootStack />
		// <NavigationContainer>
		// 	{!isLoggedIn ? (
		// 		<Login />
		// 	) : (
		// 		<Tab.Navigator
		// 			screenOptions={({ route }) => {
		// 				return {
		// 					tabBarIcon: ({ color, size }) => {
		// 						let iconName;
		// 						if (route.name === 'Calendar') {
		// 							iconName = 'calendar';
		// 						} else if (route.name === 'Todo') {
		// 							iconName = 'cog';
		// 						} else if (route.name === 'Add') {
		// 							iconName = 'plus';
		// 						} else if (route.name === 'About') {
		// 							iconName = 'about';
		// 						} else if (route.name === 'Settings') {
		// 							iconName = 'cog';
		// 						}
		// 						return <FontAwesome5 name={iconName} size={size} color={color} />;
		// 					},
		// 				};
		// 			}}
		// 		>
		// 			<Tab.Screen name="Calendar" component={SettingsScreen} />
		// 			<Tab.Screen name="Todo" component={SettingsScreen} />
		// 			<Tab.Screen name="Add" component={SettingsScreen} />
		// 			<Tab.Screen name="About" component={SettingsScreen} />
		// 			<Tab.Screen name="Settings" component={SettingsScreen} />
		// 		</Tab.Navigator>
		// 	)}
		// </NavigationContainer>
	);
}
