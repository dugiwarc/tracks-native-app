import React, { useContext } from "react";
import { Input, Button } from "react-native-elements";
import { Context as LocationContext } from "../context/LocationContext";
import Spacer from "./Spacer";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
	const {
		startRecording,
		stopRecording,
		changeName,
		state: { name, recording, locations }
	} = useContext(LocationContext);
	const [saveTrack] = useSaveTrack();

	return (
		<>
			<Spacer>
				<Input
					onChangeText={changeName}
					placeholder='Enter name'
					value={name}
				/>
			</Spacer>
			{recording ? (
				<Button title='Stop' onPress={stopRecording} />
			) : (
				<Button title='Start recording' onPress={startRecording} />
			)}
			<Spacer>
				{!recording && locations.length ? (
					<Button title='Save recording' onPress={saveTrack} />
				) : null}
			</Spacer>
		</>
	);
};

export default TrackForm;
