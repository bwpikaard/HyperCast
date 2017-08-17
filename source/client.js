require("./utility/Extenders.js");

const { Client, Collection } = require("discord.js");

//let Database = require("./managers/Database");

let EventsManager = require("./managers/Events");
let CommandsManager = require("./managers/Commands");
//let SettingsManager = require("./managers/Settings");
let BroadcastsManager = require("./managers/Broadcasts");

let Functions = require("./utility/Functions");

const client = new class extends Client {
    constructor() {
        super({ messageCacheMaxSize: 150 });

        this.build = process.env.CLIENT_BUILD;
        this.config = require(`../configs/${this.build}`);

        this.shardID = +process.env.SHARD_ID;
        this.shardNumber = +process.env.SHARD_ID + 1;
        this.shardCount = +process.env.SHARD_COUNT;

        //this.database = new Database();

        this.eventsManager = new EventsManager(this);
        this.commandsManager = new CommandsManager(this);
        //this.settingsManager = new SettingsManager(this);
        this.broadcastsManager = new BroadcastsManager(this);

        this.functions = new Functions(this);

        this.shardData = {};

        /*this.once("ready", () => {
            setTimeout(() => this.broadcastsManager.begin(), 5000);
        })*/
        this.once("ready", () => this.eventsManager.ready())
        .on("message", message => this.eventsManager.message(message))
        .on("error", err => this.log(err, true))
        .on("warn", err => this.log(err, true))
        .on("disconnect", () => this.log("Disconnected!"))
        .on("reconnecting", () => this.log("Reconnecting!"));

        this.login(this.config.token);
    }

    log(content, error = false) {
        error ?
            console.error(`SHARD ${this.shardID} | ${content}`) :
            console.log(`SHARD ${this.shardID} | ${content}`);
    }

    transmit(type, data = {}) {
        process.send({ type, data });
    }

    transmitStat(stat) {
        this.transmit("stat", { [stat]: this[stat].size });
    }

    transmitStats() {
        this.transmit("stats", {
            guilds: this.guilds.size,
            channels: this.channels.size,
            voiceConnections: this.voiceConnections.size,
            users: this.users.size
        });
    }

    reload(input) {
        const match = /(\w+)(?::(\w+))?/i.exec(input);
        if (!match && input !== "all") return;

        const mod = match ? match[1] : null;
        const all = input === "all";

        if (mod === "database") {
            delete require.cache[`${__dirname}/Managers/Database.js`];
            Database = require("./Managers/Database");
            this.database = new Database();
        } else if (all || mod === "events") {
            delete require.cache[`${__dirname}/Managers/Events.js`];
            EventsManager = require("./Managers/Events");
            this.eventsManager = new EventsManager(this);
        } else if (mod === "commands") {
            const command = match[2];

            if (command) {
                this.commandsManager.get(command).then(cmd => {
                    if (!cmd) return; this.commandsManager.reload(cmd.path);
                });
            } else {
                delete require.cache[`${__dirname}/Managers/Commands.js`];
                CommandsManager = require("./Managers/Commands");
                this.commandsManager = new CommandsManager(this);
            }
        } else if (mod === "settings") {
            delete require.cache[`${__dirname}/Managers/Settings.js`];
            SettingsManager = require("./Managers/Settings");
            this.settingsManager = new SettingsManager(this);
        } else if (all || mod === "functions") {
            delete require.cache[`${__dirname}/Utility/Functions.js`];
            Functions = require("./Utility/Functions");
            this.functions = new Functions(this);
        }
    }
};

process.on("message", message => {
    if (message.type === "stats") client.shardData = message.data;
});
