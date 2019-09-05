import * as Location from "expo-location";

const tenMetersWithDegrees = 0.0001;

const getLocation = increment => {
	return {
		timestamp: 100000,
		coords: {
			speed: 0,
			heading: 0,
			accuracy: 5,
			altitudeAccuracy: 5,
			altitude: 5,
			longitude: 7.762651099999999 + increment * tenMetersWithDegrees,
			latitude: 48.5752205 + increment * tenMetersWithDegrees
		}
	};
};

let counter = 0;
setInterval(() => {
	Location.EventEmitter.emit("Expo.locationChanged", {
		watchId: Location._getCurrentWatchId(),
		location: getLocation(counter)
	});
}, 1000);
