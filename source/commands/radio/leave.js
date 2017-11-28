const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "leave",
            aliases: ["out", "bye", "depart", "scram", "begone", "die"]
        });
    }

    async execute(message, permissionLevel) {
        const connection = message.guild.voiceConnection;
        if (!connection) return message.error("I am not in a voice channel in this server.");

        connection.disconnect();
        message.reply("Leaving voice channel.");
    }
};
