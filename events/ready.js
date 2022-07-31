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
			activities[4] = { name: `toxic youtubers`, type: ActivityType.Watching};
			activities[5] = { name: `my code & maintaining it`, type: ActivityType.Watching};
			activities[6] = { name: `for errors in my code`, type: ActivityType.Watching};
			if (activity > 6) activity = 0;
			client.user.setActivity(activities[activity]);
			activity++;
		}, 10000);
	},
};