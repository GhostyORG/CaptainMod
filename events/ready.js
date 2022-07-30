const { ActivityType } = require('discord.js');
const activities = []

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		// sets the activity of the bot
		client.user.setPresence({ status: 'online', activity: activities[0] });

		let activity = 0;

		setInterval(() => {
            activities[0] = { name: `/help`, type: ActivityType.Listening };
			activities[1] = { name: `${client.guilds.cache.size} servers`, type: ActivityType.Watching };
			activities[2] = { name: `${client.users.cache.size} users`, type: ActivityType.Watching };
			activities[3] = { name: `Development groups :)`, type: ActivityType.Competing };
			if (activity > 3) activity = 0;
			client.user.setActivity(activities[activity]);
			activity++;
		}, 10000);
	},
};