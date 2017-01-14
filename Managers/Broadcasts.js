const fs = require("fs-extra-promise");
const path = require("path");
const stations = path.resolve(`${__dirname.replace(/\/\w+$/, ``)}/Stations/`);

const Broadcast = require("./Broadcast");

class BroadcastsManager {
    constructor(client) {
        this.client = client;

        this.data = new Map();

        this.load();
    }

    load() {
        fs.walk(stations).on("data", item => {
            let file = path.parse(item.path);
            if (!file.ext || file.ext !== ".json") return;

            let songs = require(`${file.dir}${path.sep}${file.base}`);
            let data = new Broadcast(this.client, file.name, songs);
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
