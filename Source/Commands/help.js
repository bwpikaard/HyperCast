module.exports = (message, response) => {
    response.send(`**Hello!** I'm HyperCast, a bot created by HyperCoder#2975. My purpose is to serve as a radio bot. I have multiple stations, or genres, that you can listen to at any time. You can get a list of my commands by using \`h!commands\`. You can invite me by going to <https://typicalbot.com/bots/hypercast/>. You can join my server at <https://typicalbot.com/join-us/hypercast>. I'll join your channel if you give me the command \`h!join <station>\` and I'll switch your stations with \`h!station <station>\`.`);
};

module.exports.init = (client, path) => { this.client = client; module.exports.path = path; };
