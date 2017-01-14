const ytdl = require("ytdl-core");

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
    }

    randomSong() {
        return this.songs[Math.floor(Math.random() * this.songs.length)];
    }

    pickStream() {
        try {
            let song = this.randomSong();
            let stream = ytdl(song.identifier, { filter: "audioonly" });
            return { stream, song };
        } catch(err) {
            return this.pickStream();
        }
    }

    play() {
        let { song, stream } = this.pickStream();
        this.dispatcher.playStream(stream, { volume: 0.5, passes: 3 });
        this.dispatcher.setVolume(this.title === "country" ? 0.5 : 0.35);
        this.current = song;
    }

    begin() {
        this.play();
    }
}

module.exports = Broadcast;
