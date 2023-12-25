import { Text, View, StyleSheet } from "react-native";
import {
	SafeAreaProvider,
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

function HomeScreen() {
	const insets = useSafeAreaInsets();
	return (
		// <View
		// 	style={{
		// 		...styles.container,
		// 		paddingTop: insets.top,
		// 		paddingBottom: insets.bottom,
		// 	}}
		// >
		<SafeAreaView>
			
			<Text style={{ fontSize: 28 }}>Content is in safe area.</Text>
		</SafeAreaView>
		// </View>
	);
}

export default function App() {
	return (
		<SafeAreaProvider>
      <StatusBar style="auto" />
			<HomeScreen />
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-end",
	},
});
