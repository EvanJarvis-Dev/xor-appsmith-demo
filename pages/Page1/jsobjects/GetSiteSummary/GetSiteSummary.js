export default {
    getSiteSummary() {

        const sites = {};

        FlattenedStations.flattenedStations().forEach(station => {

            const siteId = station.site_id;
            const status = station.status?.online_status || "Unknown";

            if (!sites[siteId]) {
                sites[siteId] = {
                    site_id: siteId,
                    site_name: station.site?.title,
                    project: station.site?.project?.title,
                    description: station.site?.description,
                    latitude: station.site?.coordinates?.latitude,
                    longitude: station.site?.coordinates?.longitude,
                    station_count: 0
                };
            }

            sites[siteId].station_count++;
            sites[siteId][status] =
                (sites[siteId][status] || 0) + 1;
        });

        return Object.values(sites).map(site => {

            const total = site.station_count;

            // Format status counts
            Object.keys(site).forEach(key => {
                if (
                    ![
                        "site_id",
                        "site_name",
                        "project",
                        "description",
                        "latitude",
                        "longitude",
                        "station_count"
                    ].includes(key)
                ) {
                    const count = site[key];
                    site[key] =
                        `${count} (${((count / total) * 100).toFixed(1)}%)`;
                }
            });

            // Put fixed columns first
            const {
                site_id,
                site_name,
                project,
                station_count,
                ...rest
            } = site;

            return {
                site_id,
                site_name,
                project,
                station_count,
                ...rest
            };
        });
    }
}