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
            .setColor(0x00adff)
            .setThumbnail("https://cdn.discordapp.com/avatars/264207339068981251/d713c324d601c7b9b7249017693c2df6.png")
            .setTitle("HyperCast Statistics")
            .addField("» Uptime", this.client.functions.convertTime(this.client.uptime), true)
            .addField("» Servers", `${this.client.shardData.guilds.toLocaleString()} (${this.client.shardCount} Shard${this.client.shardCount > 1 ? "s" : ""})`, true)
            .addField("» Servers", `${this.client.shardData.voiceConnections.toLocaleString()}`, true)
            .addField("» Library", "discord.js", true)
            .addField("» Created By", "HyperCoder#2975", true)
            .addField("» Shard", `${this.client.shardNumber} / ${this.client.shardCount}`, true)
            .addField("» Servers on Shard", `${this.client.guilds.size.toLocaleString()}`, true)
            .addField("» Channels on Shard", `${this.client.channels.size.toLocaleString()}`, true)
            .addField("» Users on Shard", `${this.client.users.size.toLocaleString()}`, true)
            .addField("» CPU Usage", `${Math.round(loadavg()[0] * 10000) / 100}%`, true)
            .addField("» RAM (Used)", `${Math.round(100 * (process.memoryUsage().heapUsed / 1048576)) / 100}MB`, true)
            .addField("» RAM (Total)", `${Math.round(100 * (process.memoryUsage().heapTotal / 1048576)) / 100}MB`, true)
            .setFooter("HyperCast", "https://cdn.discordapp.com/avatars/264207339068981251/d713c324d601c7b9b7249017693c2df6.png")
            .setTimestamp()
            .send();
    }
};
