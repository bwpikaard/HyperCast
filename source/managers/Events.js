const Response = require("../structures/Response");

class Events {
    constructor(client) {
        this.client = client;
    }

    ready() {
        this.client.log(`Client connected with ${this.client.guilds.size} guilds, ${this.client.channels.size} channels, and ${this.client.users.size} users.`);
        this.client.user.setActivity(`Client Connecting`);
        this.client.transmitStats();

        setInterval(() => this.client.transmitStats(), 1000 * 30);

        setInterval(() => {
            this.client.user.setGame(`${this.config.prefix}help | ${this.shardData.guilds} Servers`);
        }, 1000 * 60 * 2);
    }

    async message(message) {
        if (message.author.bot) return;

        if (!message.content.startsWith(this.client.config.prefix)) return;

        if (message.channel.type !== "text") return;

        const response = new Response(message);

        const split = message.content.split(" ")[0];
        if (!message.content.startsWith(this.client.config.prefix)) return;

        const command = await this.client.commandsManager.get(split.slice(this.client.config.prefix.length).toLowerCase());
        if (!command) return;

        command.execute(message, response);
    }

    voiceConnectionUpdate() {
        this.client.transmit("voiceConnections");
    }
}

module.exports = Events;
