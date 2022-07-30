// sharding (copied from the docs: https://discordjs.guide/sharding)

const { ShardingManager } = require('discord.js');
const config = require(`./config.json`);

const manager = new ShardingManager('./app.js', { token: config.token });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();