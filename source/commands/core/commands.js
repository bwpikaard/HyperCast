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
        message.reply(`**Here's my current commands:**\n${this.client.commands.map(c => c.name).join(', ')}`);
    }
};
