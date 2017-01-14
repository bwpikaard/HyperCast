module.exports = (message, response) => {
    response.send(`\`\`\`autohotkey\n${this.client.broadcastsManager.stations.join("\n")}\n\`\`\``);
};

module.exports.init = (client, path) => { this.client = client; module.exports.path = path; };
