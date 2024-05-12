import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
// screen
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import Calendar from '../screens/Calendar';
import About from '../screens/About';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
				<Stack.Screen name="Main" component={MainStack} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const MainStack = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => {
				return {
					tabBarIcon: ({ color, size }) => {
						let iconName;
						if (route.name === 'Home') {
							iconName = 'home';
						} else if (route.name === 'Calendar') {
							iconName = 'calendar';
						} else if (route.name === 'About') {
							iconName = 'about';
						} else if (route.name === 'Profile') {
							iconName = 'profile';
						}
						return <FontAwesome5 name={iconName} size={size} color={color} />;
					},
				};
			}}
		>
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Calendar" component={Calendar} />
			<Tab.Screen name="About" component={About} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
};

export default RootStack;
