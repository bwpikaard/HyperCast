const Command = require("../structures/Command");

module.exports = class extends Command {
    constructor(client, filePath) {
        super(client, filePath, {
            name: "commands"
        });
    }

    async execute(message, response) {
        const list = Array.from(this.client.commandsManager.data.keys()).filter(c => !this.client.commandsManager.data.get(c).permission).map(c => `\`${c}\``).join(", ");
      
        response.reply(`**Here's my current commands:**\n${list}`);
    }
};
