import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
// screen
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Settings from '../screens/Settings';

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
						if (route.name === 'Calendar') {
							iconName = 'calendar';
						} else if (route.name === 'Todo') {
							iconName = 'cog';
						} else if (route.name === 'Add') {
							iconName = 'plus';
						} else if (route.name === 'About') {
							iconName = 'about';
						} else if (route.name === 'Settings') {
							iconName = 'cog';
						}
						return <FontAwesome5 name={iconName} size={size} color={color} />;
					},
				};
			}}
		>
			<Tab.Screen name="Calendar" component={Settings} />
			<Tab.Screen name="Todo" component={Settings} />
			<Tab.Screen name="Add" component={Settings} />
			<Tab.Screen name="About" component={Settings} />
			<Tab.Screen name="Settings" component={Settings} />
		</Tab.Navigator>
	);
};

export default RootStack;
