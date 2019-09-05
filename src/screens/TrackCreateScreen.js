// import "../_mockLocation";
import React, { useContext, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import {
	SafeAreaView,
	// NavigationEvents,
	withNavigationFocus
} from "react-navigation";
import useLocation from "../hooks/useLocation";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import TrackForm from "../components/TrackForm";
import Spacer from "../components/Spacer";
import { FontAwesome } from "@expo/vector-icons";

const TrackCreateScreen = ({ isFocused }) => {
	const { addLocation, state } = useContext(LocationContext);
	const callback = useCallback(
		location => {
			addLocation(location, state.recording);
		},
		[state.recording]
	);

	const [error] = useLocation(isFocused || state.recording, callback);
	return (
		<SafeAreaView forceInset={{ top: "always" }}>
			<Text h3>Create a track</Text>
			<Map />
			{/* <NavigationEvents onWillBlur={() => console.log("Leaving")} /> */}
			{error ? <Text>Please enable location services</Text> : null}
			<Spacer>
				<TrackForm />
			</Spacer>
		</SafeAreaView>
	);
};

TrackCreateScreen.navigationOptions = {
	title: "Add Track",
	tabBarIcon: <FontAwesome name='plus' size={20} />
};

const styles = StyleSheet.create({
	inputStyle: {}
});

export default withNavigationFocus(TrackCreateScreen);
