class Response {
    constructor(message) {
        this.message = message;
    }

    send(content, embed) {
        return embed ?
            this.message.channel.send(content, { embed }) :
            this.message.channel.send(content);
    }

    reply(content) {
        return this.send(`${this.message.author} | ${content}`);
    }

    error(content, embed) {
        return this.send(`${this.message.author} | \`❌\` | ${content}`, embed);
    }

    dm(content, embed) {
        return embed ?
            this.message.author.send(content, { embed }) :
            this.message.author.send(content);
    }
}

module.exports = Response;
