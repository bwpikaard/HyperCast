const Command = require("../../structures/Command");
const util = require("util");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            dm: true,
            permission: 10
        });
    }

    execute(message, permissionLevel) {
        const code = message.content.slice(message.content.search(" ") + 1);
        try {
            const output = eval(code);

            output instanceof Promise ?
                output.then(a => {
                    message.embed({
                        "color": 0x00FF00,
                        "description": `\n\n\`\`\`js\n${util.inspect(a, { depth: 0 })}\n\`\`\``,
                        "footer": {
                            "text": `${this.client.user.username} Eval`,
                            "icon_url": this.client.user.displayAvatarURL()
                        }
                    }).catch(err => {
                        message.embed({
                            "color": 0xFF0000,
                            "description": `\`\`\`\n${err.stack}\n\`\`\``,
                            "footer": {
                                "text": `${this.client.user.username} Eval`,
                                "icon_url": this.client.user.displayAvatarURL()
                            }
                        });
                    });
                }).catch(err => {
                    message.embed({
                        "color": 0xFF0000,
                        "description": `\n\n\`\`\`\n${err ? err.stack : `Unknown Error`}\n\`\`\``,
                        "footer": {
                            "text": `${this.client.user.username} Eval`,
                            "icon_url": this.client.user.displayAvatarURL()
                        }
                    });
                }) :
                output instanceof Object ?
                    message.embed({
                        "color": 0x00FF00,
                        "description": `\`\`\`js\n${util.inspect(output, { depth: 0 })}\n\`\`\``,
                        "footer": {
                            "text": `${this.client.user.username} Eval`,
                            "icon_url": this.client.user.displayAvatarURL()
                        }
                    }) :
                    message.embed({
                        "color": 0x00FF00,
                        "description": `\`\`\`\n${output}\n\`\`\``,
                        "footer": {
                            "text": `${this.client.user.username} Eval`,
                            "icon_url": this.client.user.displayAvatarURL()
                        }
                    });
            //message.send(`\`INPUT:\`\n\`\`\`\n${code}\n\`\`\`\n\`OUTPUT:\`\n\`\`\`\n${typeof output === "object" ? JSON.stringify(output, null, 4) : output}\n\`\`\``);
        } catch (err) {
            message.embed({
                "color": 0xFF0000,
                "description": `\`\`\`\n${err.stack}\n\`\`\``,
                "footer": {
                    "text": `${this.client.user.username} Eval`,
                    "icon_url": this.client.user.displayAvatarURL()
                }
            }).catch(err => {
                message.reply("Cannot send embeds.");
            });

            //message.send(`\`INPUT:\`\n\`\`\`\n${code}\n\`\`\`\n\`ERROR:\`\n\`\`\`${err}\n\`\`\``);
        }
    }
};
