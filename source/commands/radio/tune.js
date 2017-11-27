const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "tune",
            aliases: ["stations"],
            dm: true
        });
    }

    async execute(message, permissionLevel) {
        message.buildEmbed()
            .setTitle(`${this.client.user.username} Stations`)
            .addField("» Stations", this.client.stations.keyArray().join(", "), true)
            .send();

    }
};
