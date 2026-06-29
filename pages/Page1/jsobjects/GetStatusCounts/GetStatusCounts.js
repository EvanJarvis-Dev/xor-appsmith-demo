export default {

    getStatusCounts(siteId = null) {

        let data = FlattenedStations.flattenedStations();

        // Filter by site if one is selected
        if (
            siteId !== null &&
            siteId !== undefined &&
            siteId !== ""
        ) {
            data = data.filter(
                station => station.site_id === Number(siteId)
            );
        }

        const counts = data.reduce((acc, device) => {
            const status =
                device.status?.online_status || "Unknown";

            acc[status] = (acc[status] || 0) + 1;

            return acc;
        }, {});

        const total = data.length;

        return Object.entries(counts).map(
            ([status, count]) => ({
                x: status,
                y: count,
                percent:
                    total > 0
                        ? ((count / total) * 100).toFixed(1)
                        : "0.0"
            })
        );
    }

}