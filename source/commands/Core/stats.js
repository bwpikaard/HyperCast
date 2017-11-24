const Command = require("../structures/Command");

module.exports = class extends Command {
    constructor(client, filePath) {
        super(client, filePath, {
            name: "stats",
            aliases:['info']
        });
    }

    async execute(message, response) {
        response.send(`I'm currently streaming to **${this.client.shardData.voiceConnections} channels** and in **${this.client.shardData.guilds} servers**.`);
    }
};
