const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "volume",
            aliases: ["vol", "v"]
        });
    }

    async execute(message, permissionLevel) {
        // Place holder
    }
};
