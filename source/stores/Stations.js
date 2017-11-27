const Store = require("../structures/Store");
const Station = require("../structures/Stations");
const path = require("path");

class StationStore extends Store {
    constructor(client) {
        super(client, "stations", path.join(__dirname, "..", "stations"));

        this.loadAll("json").then(() => {
            this.keyArray().forEach(s => this.set(s, new Station(client, s, this.get(s))));
        });
    }
}


module.exports = StationStore;