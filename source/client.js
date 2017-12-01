require("./utility/Extenders");

const { Client, Collection, Constants } = require("discord.js");

const build = process.env.CLIENT_BUILD;
const config = require(`../configs/${build}`);

let ProcessManager = require("./managers/Process");
let PermissionsManager = require("./managers/Permissions");

let FunctionStore = require("./stores/Functions");
let EventStore = require("./stores/Events");
let CommandStore = require("./stores/Commands");
let StationStore = require("./stores/Stations");

class TypicalBot extends Client {
    constructor() {
        super(config.clientOptions);

        this.build = build;
        this.config = config;

        this.shardID = Number(process.env.SHARD_ID);
        this.shardNumber = Number(process.env.SHARD_ID) + 1;
        this.shardCount = Number(process.env.SHARD_COUNT);

        this.processManager = new ProcessManager(this);
        this.permissionsManager = new PermissionsManager(this);

        this.functions = new FunctionStore(this);
        this.events = new EventStore(this);
        this.commands = new CommandStore(this);
        this.stations = new StationStore(this);
        
        this.shardData = {};
        this.testerData = [];

        this.donors = new Collection();

        this.streams = new Collection();

        this.banCache = new Collection();
        this.unbanCache = new Collection();
        this.softbanCache = new Collection();

        this.login(config.token);
    }

    log(content, error = false) {
        error ?
            console.error(content) :
            console.log(content);
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

        if (mod === "donors") {
            this.donors = new Collection();
            this.functions.fetchDonors();
        } else
        
        if (mod === "process") {
            delete require.cache[`${__dirname}/managers/Process.js`];
            ProcessManager = require("./managers/Process");
            this.processManager = new ProcessManager();
        } else
        
        if (mod === "permissions") {
            delete require.cache[`${__dirname}/managers/Permissions.js`];
            PermissionsManager = require("./managers/Permissions");
            this.permissionsManager = new PermissionsManager(this);
        } else
        
        if (mod === "functions") {
            delete require.cache[`${__dirname}/stores/Functions.js`];
            FunctionStore = require("./stores/Functions");
            this.functions = new FunctionStore(this);
        } else
        
        if (mod === "events") {
            delete require.cache[`${__dirname}/stores/Events.js`];
            EventStore = require("./stores/Events");
            this.events = new EventStore(this);
        } else
        
        if (mod === "commands") {
            const command = match[2];

            if (command) {
                this.commands.get(command).then(cmd => {
                    if (!cmd) return; this.commands.reload(cmd);
                });
            } else {
                delete require.cache[`${__dirname}/stores/Commands.js`];
                CommandStore = require("./stores/Commands");
                this.commands = new CommandStore(this);
            }
        } else
        
        if (mod === "stations") {
            delete require.cache[`${__dirname}/stores/Stations.js`];
            StationStore = require("./stores/Stations");
            this.stations = new StationStore(this);
        }
    }
}

const client = new TypicalBot();

process
    .on("message", msg => client.processManager.message(msg))
    .on("uncaughtException", err => client.log(err.stack, true))
    .on("unhandledRejection", err => {
        if (!err) return;
        console.error(`Uncaught Promise Error: \n${err.stack || err}`);
    });
// client.on('debug', e => {
//     console.log(e);
// });