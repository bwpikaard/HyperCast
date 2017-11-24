const Command = require("../structures/Command");

module.exports = class extends Command {
    constructor(client, filePath) {
        super(client, filePath, {
            name: "stations",
            aliases: ['playlists', 'genres']
        });
    }

    async execute(message, response) {
        response.send(`\`\`\`autohotkey\n${this.client.broadcastsManager.stations.join("\n")}\n\`\`\``);
    }
};
