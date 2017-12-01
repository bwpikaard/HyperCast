const Event = require("../structures/Event");

class New extends Event {
    constructor(client, name) {
        super(client, name);
    }

    async execute(guild) {
        //if (this.client.build === "stable") this.client.functions.postStats("a");
        
        this.client.transmitStats();
    }
}

module.exports = New;
