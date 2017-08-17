module.exports = (message, response) => {
    console.error("Kill command executed.");
    response.reply("Killing process.").then(() => process.exit());
};

module.exports.init = (client, path) => { this.client = client; module.exports.path = path; };

module.exports.permission = 3;
