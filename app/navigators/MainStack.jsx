import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome5 } from '@expo/vector-icons';

import { Colors } from '../components/styles';
import { useTheme } from '../contexts/useTheme';
import Todo from '../screens/Todo';
import CalendarScreen from '../screens/Calendar';
import About from '../screens/About';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

const MainStack = () => {
	const { theme } = useTheme();
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
				tabBarStyle: theme === 'dark' ? styles.darkTabBar : styles.tabBar,
				headerStyle: theme === 'dark' ? styles.darkHeader : null,
				headerTitleStyle: theme === 'dark' ? styles.darkHeaderTitle : null,
			})}
		>
			<Tab.Screen name="Today's Task" component={Todo} />
			<Tab.Screen name="Calendar" component={CalendarScreen} />
			<Tab.Screen name="About" component={About} />
			<Tab.Screen name="Settings" component={Settings} />
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
		backgroundColor: Colors.secondary,
		borderRadius: 25,
		height: 60,
		paddingBottom: 0,
	},
	darkTabBar: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		elevation: 0,
		backgroundColor: Colors.black,
		borderRadius: 25,
		height: 60,
		paddingBottom: 0,
		borderTopWidth: 0,
	},
	darkHeader: {
		backgroundColor: Colors.tertiary,
		borderBottomColor: Colors.darkLight,
		borderBottomWidth: 1,
		elevation: 0,
	},
	darkHeaderTitle: {
		color: Colors.primary,
	},
});

export default MainStack;
