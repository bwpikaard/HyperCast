const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "current",
            aliases: ["song", "np"]
        });
    }

    async execute(message, permissionLevel) {

    }
};
