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
        const channel = message.member.voiceChannel;
        if (!channel) return message.error("You are not in a voice channel!");

        const station = message.content.split(" ")[1] || "electro";

        if (!this.client.stations.keyArray().includes(station)) return message.error(`Invalid station. Possible stations: ${this.client.stations.keyArray().join(", ")}`);

        const broadcast = this.client.stations.get(station).dispatcher;

        const currConn = message.guild.voiceConnection;

        if (currConn) {
            currConn.station = station;

            message.reply(`Retuning to the ${station} station.`);
            
            currConn.playBroadcast(broadcast);
        } else {
            if (channel.members.filter(u => u.user.bot).size > 0) return message.error("I cannot join because another bot is present.");
            channel.join().then(conn => {
                conn.station = station;

                message.reply(`Tuning to the ${station} station.`);
                
                setTimeout(() => conn.playBroadcast(broadcast), 1000);
            }).catch(err => {
                message.error(`An error occured while joining the voice channel. Make sure I have permissions to join and speak.`);
            });

        }
    }
};
