const Command = require("../../structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: "stations",
            dm: true
        });
    }

    async execute(message, permissionLevel) {
      
    }
};
