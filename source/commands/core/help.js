const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Lists all commands available.",
            usage: "commands",
            aliases: ["invite", "halp"],
            dm: true
        });
    }

    async execute(message, permissionLevel) {
        const perms = message.channel.permissionsFor(message.client.user).has("EMBED_LINKS");
        if (perms) {
            message.buildEmbed()
                .addField("» Help", `**Hello!** I'm ${this.client.user.username}, a bot created by ${(await this.client.fetchApplication()).owner.tag}. My purpose is to serve as a radio bot. I have multiple stations, or genres, that you can listen to at any time. You can get a list of my commands by using \`${this.client.config.prefix}commands\`.\n\nI'll join your channel if you give me the command \`${this.client.config.prefix}tune <station>\` and I'll switch your stations with \`${this.client.config.prefix}tune <new station>\`.\n\nYou can invite me by clicking [here](<https://dashboard.typicalbot.com/invite/hypercast/>).\n\nYou can join my server [here](<https://discord.gg/typicalbot>).`, true)
                .send();
        } else {
            message.channel.send(`» Help\n**Hello!** I'm ${this.client.user.username}, a bot created by ${(await this.client.fetchApplication()).owner.tag}. My purpose is to serve as a radio bot. I have multiple stations, or genres, that you can listen to at any time. You can get a list of my commands by using \`${this.client.config.prefix}commands\`.\n\nI'll join your channel if you give me the command \`${this.client.config.prefix}tune <station>\` and I'll switch your stations with \`${this.client.config.prefix}tune <new station>\`.\n\nYou can invite me by clicking <https://dashboard.typicalbot.com/invite/hypercast/>.\n\nYou can join my server <https://discord.gg/typicalbot>.`);
        }
    }
};
