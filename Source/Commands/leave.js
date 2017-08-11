module.exports = (message, response) => {
    let connection = message.guild.voiceConnection;
    if (!connection) return response.error("I am not in a voice channel in this server.");

    connection.disconnect();
};

module.exports.init = (client, path) => { this.client = client; module.exports.path = path; };
