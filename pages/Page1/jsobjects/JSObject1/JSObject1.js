export default {
    playAudio(audioId) {

        const url =
            `https://livenviro-staging.net/api/audio?audioId=${audioId}`;

        window.open(url, "_blank");
    }
}