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
	    	const errorchan = client.channels.cache.get(config.error_channel);
            const embed = new discord.MessageEmbed()
            	.setTitle(`⚠️ERROR⚠️`)
            	.setDescription(`error:\n\`\`\`${error}\`\`\``)
            	.addField(`User`, interaction.member)
            	.setColor(config.color.error)
            errorchan.send({embeds: [embed]})
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
	// console logs who did what command (for error reasons)
    console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction. (${interaction.commandName})`);
});