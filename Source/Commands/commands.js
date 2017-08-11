module.exports = (message, response) => {
    let list = Array.from(this.client.commandsManager.data.keys()).filter(c => !this.client.commandsManager.data.get(c).permission).map(c => `\`${c}\``).join(", ");

    response.reply(`**Here's my current commands:**\n${list}`);
};

module.exports.init = (client, path) => { this.client = client; module.exports.path = path; };

module.exports.aliases = ["cmds"];
