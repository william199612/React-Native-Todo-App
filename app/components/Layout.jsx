import { View, Text } from 'react-native';

const GlobalLayout = () => {
	return (
		<>
			<Tabs>
				<Tabs.Screen name="home" component={home}></Tabs.Screen>
			</Tabs>
		</>
	);
};

export default GlobalLayout;
