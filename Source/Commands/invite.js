module.exports = (message, response) => {
    response.reply(`Invite me here: <https://typicalbot.com/hypercast/>`);
};

module.exports.init = (client, path) => { this.client = client; module.exports.path = path; };
