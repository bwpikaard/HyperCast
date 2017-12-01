const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "reload <command>",
            dm: true,
            permission: 10
        });
    }

    async execute(message, permissionLevel) {
        const command = message.content.slice(message.content.search(" ") + 1);
        const cmd = await this.client.commands.get(command);
        command === "all" ? this.client.commands.loadAll() : this.client.commands.reload(cmd);
    }
};
