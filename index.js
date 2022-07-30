const { ShardingManager } = require('discord.js');
const config = require(`./config.json`);

const manager = new ShardingManager('./app.js', { token: config.token });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn().then(shards => {
    shards.forEach(shard => {
        shard.on('message', message => {
            console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
        });
    });
})