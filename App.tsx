import { Text, View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function App() {
	return (
		<SafeAreaProvider style={{ flex: 1 }}>
			<StatusBar style="auto" />
			<SafeAreaView>
				<Text>teasdfsadwerwqefst</Text>
			</SafeAreaView>
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
