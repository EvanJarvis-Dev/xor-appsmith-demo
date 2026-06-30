export default {
    cache: {},

    async loadAudio(audioId) {

        if (this.cache[audioId]) {
            storeValue("audioUrl", this.cache[audioId]);
            return this.cache[audioId];
        }

        storeValue("audioLoading", true);

        const response = await fetch(
            `https://livenviro-staging.net/api/audio?audioId=${audioId}`
        );

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        this.cache[audioId] = url;

        storeValue("audioUrl", url);
        storeValue("audioLoading", false);

        return url;
    }
}