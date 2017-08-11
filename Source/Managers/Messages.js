class Response {
    constructor(message) { this.message = message; }
    send(content, embed) { return embed ? this.message.channel.send(content, { embed }) : this.message.channel.send(content); }
    reply(content) { return this.send(`${this.message.author} | ${content}`); }
    error(content, embed) { return this.send(`${this.message.author} | \`❌\` | ${content}`, embed); }
    dm(content, embed) { return embed ? this.message.author.send(content, { embed }) : this.message.author.send(content); }
}

class MessagesManager {
    constructor(client) {
        this.client = client;
    }

    userlevel(user) {
        let lvluser = this.client.config.levels[user.id];
        return lvluser ? lvluser.level : 0;
    }

    process(message) {
        if (message.author.bot || !message.content.startsWith(this.client.config.prefix) || message.channel.type !== "text") return;
        let level = this.userlevel(message.author);

        let cstr = message.content.split(" ")[0].slice(this.client.config.prefix.length);

        let response = new Response(message);

        this.client.commandsManager.get(cstr).then(command => {
            if (!command) return;

            if (command.permission && level < command.permission) return response.error("Invalid permissions.");

            command(message, response, level);
        });
    }
}

module.exports = MessagesManager;
