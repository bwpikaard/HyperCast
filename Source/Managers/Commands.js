const klaw = require("klaw");
const path = require("path");
const commands = path.resolve(`${__dirname.replace(/\/\w+$/, ``)}/Commands/`);

class CommandsManager {
    constructor(client) {
        this.client = client;

        this.data = new Map();

        this.loadAll();
    }

    load(name, path) {
        if (this.data.has(name)) {
            delete require.cache[require.resolve(path)];
            let command = require(path);
            command.init(this.client, path);
            this.data.set(name, command);
        } else {
            let command = require(path);
            command.init(this.client, path);
            this.data.set(name, command);
        }
    }

    loadAll() {
        klaw(commands).on("data", item => {
            let file = path.parse(item.path);
            if (!file.ext || file.ext !== ".js") return;
            this.load(file.name, `${file.dir}${path.sep}${file.base}`);
        });
        return this;
    }

    reload(input) {
        return new Promise((resolve, reject) => {
            if (!this.data.has(input)) return reject("Invalid Command");
            let command = this.data.get(input);
            this.load(input, command.path);
        });
    }

    get(text) {
        return new Promise((resolve, reject) => {
            if (this.data.has(text)) return resolve(this.data.get(text));
            this.data.forEach(c => {
                if (c.aliases && c.aliases.includes(text)) return resolve(c);
            });
            return resolve();
        });
    }
}

module.exports = CommandsManager;
