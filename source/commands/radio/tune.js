const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "tune",
            aliases: ['stations'],
            dm: true
        });
    }

    async execute(message, permissionLevel) {
      
    }
};
