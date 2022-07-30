const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('View statistics of the bot'),
	async execute(interaction) {

        const d = moment.duration(client.uptime);
        const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
        const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
        const minutes = (d.minutes() == 1) ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
        const seconds = (d.seconds() == 1) ? `${d.seconds()} second` : `${d.seconds()} seconds`;


        const embed = new EmbedBuilder()
            .setTitle('Statistics')
            .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
            .setColor(`${config.colors.default}`)
            .addFields(
                { name: 'Uptime', value: `\`\`\`prolog\n${days}, ${hours}, ${minutes}, and ${seconds}\`\`\`` },
                { name: 'Version', value: `${config.version}`, inline: true },
                { name: 'Total Users', value: `${client.users.cache.size}`, inline: true },
                { name: 'Total Guilds', value: `${client.guilds.cache.size}`, inline: true },
                { name: 'Total Commands', value: `${client.commands.size}`, inline: true },
                { name: 'Total Shards', value: `${client.shard.count}`, inline: true },
            )
            .setTimestamp()


        
        interaction.reply({embeds: [embed]});
	},
};
