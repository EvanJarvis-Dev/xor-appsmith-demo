export default {
	flattenedStations() {
        return allStations.data.map(station => station.data);
	}
}