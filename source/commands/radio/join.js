const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "join <station>",
            dm: true
        });
    }

    async execute(message, permissionLevel) {
        if (message.guild.voiceConnection) return message.error("I am already in a channel here!");
        const channel = message.member.voiceChannel;
        if (!channel) return message.error("You are not in a voice channel!");

        channel.join().then(conn => {
            // Music stuff here.
            setTimeout(() => message.reply('Ready!'), 1000);
        }).catch(o_O => {
            message.error(`Error occured: \n\n${o_O.stack}`);
        });
    }
};
