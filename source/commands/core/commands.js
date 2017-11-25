const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Lists all commands available.",
            usage: "commands",
            dm: true,
            mode: "strict"
        });
    }

    async execute(message, permissionLevel) {
        message.buildEmbed()
            .setColor(0x52C7CE)
            .setTitle(`${this.client.user.username}`)
            .addField("» Commands", this.client.commands.map(c => c.name).join(', '), true)
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
            .setTimestamp()
            .send();
    }
};
