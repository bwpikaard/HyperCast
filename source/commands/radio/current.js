const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "current",
            aliases: ["song", "np", "playing"]
        });
    }

    async execute(message, permissionLevel) {
        if (!message.guild.voiceConnection) return message.reply("Nothing is currently playing.");

        const station = message.guild.voiceConnection.station;
        if (!station) message.error("An error occured.");



        // message.reply(`Playing **${}** on the **${station}** station.`)
    }
};
