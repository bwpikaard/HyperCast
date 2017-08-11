module.exports = (message, response) => {
    if (!message.guild.voiceConnection) return response.reply("Nothing is currently playing.");

    try {
        let station = message.guild.voiceConnection.station;
        if (!station) response.error("An error occured.");

        let match = /volume\s+(\d+)/i.exec(message.content);
        if (!match) return response.error("No volume provided.");

        let volume = match[1];

        if (volume < 0 || volume > 200) return response.error("Volume must be from 0% to 200%.");

        let broadcast = this.client.broadcastsManager.get(station).dispatcher;

        let dispatcher = broadcast.dispatchers.filter(d => d.player.voiceConnection.channel.guild.id === message.guild.id)[0].setVolume(volume * 0.01);

        response.reply(`Changed volume to ${volume}%.`);
    } catch(err) {
        response.error(err);
    }


};

module.exports.init = (client, path) => { this.client = client; module.exports.path = path; };
