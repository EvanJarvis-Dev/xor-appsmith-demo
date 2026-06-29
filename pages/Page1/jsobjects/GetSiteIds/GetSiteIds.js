export default {
    getSiteIds() {
        return [
            ...new Set(
                FlattenedStations.flattenedStations()
                    .map(station => station.site_id)
            )
        ];
    }
}