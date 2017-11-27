const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "join <station>",
            dm: true
        });
    }

    async execute(message, permissionLevel) {
        console.log('fired');
        if (message.guild.voiceConnection) return message.error("I am already in a channel here!");
        const channel = message.member.voiceChannel;
        if (!channel) return message.error("You are not in a voice channel!");
    }
};
