module.exports = (message, response) => {
    response.send(`\`\`\`autohotkey\n• ${this.client.guilds.size} Servers\n• ${this.client.voiceConnections.size} Connections\n\`\`\``);
};

module.exports.init = (client, path) => { this.client = client; module.exports.path = path; };
