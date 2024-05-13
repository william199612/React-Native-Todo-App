import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome5 } from '@expo/vector-icons';

import Home from '../screens/Home';
import Calendar from '../screens/Calendar';
import About from '../screens/About';
import Profile from '../screens/Profile';
import Create from '../screens/Create';

const Tab = createBottomTabNavigator();

const MainTab = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					tabBarShowLabel: false,
					tabBarStyle: styles.tabBar,
				}}
			>
				<Tab.Screen
					name="Todo"
					component={Home}
					options={{
						tabBarIcon: ({ color, size }) => <FontAwesome5 name="check" size={size} color={color} />,
					}}
				/>
				<Tab.Screen
					name="Calendar"
					component={Calendar}
					options={{
						tabBarIcon: ({ color, size }) => <FontAwesome5 name="calendar" size={size} color={color} />,
					}}
				/>
				<Tab.Screen
					name="Create"
					component={Create}
					options={{
						tabBarOnPress: ({ navigation }) => {
							navigation.navigate('Create');
						},
						tabBarIcon: ({ color, size }) => <FontAwesome5 name="plus" size={size} color={color} />,
					}}
				/>
				<Tab.Screen
					name="About"
					component={About}
					options={{
						tabBarIcon: ({ color, size }) => <FontAwesome5 name="info-circle" size={size} color={color} />,
					}}
				/>
				<Tab.Screen
					name="Setting"
					component={Profile}
					options={{
						tabBarIcon: ({ color, size }) => <FontAwesome5 name="cog" size={size} color={color} />,
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
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
	},
});

export default MainTab;
