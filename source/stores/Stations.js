const Store = require("../structures/Store");
const path = require("path");

class StationStore extends Store {
    constructor(client) {
        super(client, "stations", path.join(__dirname, "..", "stations"));

        this.loadAll("json");
    }
}


module.exports = StationStore;