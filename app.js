const fs = require('node:fs')
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const Discord = require('discord.js');
const config = require('./config.json')


const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers ] });


global.client = client;

const { infocmd } = require(`./commands.json`);
const commandFolders = fs.readdirSync('./commands');

for(const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    if(folder === 'info'){
      for (const file of commandFiles) {
        const command = require(`./commands/info/${file}`);
        infocmd.push(
          file.replace('.js', '')
        )
      }
    }
}

client.commands = new Collection();

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.data.name, command);
	}
}
console.log('\nloaded in commands\n_________________________________________________________\n');

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
eventFiles.forEach(file => {
	console.log(`${file.replace(".js", "")} loaded!`);
})
console.log('\nloaded in events\n_________________________________________________________\n');

client.login(config.token);