module.exports = (message, response) => {
    let connection = message.guild.voiceConnection;
    if (!connection) return response.error("I am not in a voice channel in this server.");

    let station = message.content.split(" ")[1] || "electro";
    if (!this.client.broadcastsManager.has(station)) return response.error(`Invalid station. Possible stations: ${this.client.broadcastsManager.stations.join(", ")}`);

    let broadcast = this.client.broadcastsManager.get(station).dispatcher;

    connection.playBroadcast(broadcast);
    connection.station = station;
};

module.exports.init = (client, path) => { this.client = client; module.exports.path = path; };
