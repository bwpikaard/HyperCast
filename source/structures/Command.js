class Command {
    constructor(client, filePath, {name, description, usage, aliases, dm, permission, mode}) {
        this.client = client;

        this.path = filePath;

        this.name = name || "NULL";

        this.aliases = aliases || new Array();
    }
}

module.exports = Command;
