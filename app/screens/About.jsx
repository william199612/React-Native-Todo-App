import React from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';

import { Feather, Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Colors } from '../components/styles';

const resourseData = [{}];

const About = () => {
	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.centerWrapper}>
					<Feather name="check-circle" size={150} color={Colors.brand} />

					<Text style={styles.title}>About JustDo</Text>
					<Text style={styles.summary}>
						JustDo is a comprehensive task management tool designed to help you organize your work and personal life
						efficiently. With JustDo, you can create, manage, and track tasks and projects seamlessly.
					</Text>
				</View>

				<View style={styles.textLeft}>
					<Text style={styles.subtitle}>Key Features</Text>
					<Text style={styles.line}></Text>
					<Text style={styles.text}>
						<Feather name="list" size={15} color={Colors.brand} />
						{'  '}Task Management
					</Text>
					<Text style={styles.description}>Create and organize tasks with due dates.</Text>

					<Text style={styles.text}>
						<Feather name="calendar" size={15} color={Colors.brand} />
						{'  '}Calendar
					</Text>
					<Text style={styles.description}>Browse your todos on calendar view.</Text>

					<Text style={styles.text}>
						<MaterialIcons name="dark-mode" size={15} color={Colors.brand} />
						{'  '}Dark Mode
					</Text>
					<Text style={styles.description}>Set up a new look on your app!</Text>

					<Text style={styles.subtitle}>Devlopment Details</Text>
					<Text style={styles.line}></Text>
					<View style={styles.infoWrapper}>
						<View style={styles.info}>
							<Text style={styles.text}>
								<FontAwesome6 name="paint-roller" size={15} color={Colors.brand} />
								{'  '}Frontend
							</Text>
							<Text style={styles.description}>React, React Native</Text>
						</View>

						<View style={styles.info}>
							<Text style={styles.text}>
								<Feather name="server" size={15} color={Colors.brand} />
								{'  '}Backend
							</Text>
							<Text style={styles.description}>Node.js, Express.js</Text>
						</View>
					</View>

					<View style={styles.infoWrapper}>
						<View style={styles.info}>
							<Text style={styles.text}>
								<Ionicons name="server" size={15} color={Colors.brand} />
								{'  '}Database
							</Text>
							<Text style={styles.description}>MySQL</Text>
						</View>

						<View style={styles.info}>
							<Text style={styles.text}>
								<MaterialIcons name="password" size={15} color={Colors.brand} />
								{'  '}Encryption
							</Text>
							<Text style={styles.description}>bcrypt</Text>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 30,
		paddingBottom: 100,
		paddingHorizontal: 40,
	},
	centerWrapper: {
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 20,
		marginBottom: 10,
	},
	summary: {
		fontSize: 16,
		textAlign: 'center',
		lineHeight: 24,
		paddingVertical: 10,
	},
	textLeft: {
		alignItems: 'flex-start',
	},
	line: {
		height: 1,
		width: '100%',
		backgroundColor: Colors.darkLight,
		marginVertical: 10,
		alignSelf: 'center',
	},
	subtitle: {
		fontSize: 20,
		marginTop: 30,
		marginBottom: 10,
	},
	text: {
		fontSize: 16,
		fontWeight: 'bold',
		paddingVertical: 10,
	},
	description: {
		fontSize: 14,
		marginBottom: 10,
	},
	infoWrapper: {
		flexDirection: 'row',
	},
	info: {
		width: '50%',
	},
});

export default About;
