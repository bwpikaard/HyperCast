const Command = require("../../structures/Command");
const { loadavg } = require('os');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Get HyperCast's current statistics.",
            usage: "stats",
            dm: true
        });
    }

    async execute(message, response) {
        message.buildEmbed()
            .setColor(0x52C7CE)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setTitle(`${this.client.user.username} Statistics`)
            .addField("» Uptime", this.client.functions.convertTime(this.client.uptime), true)
            .addField("» Servers", `${this.client.shardData.guilds.toLocaleString()} (${this.client.shardCount} Shard${this.client.shardCount > 1 ? "s" : ""})`, true)
            .addField("» Voice Connections", `${this.client.shardData.voiceConnections.toLocaleString()}`, true)
            .addField("» Library", "discord.js", true)
            .addField("» Created By", (await this.client.fetchApplication()).owner.tag, true)
            .addField("» Shard", `${this.client.shardNumber} / ${this.client.shardCount}`, true)
            .addField("» Servers on Shard", `${this.client.guilds.size.toLocaleString()}`, true)
            .addField("» Channels on Shard", `${this.client.channels.size.toLocaleString()}`, true)
            .addField("» Users on Shard", `${this.client.users.size.toLocaleString()}`, true)
            .addField("» CPU Usage", `${Math.round(loadavg()[0] * 10000) / 100}%`, true)
            .addField("» RAM (Used)", `${Math.round(100 * (process.memoryUsage().heapUsed / 1048576)) / 100}MB`, true)
            .addField("» RAM (Total)", `${Math.round(100 * (process.memoryUsage().heapTotal / 1048576)) / 100}MB`, true)
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
            .setTimestamp()
            .send();
    }
};
