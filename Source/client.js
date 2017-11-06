const Discord = require("discord.js");

let CommandsManager = require("./Managers/Commands");
let MessagesManager = require("./Managers/Messages");
let BroadcastsManager = require("./Managers/Broadcasts");

const client = new class extends Discord.Client {
    constructor() {
        super({ messageCacheMaxSize: 1 });

        this.shardData;
        this.shardID = process.env.SHARD_ID;
        this.shardCount = process.env.SHARD_COUNT;

        this.config = require("../config.json");
        this.commandsManager = new CommandsManager(this);
        this.messagesManager = new MessagesManager(this);
        this.broadcastsManager = new BroadcastsManager(this);

        this.once("ready", () => {
            setTimeout(() => this.broadcastsManager.begin(), 5000);
        })

        .on("message", message => this.messagesManager.process(message))
        .on("ready", () => {
            this.log("Client Connected");

            setInterval(() => this.transmit("voiceConnections"), 10000);
            this.transmit("guilds");

            this.user.setActivity(`Client Connecting`);
            setTimeout(() => this.user.setActivity(`${this.config.prefix}help | ${this.shardData.guilds} Servers`), 10000);
            setInterval(() => this.user.setActivity(`${this.config.prefix}help | ${this.shardData.guilds} Servers`), 300000);
        })
        .on("error", err => this.log(err, true))
        .on("warn", err => this.log(err, true))
        .on("disconnect", () => this.log("Disconnected!"))
        .on("reconnecting", () => this.log("Reconnecting!"));

        this.login(this.config.token);
    }

    transmit(stat) {
        process.send({
            "type": "stat",
            "data": {
                [stat]: this[stat].size
            }
        });
    }

    log(content, error = false) {
        if (error) return console.error(`SHARD ${this.shardID} | ${content}`);
        return console.log(`SHARD ${this.shardID} | ${content}`);
    }

    reload(mod) {
        let all = mod === "all";
        if (all || mod === "commands") {
            return this.commands.reloadAll();
        }
        if (all || mod === "config") {
            delete require.cache[`${__dirname}/config.json`];
            return this.config = require("./config.json");
        }
    }
};

process.on("message", message => {
    if (message.type === "stats") client.shardData = message.data;
});
