import { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

function Layout() {
	const insets = useSafeAreaInsets();
	const [id, setId] = useState("");
	const [pw, setPw] = useState("");
	const login = async () => {
		await axios
			.post("http://127.0.0.1:3000/auth/login", {
				username: id,
				password: pw,
			})
			.then((response) => {
				// Handle success
				console.log("Response:", response.data);
				SecureStore.setItemAsync(
					"refresh_token",
					response.data["refreshToken"]
				);
			})
			.catch((error) => {
				// Handle error
				alert("Id또는 비밀번호가 틀렸습니다.");
				console.error("Error:", error);
			});
	};

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
				paddingLeft: insets.left,
				paddingRight: insets.right,
			}}
		>
			<TextInput
				style={styles.input}
				value={id}
				onChangeText={(text) => setId(text)}
				autoCapitalize={"none"}
			></TextInput>
			<TextInput
				style={{ ...styles.input }}
				value={pw}
				onChangeText={(text) => setPw(text)}
				secureTextEntry={true}
				autoCapitalize={"none"}
			></TextInput>
			<TouchableOpacity onPress={login}>
				<Text>btn</Text>
			</TouchableOpacity>
		</View>
	);
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function LoginView() {
	return (
		<SafeAreaProvider>
			<Layout />
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		width: 200,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});
