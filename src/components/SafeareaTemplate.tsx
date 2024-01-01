import { ReactNode } from "react";
import { View } from "react-native";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

interface SafeareaTemplateProps {
	children: ReactNode;
}

export default function SafeareaTemplate(props: SafeareaTemplateProps) {
	const insets = useSafeAreaInsets();
	return (
		<SafeAreaProvider>
			<View
				style={{
					flex: 1,
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					paddingLeft: insets.left,
					paddingRight: insets.right,
				}}
			>
				{props.children}
			</View>
		</SafeAreaProvider>
	);
}
