const cp            = require("child_process");
const path          = require("path");
const config        = require(`./config`);

const spath         = path.join(__dirname, `Source`, `client.js`);

const shards        = [];
const stats         = {};

const update = (shard, data) => {
    if (!stats[shard]) stats[shard] = {};
    Object.keys(data).map(key => stats[shard][key] = data[key]);
    transmit();
};

const send = data => shards.forEach(shard => shard.send(data));

const transmit = () => {
    const newdata = { "guilds": 0, "voiceConnections": 0, "shards": stats };
    for (let shard in stats) Object.keys(stats[shard]).forEach(key => newdata[key] += Number(stats[shard][key]));
    send( { "type": "stats", "data": newdata } );
};

const create = shardID => {
    const shard = cp.fork( spath, [], { env: { SHARD_ID: shardID, SHARD_COUNT: config.shards, CLIENT_TOKEN: config.token } } );

    shards.push(shard);

    shard.on("message", message => {
        if (message.type === "stat") return update(shardID, message.data);
        return send(message);
    });
};

for (let s = 0; s < config.shards; s++) setTimeout(create, (6000 * s), s);
