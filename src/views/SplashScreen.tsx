import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import LoginView from "./LoginView";
import {
	RecoilRoot,
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
} from "recoil";
import { AuthToken } from "../stores/AuthToken";

async function saveRefreshToken(value: string) {
	await SecureStore.setItemAsync("refresh_token", value);
}

async function loadRefreshToken() {
	let result = await SecureStore.getItemAsync("refresh_token");
	if (result) {
		alert("🔐 Here's your value 🔐 \n" + result);
		return result;
	} else {
		alert("No values stored under that key.");
		return "test_token";
	}
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Splash() {
	const [appIsReady, setAppIsReady] = useState(false);
	// const [token, setToken] = useState("");
	const [token, setToken] = useRecoilState(AuthToken);

	useEffect(() => {
		async function prepare() {
			try {
				const refreshToken = await loadRefreshToken();
				// Pre-load fonts, make any API calls you need to do here
				// saveRefreshToken(await loadRefreshToken());
				await axios
					.post(
						"http://127.0.0.1:3000/auth/refresh",
						{
							// your request data here
						},
						// Configuration options including headers
						{
							headers: {
								"Content-Type": "application/json",
								"Refresh-Token": refreshToken,
								// Add any other headers as needed
							},
						}
					)
					.then((response) => {
						// Handle success
						const newAccessToken = response.data["accessToken"];
						setToken(newAccessToken);
					})
					.catch((error) => {
						// Handle error
						alert("Id또는 비밀번호가 틀렸습니다.");
						console.error("Error:", error);
					});
				// Artificially delay for two seconds to simulate a slow loading
				// experience. Please remove this if you copy and paste the code!
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			console.log("token : " + token);
			const res = await axios.get(
				"http://127.0.0.1:3000/auth/profile",
				// Configuration options including headers
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
						// Add any other headers as needed
					},
				}
			);
			console.log(res.data);
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
			onLayout={onLayoutRootView}
		>
			<LoginView></LoginView>
		</View>
	);
}
