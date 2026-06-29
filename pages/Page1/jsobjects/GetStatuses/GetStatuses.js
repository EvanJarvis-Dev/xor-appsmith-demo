export default {
    getStatuses() {

        const statuses = [
            ...new Set(
                FlattenedStations.flattenedStations()
                    .map(
                        device =>
                            device.status?.online_status
                    )
                    .filter(Boolean)
            )
        ];

        return [
            {
                label: "All",
                value: "All"
            },
            ...statuses.map(status => ({
                label:
                    status.charAt(0).toUpperCase() +
                    status.slice(1),
                value: status
            }))
        ];
    }
}