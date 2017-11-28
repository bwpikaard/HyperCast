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
        message.buildEmbed()
            .addField("» Stations", this.client.stations.keyArray().join(", "), true)
            .send();

    }
};
