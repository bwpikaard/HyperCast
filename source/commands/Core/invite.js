const Command = require("../structures/Command");

module.exports = class extends Command {
    constructor(client, filePath) {
        super(client, filePath, {
            name: "invite"
        });
    }

    async execute(message, response) {
        response.reply(`Invite me here: <https://typicalbot.com/hypercast/>`);
    }
};
