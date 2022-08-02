const { Guilds } = require('../dbObjects.js');

module.exports = {
	name: 'guildCreate',
	async execute(guild) {
		// gets the bots logging channel
		const b_logs = client.channels.cache.get(config.channels.logs_chan);
        
		// creates the embed for the log channel
        const embed = new discord.EmbedBuilder()
        	.setColor(`${config.colors.green}`)
			.setTitle(`Guild joined: ${guild.name}`)
			.setThumbnail(guild.iconURL({dynamic: true}))
			.addFields(
				{ name: 'Guild ID', value: guild.id, inline: true },
				{ name: 'Owner ID', value: guild.ownerId, inline: true },
				{name: `Members`, value: `${guild.memberCount}`, inline: true},
				{name: `Created At`, value: `${guild.createdAt}`, inline: true},
			)
			.setTimestamp()

		// sends the embed to the log channel
		b_logs.send({embeds: [embed]})
		await Guilds.create({
			guildId: guild.id,
		}).catch(err => {
			console.log(err);
		});
	},
};