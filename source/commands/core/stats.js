const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Provides statistics of the bot.",
            usage: "stats",
        });
    }

    async execute(message, response) {
        message.reply(`I'm currently streaming to **${this.client.shardData.voiceConnections} channels** and in **${this.client.shardData.guilds} servers**.`);
    }
};
