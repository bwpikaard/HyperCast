module.exports = (message, response) => {
    response.send(`I'm currently stream to **${this.client.voiceConnections.size} channels** and in **${this.client.guilds.size} servers**.`);
};

module.exports.init = (client, path) => { this.client = client; module.exports.path = path; };
