const Event = require("../structures/Event");

class New extends Event {
    constructor(client, name) {
        super(client, name);

        this.once = true;
    }

    async execute() {
        this.client.log(`Client Connected | Shard ${this.client.shardNumber} / ${this.client.shardCount} | Guilds: ${this.client.guilds.size}`);
        this.client.user.setActivity(`Client Started`);
        this.client.transmitStats();
        
        setInterval(() => {
            this.client.user.setActivity(`${this.client.config.prefix}help | ${this.client.shardData.guilds} Servers`);
        }, 1000 * 60 * 5);
    }
}

module.exports = New;
