const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "leave",
            aliases: []
        });
    }

    async execute(message, permissionLevel) {
        const connection = message.guild.voiceConnection;
        if (!connection) return message.error("I am not in a voice channel in this server.");
        
        connection.disconnect();
    }
};
