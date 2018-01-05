const Event = require("../structures/Event");

class New extends Event {
    constructor(client, name) {
        super(client, name);

        this.mentionRegex = new RegExp(`^<@!?${this.client.config.id}>$`);
    }

    async execute(message) {
        if (message.author.bot) return;

        if (message.channel.type === "dm") {
            if (!message.content.startsWith(this.client.config.prefix)) return;

            const command = await this.client.commands.get(message.content.split(" ")[0].slice(this.client.config.prefix.length));
            if (!command || !command.dm || command.permission > 0) return;

            command.execute(message);
        } else {
            if (!message.guild.me) return;
            if (!message.content.startsWith(this.client.config.prefix)) return;
            if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
            if (!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.error("I use embeds to reply to messages. Please give me permissions to embed links.");

            if (message.content.match(this.mentionRegex)) return message.reply(`The prefix to use my commands is \`${this.client.config.prefix}\`.`);


            const userPermissions = this.client.permissionsManager.get(message.guild, message.author);
            if (userPermissions.level === -1) return;

            const split = message.content.split(" ")[0];

            const command = await this.client.commands.get(split.slice(this.client.config.prefix.length).toLowerCase());
            if (!command) return;

            //const accessLevel = this.client.functions.fetchAccess(message.guild);
            //if (command.access && accessLevel.level < command.access) return message.error(`The server owner's access level is too low to execute that command. The command requires an access level of ${command.access}, but the owner only has a level of ${accessLevel.level} (${accessLevel.title}). The owner can raise their access level by donating $5 or more to TypicalBot.`);

            if (userPermissions.level < command.permission) return message.error(this.client.functions.error("perms", command, userPermissions));

            const actualUserPermissions = this.client.permissionsManager.get(message.guild, message.author, true);
            if (actualUserPermissions.level < command.permission) return message.error(this.client.functions.error("perms", command, actualUserPermissions));

            command.execute(message, userPermissions);
        }
    }
}

module.exports = New;
