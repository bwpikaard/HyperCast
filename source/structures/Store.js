const { Collection } = require("discord.js");
const path = require("path");
const klaw = require("klaw");

class Store extends Collection {
    constructor(client, type, dir) {
        super();

        this.client = client;

        this.type = type;

        this.dir = dir;
    }

    load(path, ext, name) {
        const file = require(path);

        const req = ext === ".js" ? new file(this.client, name, path) : file;
        
        this.set(name, req);
    }
    
    loadAll(ext = "js") {
        return new Promise((resolve, reject) => {
            const start = Date.now();

            klaw(this.dir).on("data", item => {
                const file = path.parse(item.path);
                if (!file.ext || file.ext !== `.${ext}`) return;

                this.load(path.join(file.dir, file.base), file.ext, file.name);
            }).on("end", () => {
                console.log(`Loaded ${this.size} ${this.type} in ${Date.now() - start}ms`);

                return resolve();
            });
        });
    }
}

module.exports = Store;
