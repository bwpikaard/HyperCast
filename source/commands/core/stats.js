const Command = require("../../structures/Command");
const { loadavg } = require('os');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Get the current statistics of the bot.",
            usage: "stats",
            aliases: ["info", "specs"],
            dm: true
        });
    }

    async execute(message, permissionLevel) {
        const perms = message.channel.permissionsFor(message.client.user).has("EMBED_LINKS");
        if (perms) {
            message.buildEmbed()
                .setTitle("Statistics")
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
                .send();
        } else {
            message.channel.send(`Statistics
» Uptime: ${this.client.functions.convertTime(this.client.uptime)}
» Servers: ${this.client.shardData.guilds.toLocaleString()} (${this.client.shardCount} Shard${this.client.shardCount > 1 ? "s" : ""})
» Voice Connections: ${this.client.shardData.voiceConnections.toLocaleString()}
» Library: discord.js
» Created By: ${(await this.client.fetchApplication()).owner.tag}
» Shard: ${this.client.shardNumber} / ${this.client.shardCount}
» Servers on Shard: ${this.client.guilds.size.toLocaleString()}
» Channels on Shard: ${this.client.channels.size.toLocaleString()}
» Users on Shard: ${this.client.users.size.toLocaleString()}
» CPU Usage: ${Math.round(loadavg()[0] * 10000) / 100}%
» RAM (Used): ${Math.round(100 * (process.memoryUsage().heapUsed / 1048576)) / 100}MB
» RAM (Total): ${Math.round(100 * (process.memoryUsage().heapTotal / 1048576)) / 100}MB`);
        }
    }
};
