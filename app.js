const fs = require('node:fs')
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const Discord = require('discord.js');
const config = require('./config.json')
const { Users, Guilds } = require('./dbObjects.js');

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers ] });




// globally devine the client
global.client = client;
// globally devines the config file
global.config = config;
// globally devindes the discord package
global.discord = Discord;
// globally define users and guilds
global.users = Users;
global.guilds = Guilds;

// pushes the command names to a file so in the help command you can give them all a seperate category
const { infocmd, modcmd, miscmd, utility } = require(`./commands.json`);
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
	
	if(folder === 'moderation'){
		for (const file of commandFiles) {
		  const command = require(`./commands/moderation/${file}`);
		  modcmd.push(
			file.replace('.js', '')
		  )
		}
	}

	if(folder === 'misc'){
		for (const file of commandFiles) {
		  const command = require(`./commands/misc/${file}`);
		  miscmd.push(
			file.replace('.js', '')
		  )
		}
	}

	if(folder === 'server'){
		for (const file of commandFiles) {
		  const command = require(`./commands/server/${file}`);
		  utility.push(
			file.replace('.js', '')
		  )
		}
	}
}



client.commands = new Collection();

// Here the code makes a command of every file in each folder in the commands folder
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.data.name, command);
	}
}
console.log('\nloaded in commands\n_________________________________________________________\n');

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// Here the code makes an event of every file in the events folder
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Here it logs every event in the events folder
eventFiles.forEach(file => {
	console.log(`${file.replace(".js", "")} loaded!`);
})
console.log('\nloaded in events\n_________________________________________________________\n');
console.log(`Database loaded successfully.`)
console.log(`Loaded website on port 3000.`)


// Here it logs in into the bot
client.login(config.token);