const Discord = require("discord.js");

let CommandsManager = require("./Managers/Commands");
let MessagesManager = require("./Managers/Messages");
let BroadcastsManager = require("./Managers/Broadcasts");

const client = new class extends Discord.Client {
    constructor() {
        super({ messageCacheMaxSize: 1 });


        this.config = require("./config.json");
        this.commandsManager = new CommandsManager(this);
        this.messagesManager = new MessagesManager(this);
        this.broadcastsManager = new BroadcastsManager(this);

        this.on("message", message => this.messagesManager.process(message));

        this.on("ready", () => {
            console.log("Client connected.");
            this.user.setGame(`in ${this.voiceConnections.size} channels`);
            setTimeout(() => this.broadcastsManager.begin(), 3000);
        });

        this.on("error", console.error);

        this.on("warn", console.error);

        this.on("disconnect", () => console.log("Disconnected!"));

        setInterval(() => this.user.setGame(`in ${this.voiceConnections.size} channels`), 120000);

        this.login(this.config.token);
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
