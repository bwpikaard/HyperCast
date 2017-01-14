module.exports = (message, response) => {
    let command = message.content.slice(message.content.search(" ") + 1);

    command === "all" ? this.client.commandsManager.loadAll() : this.client.commandsManager.reload(command);
};

module.exports.init = (client, path) => { this.client = client; module.exports.path = path; };

module.exports.permission = 3;
