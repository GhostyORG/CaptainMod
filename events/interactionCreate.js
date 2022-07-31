client.on('interactionCreate', async interaction => {
	// looks if the interaction is a command
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	// tries to execute the command and otherwise the bot sends a message into the error_channel with aditional information
	try {
		await command.execute(interaction);
	} catch (error) {
        console.error(error);
	    	const errorchan = client.channels.cache.get(config.channels.error_channel);
			const embed = new discord.EmbedBuilder()
            	.setTitle(`⚠️ERROR⚠️`)
            	.setDescription(`**__Error__**:\n\`\`\`${error}\`\`\``)
            	.addFields({name: `User`, value: `${interaction.member}`})
            	.setColor(`${config.colors.red}`)
            errorchan.send({embeds: [embed]})
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
	// console logs who did what command (for error reasons)
    console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction. (${interaction.commandName})`);
});