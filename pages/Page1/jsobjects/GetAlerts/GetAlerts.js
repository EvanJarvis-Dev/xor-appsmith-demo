export default {

    getAlerts(device) {

        const alerts = [];

        const status = device.status;

        if (status.online_status === "offline") {
            alerts.push({
                severity: "critical",
                message: "Device Offline"
            });
        }

        if (status.exceedances_now > 0) {
            alerts.push({
                severity: "warning",
                message:
                    `${status.exceedances_now} active exceedances`
            });
        }

        if (status.short_offline) {
            alerts.push({
                severity: "warning",
                message:
                    "Recent connectivity interruption"
            });
        }

        if (status.exceedances_total > 0) {
            alerts.push({
                severity: "info",
                message:
                    `${status.exceedances_total} historical exceedances`
            });
        }

        return alerts;
    }

}