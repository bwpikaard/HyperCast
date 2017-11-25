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
            .setTitle(`${this.client.user.username} Commands`)
            .addField("» Commands", this.client.commands.filter(c => !c.permission || c.permission < 5).map(c => c.name).sort().join(', '), true)
            .send();
    }
};
