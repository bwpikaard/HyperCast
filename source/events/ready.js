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

        setInterval(() => this.client.voiceConnections.filter(c => c.channel.members.filter(u => !u.user.bot).size === 0).forEach(v => v.disconnect()), 10000);

        setInterval(() => this.client.transmitStats(), 5000);
    }
}

module.exports = New;