const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "station"
        });
    }

    async execute(message, permissionLevel) {
        // Place holder
    }
};
