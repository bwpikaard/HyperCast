const Command = require("../structures/Command");

module.exports = class extends Command {
    constructor(client, filePath) {
        super(client, filePath, {
            name: "reload"
        });
    }

    async execute(message, response) {
        const command = message.content.slice(message.content.search(" ") + 1);
        const cmdPath = await this.client.commandsManager.get(command);
        // console.log(cmdPath.path);
        command === "all" ? this.client.commandsManager.reloadAll() : this.client.commandsManager.reload(cmdPath.path);
    }
};
