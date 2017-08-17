const Command = require("../structures/Command");

module.exports = class extends Command {
    constructor(client, filePath) {
        super(client, filePath, {
            name: "ping"
        });
    }

    async execute(message, response) {
        const msg = await response.send("Pinging...");
        msg.edit(`Command Execution Time : ${msg.createdTimestamp - message.createdTimestamp}ms | Discord API Latency : ${Math.floor(this.client.pings[0])}ms`);
    }
};
