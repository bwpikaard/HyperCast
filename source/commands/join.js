module.exports = (message, response) => {
    if (message.guild.voiceConnection) return response.error("I am already in a channel here!");

    let channel = message.member.voiceChannel;
    if (!channel) return response.error("You are not in a voice channel!");

    let station = message.content.split(" ")[1] || "electro";
    if (!this.client.broadcastsManager.has(station)) return response.error(`Invalid station. Possible stations: ${this.client.broadcastsManager.stations.join(", ")}`);

    let broadcast = this.client.broadcastsManager.get(station).dispatcher;

    channel.join().then(connection => {
        connection.station = station;
        response.send(`Connected to station **${station}**.`);
        setTimeout(() => connection.playBroadcast(broadcast), 1000);
    }).catch(err => {
        response.error(`Error occured:\n\n${err.stack}`);
    });
};

module.exports.init = (client, path) => { this.client = client; module.exports.path = path; };
