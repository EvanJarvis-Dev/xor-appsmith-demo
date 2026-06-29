export default {
    getSiteSummary() {

        const sites = {};

        const data = FlattenedStations.flattenedStations();

        // 1. Build counts
        data.forEach(station => {

            const siteId = station.site_id;
            const status =
                station.status?.online_status || "Unknown";

            if (!sites[siteId]) {
                sites[siteId] = {
                    site_id: siteId,
                    station_count: 0
                };
            }

            sites[siteId].station_count++;

            sites[siteId][status] =
                (sites[siteId][status] || 0) + 1;
        });

        // 2. Convert to array + add percentages
        return Object.values(sites).map(site => {

            const total = site.station_count;

            const enriched = { ...site };

            Object.keys(enriched).forEach(key => {

                if (
                    key !== "site_id" &&
                    key !== "station_count"
                ) {
                    const count = enriched[key];

                    const percent =
                        ((count / total) * 100).toFixed(1);

                    enriched[key] =
                        `${count} (${percent}%)`;
                }
            });

            return enriched;
        });
    }
}