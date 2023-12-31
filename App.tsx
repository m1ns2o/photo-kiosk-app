import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import Splash from "./src/views/SplashScreen";
import { RecoilRoot } from "recoil";

function Demo() {
	const insets = useSafeAreaInsets();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "space-between",
				alignItems: "center",
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
				paddingLeft: insets.left,
				paddingRight: insets.right,
			}}
		>
			<Text>This is top text.</Text>
			<Text>This is bottom text.</Text>
		</View>
	);
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<RecoilRoot>
			<SafeAreaProvider>
				<NavigationContainer>
					<Stack.Navigator
						initialRouteName="Home"
						screenOptions={{ headerShown: false }}
					>
						<Stack.Screen name="Home">
							{() => (
								<Tab.Navigator
									initialRouteName="Analitics"
									tabBar={() => null}
									screenOptions={{ headerShown: false }}
								>
									<Tab.Screen name="Analitics" component={Splash} />
									<Tab.Screen name="Profile" component={Splash} />
								</Tab.Navigator>
							)}
						</Stack.Screen>
						<Stack.Screen name="Settings" component={Splash} />
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaProvider>
		</RecoilRoot>
	);
}
