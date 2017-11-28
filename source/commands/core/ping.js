const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Responds with the command execution time and Discord API latency.",
            usage: "ping",
            aliases: ["pong"],
            dm: true
        });
    }

    async execute(message, permissionLevel) {
        const msg = await message.send("Pinging...");
        msg.edit(`Command Execution Time : ${msg.createdTimestamp - message.createdTimestamp}ms | Discord API Latency : ${Math.floor(this.client.pings[0])}ms`);
    }
};
