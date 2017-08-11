const ytdl = require("ytdl-core");
const sys = new (require("simple-youtube-stream"));

let at = 0;

class Broadcast {
    constructor(client, title, songs) {
        this.client = client;
        this.title = title;
        this.songs = songs[0].service ? songs.filter(s => s.service === "YouTubeVideo") : songs;
        this.current = null;

        this.dispatcher = client.createVoiceBroadcast();

        this.dispatcher.on("end", () => {
            this.play();
        });

        this.dispatcher.on("error", err => {
            this.client.log(err, true);
        });
    }

    randomSong() {
        return this.songs[Math.floor(Math.random() * this.songs.length)];
    }

    validateVideo(video) {
        return new Promise((resolve, reject) => {
            return sys.fetchInfo(video).then(resolve).catch(reject);
        });
    }

    pickStream() {
        return new Promise((resolve, reject) => {
            let song = this.randomSong();

            this.validateVideo(song.identifier).then(() => {
                let stream = ytdl(song.identifier, { filter: "audioonly" });

                return resolve({ stream, song });
            }).catch(() => {
                this.pickStream().then(data => {
                    return resolve(data);
                }).catch(err => {
                    return reject(err);
                });
            });
        });
    }

    play() {
        if (at >= 20) {
            console.error(`Video limit of 20 reached without clearing! Killing process as failsafe.`);
            process.exit();
        }
        at++;
        setTimeout(() => at--, 5000);

        this.pickStream().then(data => {
            let { stream , song } = data;

            this.dispatcher.playStream(stream, { volume: 0.5, passes: 3 });

            this.dispatcher.setVolume(this.title === "country" ? 0.5 : 0.35);
            this.current = song;
        }).catch(err => {
            this.client.log(err, true);
            setTimeout(()=> this.play(), 1000);
        });
    }

    begin() {
        this.play();
    }
}

module.exports = Broadcast;
