client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

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
    console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction. (${interaction.commandName})`);
});