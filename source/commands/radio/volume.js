const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "volume",
            aliases: ["vol", "v"]
        });
    }

    async execute(message, permissionLevel) {
        if (!message.guild.voiceConnection) return message.reply("Nothing is currently playing.");

        const volume = message.content.split(" ")[1];
        if (!volume) return message.reply(`The current volume is ${message.guild.voiceConnection.dispatcher.volume * 100}%`);

        if (isNaN(volume) && (volume < 0 || volume > 200)) return message.error("Volume must be from 0% to 200%.");

        message.guild.voiceConnection.dispatcher.setVolume(volume / 100);

        message.reply(`Changed volume to ${volume}%.`);
    }
};
