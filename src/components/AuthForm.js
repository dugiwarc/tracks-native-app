import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Spacer from "./Spacer";

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<>
			<Spacer>
				<Text h3>{headerText}</Text>
			</Spacer>
			<Spacer>
				<Input
					label='Email'
					value={email}
					onChangeText={setEmail}
					autoCapitalize='none'
					autoCorrect={false}
				/>
			</Spacer>
			<Spacer>
				<Input
					secureTextEntry
					label='Password'
					value={password}
					onChangeText={setPassword}
					autoCapitalize='none'
					autoCorrect={false}
				/>
			</Spacer>
			<Spacer>
				<Text style={styles.errorStyle}>{errorMessage}</Text>
				<Button
					title={submitButtonText}
					onPress={() => {
						onSubmit({ email, password });
					}}
				/>
			</Spacer>
		</>
	);
};

const styles = StyleSheet.create({
	errorStyle: {
		fontSize: 16,
		color: "red",
		marginVertical: 15,
		marginBottom: 15
	}
});
export default AuthForm;
