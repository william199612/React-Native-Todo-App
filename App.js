import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { AntDesign } from '@expo/vector-icons';

// screen
import Login from './screens/Login';
import Signup from './screens/Signup';
import Settings from './screens/Settings';

// const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<Signup />
		// <NavigationContainer>
		// 	<Tab.Navigator
		// 		screenOptions={({ route }) => {
		// 			return {
		// 				tabBarIcon: ({ color, size }) => {
		// 					let iconName;
		// 					if (route.name === 'Calendar') {
		// 						iconName = 'calendar';
		// 					} else if (route.name === 'Todo') {
		// 						iconName = 'cog';
		// 					} else if (route.name === 'Add') {
		// 						iconName = 'plus';
		// 					} else if (route.name === 'About') {
		// 						iconName = 'about';
		// 					} else if (route.name === 'Settings') {
		// 						iconName = 'cog';
		// 					}
		// 					return <FontAwesome5 name={iconName} size={size} color={color} />;
		// 				},
		// 			};
		// 		}}
		// 	>
		// 		{/* <Tab.Screen name="Calendar" component={} />
		//     <Tab.Screen name="Todo" component={} />
		//     <Tab.Screen name="Add" component={} />
		//     <Tab.Screen name="About" component={} />
		// 		<Tab.Screen name="Settings" component={SettingsScreen} /> */}
		// 	</Tab.Navigator>
		// 	<View style={styles.container}>
		// 		<AntDesign name="checkcircle" size={24} color="black" />
		// 		<Text>Just Do It!</Text>
		// 	</View>
		// </NavigationContainer>
	);
}
