module.exports = (message, response) => {
    response.send("Pinging...").then(msg => {
        msg.edit(`Pong! | Took ${msg.createdTimestamp - message.createdTimestamp}ms.`);
    });
};

module.exports.init = (client, path) => { this.client = client; module.exports.path = path; };
