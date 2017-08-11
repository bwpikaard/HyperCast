module.exports = (message, response) => {
    if (!message.guild.voiceConnection) return response.reply("Nothing is currently playing.");

    let station = message.guild.voiceConnection.station;
    if (!station) response.error("An error occured.");

    let broadcast = this.client.broadcastsManager.get(station);

    response.reply(`Playing **${broadcast.current.title}** on the **${station}** station.`);
};

module.exports.init = (client, path) => { this.client = client; module.exports.path = path; };

module.exports.aliases = ["np"];
