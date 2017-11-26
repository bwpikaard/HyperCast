class PermissionLevel { constructor(level, title, check) { this.level = level; this.title = title; this.check = check ? check : () => { return true; }; } }

module.exports = class {
    constructor(client) {
        this.client = client;

        this.levels = {

            "-1": new PermissionLevel(-1, "Server Blacklisted", (guild, member) => {
                const role = this.fetch(guild, "blacklist"); if (!role) return;
                if (role instanceof Array) { let isRole = false; role.forEach(r => { if (member.roles.has(r.id)) isRole = true; }); return isRole; } else { return member.roles.has(role.id); }
            }),
            "0" : new PermissionLevel(0, "Server Member"),
            "1" : new PermissionLevel(1, "Server Administrator", (guild, member) => {
                const role = this.fetch(guild, "administrator"); if (!role) return;
                if (role instanceof Array) { let isRole = false; role.forEach(r => { if (member.roles.has(r.id)) isRole = true; }); return isRole; } else { return member.roles.has(role.id); }
            }),
            "2" : new PermissionLevel(2, "Server Owner", (guild, member) => member.id === guild.ownerID),
            "10" : new PermissionLevel(10, "Creator", (guild, id) => id === client.config.creator),

        };
    }

    define(number) {
        return this.levels[number];
    }

    fetch(guild, permission) {
        if (permission === "administrator") return guild.roles.find(r => r.name.toLowerCase() === "hypercast administrator");
        if (permission === "blacklist") return guild.roles.find(r => r.name.toLowerCase() === "typicalbot blacklist");
        return null;
    }

    get(guild, member, globalIgnore = false) {
        const id = member.id ? member.id : member;

        if (this.levels[10].check(guild, id)) return this.define(10);

        member = guild.member(member);
        if (!member) return this.define(0);
        if (this.levels[2].check(guild, member)) return this.define(2);
        if (this.levels[1].check(guild, member)) return this.define(1);
        if (this.levels[-1].check(guild, member)) return this.define(-1);
        return this.define(0);
    }
};
