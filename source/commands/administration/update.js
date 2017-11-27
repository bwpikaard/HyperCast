const Command = require("../../structures/Command");
const { exec } = require("child_process");
const { join } = require("path");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            dm: true,
            aliases: ["pull"],
            permission: 10
        });
    }

    execute(message, permissionLevel) {
        const restart = /update\s+(?:-r|--restart)/.test(message.content);

        const path = process.cwd();

        exec("git pull", { cwd: path }, (err, stdout, stderr) => {
            if (err) return console.error(err);

            const embed = message.buildEmbed().setTitle(`${this.client.user.username} Updater`);

            if (stdout) embed.addField("» STDOUT", stdout.toString().substring(0, 1024));
            if (stderr) embed.addField("» STDERR", stderr.toString().substring(0, 1024));

            if (restart) embed.addField("\u200B", "Restarting now...");

            if (restart) exec(`pm2 restart ${this.client.config.pm2Process}`,
                { cwd: path, env: { HOME: this.client.config.dirHOME } },
                (err, stdout, stderr) => {
                    if (err) return console.error(err);
                }
            );

            embed.send();
        });
    }
};
