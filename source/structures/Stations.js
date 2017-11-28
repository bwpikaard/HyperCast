const ytdl = require('ytdl-core');
const simpleyts = require("simple-youtube-stream");
const sys = new simpleyts();

class Stations {
    constructor(client, station, data) {
        this.client = client;

        this.station = station;

        this.data = data;

        this.current;

        this.dispatcher = this.client.createVoiceBroadcast();

        this.dispatcher.on("end", () => this.play());

        this.dispatcher.on("error", (err) => this.client.log(err, true));

        setTimeout(() => this.play(), 1000);
    }

    randomize() {
        return this.data[Math.floor(Math.random() * this.data.length)];
    }

    validate(video) {
        return new Promise((resolve, reject) => {
            return sys.fetchInfo(video).then(resolve).catch(reject);
        });
    }

    fetchStream() {
        return new Promise((resolve, reject) => {
            const video = this.randomize();

            this.validate(video.identifier).then(() => {
                return resolve({ stream: ytdl(video.identifier, { filter: "audioonly" }), video });
            }).catch(() => {
                return this.fetchStream().then(resolve).catch(reject);
            });
        });
    }

    async play() {
        const data = await this.fetchStream().catch(() => setTimeout(() => this.play(), 1000));
        const { stream, video } = data;

        this.dispatcher.playStream(stream, { volume: this.station === "country" ? 0.5 : 0.3, passes: 3 });

        this.current = video;
    }
}

module.exports = Stations;
