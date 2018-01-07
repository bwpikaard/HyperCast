const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "stations",
            aliases: ["playlists", "genres"],
            dm: true
        });
    }

    async execute(message, permissionLevel) {
        const perms = message.channel.permissionsFor(message.client.user).has("EMBED_LINKS");
        if (perms) {
            message.buildEmbed()
                .addField("» Stations", this.client.stations.keyArray().join(", "), true)
                .send();
        } else {
            message.channel.send(`» Stations\n${this.client.stations.keyArray().join(", ")}`);
        }

    }
};
