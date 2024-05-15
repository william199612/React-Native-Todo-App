import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome5 } from '@expo/vector-icons';

import Todo from '../screens/Todo';
import CalendarScreen from '../screens/Calendar';
import About from '../screens/About';
import Setting from '../screens/Setting';

const Tab = createBottomTabNavigator();

const MainStack = () => {
	return (
		<Tab.Navigator
			initialRouteName={Todo}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === "Today's Task") {
						iconName = focused ? 'check-circle' : 'check';
					} else if (route.name === 'Calendar') {
						iconName = focused ? 'calendar-alt' : 'calendar';
					} else if (route.name === 'About') {
						iconName = 'info-circle';
					} else if (route.name === 'Settings') {
						iconName = 'cog';
					}
					return <FontAwesome5 name={iconName} size={size} color={color} />;
				},
				tabBarShowLabel: false,
				tabBarStyle: styles.tabBar,
			})}
		>
			<Tab.Screen name="Today's Task" component={Todo} />
			<Tab.Screen name="Calendar" component={CalendarScreen} />
			<Tab.Screen name="About" component={About} />
			<Tab.Screen name="Settings" component={Setting} />
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		elevation: 0,
		backgroundColor: '#fff',
		borderRadius: 25,
		height: 60,
		paddingBottom: 0,
	},
});

export default MainStack;
