const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "kill",
            dm: true,
            permission: 10
        });
    }

    async execute(message, permissionLevel) {
        console.error("Kill command executed.");
        message.reply("Killing process.").then(() => process.exit());
    }
};