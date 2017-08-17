const klaw = require("klaw");
const path = require("path");
const stations = path.join(__dirname, "..", "stations");

const Broadcast = require("../structures/Broadcast");

class BroadcastsManager {
    constructor(client) {
        this.client = client;

        this.data = new Map();

        this.load();
    }

    load() {
        klaw(stations).on("data", item => {
            const file = path.parse(item.path);
            if (!file.ext || file.ext !== ".json") return;

            const songs = require(`${file.dir}${path.sep}${file.base}`);
            const data = new Broadcast(this.client, file.name, songs);
            this.data.set(file.name, data);
        });
    }

    has(has) {
        return this.data.has(has);
    }

    get(get) {
        return this.data.get(get);
    }

    begin() {
        this.data.forEach(b => b.begin());
    }

    get stations() {
        return Array.from(this.data.keys());
    }
}

module.exports = BroadcastsManager;
