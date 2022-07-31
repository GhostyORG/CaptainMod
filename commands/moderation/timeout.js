const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Give a member a timeout')
        .addUserOption(option => option.setName('user').setDescription('The user to timeout.').setRequired(true))
        .addNumberOption(option => option.setName('time').setDescription('The amount of time the user needs a timeout for.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the timeout.')),
	async execute(interaction) {
        // gets the user to timeout
        var user = interaction.options.getUser('user');
        // get the guildmember of the user
        var guildmember = interaction.guild.members.cache.get(user.id);
        // gets the amount of time the user needs a timeout for
        var time = interaction.options.getNumber('time');
        // gets the reason for the timeout
        var reason = interaction.options.getString('reason');
        // if the reason isn't filled in, it uses the default reason
        if(!reason) reason = "No reason given";
    
        // creates the embed for the timeout
        const embed = new EmbedBuilder()
            .setTitle(`Timeout`)
            .setDescription(`${user.username} has been timed out for ${time} minutes.`)
            .addFields({name: `Reason`, value: `${reason}`})
            .setColor(`${config.colors.mod}`)
            .setTimestamp();

        // times out the user and when successful the bot will send the embed
        guildmember.timeout(time * 60 * 1000, reason)
        .then(async () => {
            console.log("Timed out member");
            await interaction.reply({embeds: [embed]});
        })
        // if there's an err it'll log it and reply to the user
        .catch((err) => {
            console.log;
            interaction.reply("An error occurred while timing out the member.");
        })

	},
};
