import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
	switch (action.type) {
		case "ADD_ERROR":
			return { ...state, errorMessage: action.payload };
		case "SIGN_UP":
			return { ...state, token: action.payload, errorMessage: "" };
		case "SIGN_IN":
			return { ...state, token: action.payload, errorMessage: "" };
		case "CLEAR_ERROR_MESSAGE":
			return { ...state, errorMessage: "" };
		case "SIGN_OUT":
			return { ...state, token: null };
		default:
			return state;
	}
};

const tryLocalSignin = dispatch => async () => {
	const token = await AsyncStorage.getItem("token");
	if (token) {
		dispatch({
			type: "SIGN_IN",
			payload: token
		});
		navigate("TrackList");
	} else {
		navigate("loginFlow");
	}
};

const clearErrorMessage = dispatch => () => {
	dispatch({ type: "CLEAR_ERROR_MESSAGE" });
};

const signup = dispatch => async ({ email, password }) => {
	try {
		const response = await trackerApi.post("/signup", { email, password });
		await AsyncStorage.setItem("token", response.data);
		console.log("response.data.token", response.data);
		dispatch({ type: "SIGN_UP", payload: response.data });
		navigate("TrackList");
	} catch (error) {
		dispatch({ type: "ADD_ERROR", payload: error.message });
	}
};

const signin = dispatch => async ({ email, password }) => {
	try {
		const response = await trackerApi.post("/signin", { email, password });
		await AsyncStorage.setItem("token", response.data);
		dispatch({
			type: "SIGN_IN",
			payload: response.data
		});
		navigate("TrackList");
	} catch (error) {
		dispatch({
			type: "ADD_ERROR",
			payload: "Something went wrong..."
		});
	}
};

const signout = dispatch => () => {
	dispatch({
		type: "SIGN_OUT"
	});
	navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signin, signup, signout, clearErrorMessage, tryLocalSignin, signout },
	{ token: null, errorMessage: "" }
);
