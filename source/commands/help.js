const Command = require("../structures/Command");

module.exports = class extends Command {
    constructor(client, filePath) {
        super(client, filePath, {
            name: "help",
            aliases: ['h']
        });
    }

    async execute(message, response) {
        response.send(`**Hello!** I'm ${this.client.user.username}, a bot created by HyperCoder#2975. My purpose is to serve as a radio bot. I have multiple stations, or genres, that you can listen to at any time. You can get a list of my commands by using \`${this.client.config.prefix}commands\`. You can invite me by going to <https://typicalbot.com/bots/hypercast/>. You can join my server at <https://typicalbot.com/join-us/hypercast>. I'll join your channel if you give me the command \`${this.client.config.prefix}join <station>\` and I'll switch your stations with \`${this.client.config.prefix}station <station>\`.`);
    }
};
