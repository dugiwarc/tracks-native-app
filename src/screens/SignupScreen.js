import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignupScreen = ({ navigation }) => {
	const { state, signup, clearErrorMessage } = useContext(AuthContext);

	return (
		<View style={styles.viewStyles}>
			<NavigationEvents onWillBlur={clearErrorMessage} />
			<AuthForm
				headerText='Sign up for Tracker'
				errorMessage={state.errorMessage}
				submitButtonText='Sign Up'
				state={state}
				onSubmit={signup}
			/>
			<NavLink text='Sign in instead' routeName='Signin' />
		</View>
	);
};

SignupScreen.navigationOptions = () => {
	return {
		header: null
	};
};

const styles = StyleSheet.create({
	viewStyles: {
		flex: 1,
		justifyContent: "center",
		marginBottom: 200
	}
});

export default SignupScreen;
