import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import { Feather, Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Colors } from '../components/styles';
import { useTheme } from '../theme/useTheme';
import licenses from '../licenses.json';

const About = () => {
	const { theme } = useTheme();
	const licenseData = Object.keys(licenses).map((key) => ({
		name: key,
		...licenses[key],
	}));
	return (
		<ScrollView>
			<View style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
				<View style={styles.centerWrapper}>
					<Feather name="check-circle" size={150} color={Colors.brand} />

					<Text style={theme === 'dark' ? styles.darkTitle : styles.lightTitle}>About JustDo</Text>
					<Text style={theme === 'dark' ? styles.darkSummary : styles.lightSummary}>
						JustDo is a comprehensive task management tool designed to help you organize your work and personal life
						efficiently. With JustDo, you can create, manage, and track tasks and projects seamlessly.
					</Text>
				</View>

				<View style={styles.textLeft}>
					<Text style={theme === 'dark' ? styles.darkSubtitle : styles.lightSubtitle}>Key Features</Text>
					<Text style={styles.line}></Text>
					<Text style={theme === 'dark' ? styles.darkKeyText : styles.lightKeyText}>
						<Feather name="list" size={15} color={Colors.brand} />
						{'  '}Task Management
					</Text>
					<Text style={theme === 'dark' ? styles.darkDescription : styles.lightDescription}>
						Create and organize tasks with due dates.
					</Text>

					<Text style={theme === 'dark' ? styles.darkKeyText : styles.lightKeyText}>
						<Feather name="calendar" size={15} color={Colors.brand} />
						{'  '}Calendar
					</Text>
					<Text style={theme === 'dark' ? styles.darkDescription : styles.lightDescription}>
						Browse your todos on calendar view.
					</Text>

					<Text style={theme === 'dark' ? styles.darkKeyText : styles.lightKeyText}>
						<MaterialIcons name="dark-mode" size={15} color={Colors.brand} />
						{'  '}Dark Mode
					</Text>
					<Text style={theme === 'dark' ? styles.darkDescription : styles.lightDescription}>
						Set up a new look on your app!
					</Text>

					<Text style={theme === 'dark' ? styles.darkSubtitle : styles.lightSubtitle}>Devlopment Details</Text>
					<Text style={styles.line}></Text>
					<View style={styles.infoWrapper}>
						<View style={styles.info}>
							<Text style={theme === 'dark' ? styles.darkKeyText : styles.lightKeyText}>
								<FontAwesome6 name="paint-roller" size={15} color={Colors.brand} />
								{'  '}Frontend
							</Text>
							<Text style={theme === 'dark' ? styles.darkDescription : styles.lightDescription}>
								React, React Native
							</Text>
						</View>

						<View style={styles.info}>
							<Text style={theme === 'dark' ? styles.darkKeyText : styles.lightKeyText}>
								<Feather name="server" size={15} color={Colors.brand} />
								{'  '}Backend
							</Text>
							<Text style={theme === 'dark' ? styles.darkDescription : styles.lightDescription}>
								Node.js, Express.js
							</Text>
						</View>
					</View>

					<View style={styles.infoWrapper}>
						<View style={styles.info}>
							<Text style={theme === 'dark' ? styles.darkKeyText : styles.lightKeyText}>
								<Ionicons name="server" size={15} color={Colors.brand} />
								{'  '}Database
							</Text>
							<Text style={theme === 'dark' ? styles.darkDescription : styles.lightDescription}>MySQL</Text>
						</View>

						<View style={styles.info}>
							<Text style={theme === 'dark' ? styles.darkKeyText : styles.lightKeyText}>
								<MaterialIcons name="password" size={15} color={Colors.brand} />
								{'  '}Encryption
							</Text>
							<Text style={theme === 'dark' ? styles.darkDescription : styles.lightDescription}>bcrypt</Text>
						</View>
					</View>
					<Text style={theme === 'dark' ? styles.darkSubtitle : styles.lightSubtitle}>Licenses</Text>
					<Text style={styles.line}></Text>
					<View>
						<Text style={theme === 'dark' ? styles.darkKeyText : styles.lightKeyText}>
							<MaterialCommunityIcons name="license" size={20} color={Colors.brand} />
							{'  '}MIT
						</Text>
						{licenseData.map((license, index) => (
							<Text key={index} style={theme === 'dark' ? styles.darkDescription : styles.lightDescription}>
								{`${index + 1}. ${license.name}`}
							</Text>
						))}
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	lightContainer: {
		flex: 1,
		paddingTop: 30,
		paddingBottom: 100,
		paddingHorizontal: 40,
		backgroundColor: Colors.primary,
	},
	darkContainer: {
		flex: 1,
		paddingTop: 30,
		paddingBottom: 100,
		paddingHorizontal: 40,
		backgroundColor: Colors.tertiary,
	},
	centerWrapper: {
		alignItems: 'center',
	},
	lightTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 20,
		marginBottom: 10,
	},
	darkTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 20,
		marginBottom: 10,
		color: Colors.secondary,
	},
	lightSummary: {
		fontSize: 16,
		textAlign: 'center',
		lineHeight: 24,
		paddingVertical: 10,
	},
	darkSummary: {
		fontSize: 16,
		textAlign: 'center',
		lineHeight: 24,
		paddingVertical: 10,
		color: Colors.secondary,
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
	lightSubtitle: {
		fontSize: 20,
		marginTop: 30,
		marginBottom: 10,
	},
	darkSubtitle: {
		fontSize: 20,
		marginTop: 30,
		marginBottom: 10,
		color: Colors.secondary,
	},
	lightKeyText: {
		fontSize: 16,
		fontWeight: 'bold',
		paddingVertical: 10,
	},
	darkKeyText: {
		fontSize: 16,
		fontWeight: 'bold',
		paddingVertical: 10,
		color: Colors.secondary,
	},
	lightDescription: {
		fontSize: 14,
		marginBottom: 10,
	},
	darkDescription: {
		fontSize: 14,
		marginBottom: 10,
		color: Colors.secondary,
	},
	infoWrapper: {
		flexDirection: 'row',
	},
	info: {
		width: '50%',
	},
});

export default About;
