module.exports = (message, response) => {
    response.send(`I'm currently streaming to **${this.client.shardData.voiceConnections} channels** and in **${this.client.shardData.guilds} servers**.`);
};

module.exports.init = (client, path) => { this.client = client; module.exports.path = path; };
