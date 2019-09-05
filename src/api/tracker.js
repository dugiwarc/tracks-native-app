import axios from "axios";
import { AsyncStorage } from "react-native";

const instance = axios.create({
	baseURL: "http://01c2814d.ngrok.io"
});

instance.interceptors.request.use(
	async config => {
		const token = await AsyncStorage.getItem("token");
		console.log("token", token);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	err => {
		console.log("ERRRRRRROR");
		return Promise.reject(err);
	}
);

export default instance;
