const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "tune <station>",
            aliases: ["join"],
            dm: true
        });
    }

    async execute(message, permissionLevel) {
        if (message.guild.voiceConnection) return message.error("I am already in a channel here!");
        const channel = message.member.voiceChannel;
        if (!channel) return message.error("You are not in a voice channel!");

        const station = message.content.split(" ")[1] || "electro";
        if (!this.client.stations.keyArray().includes(station)) return message.error(`Invalid station. Possible stations: ${this.client.stations.keyArray().join(", ")}`);

        channel.join().then(conn => {
            // Music stuff here.
            setTimeout(() => message.reply(`Playing ${station}`), 1000);
        }).catch(o_O => {
            message.error(`Error occured: \n\n${o_O.stack}`);
        });
    }
};
