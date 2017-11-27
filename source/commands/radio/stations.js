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
            .addField("» Stations", this.client.stations.keyArray().join(", "), true)
            .send();

    }
};
