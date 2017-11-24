const Command = require("../structures/Command");

module.exports = class extends Command {
    constructor(client, filePath) {
        super(client, filePath, {
            name: "kill"
        });
    }

    async execute(message, response) {
        console.error("Kill command executed.");
        response.reply("Killing process.").then(() => process.exit());
    }
};
