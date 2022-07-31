const { InteractionType } = require('discord.js');

client.on('interactionCreate', async interaction => {
    // if the interaction is a modal
	if(interaction.type !== InteractionType.ModalSubmit) return;

    // checks if the modals custom id is the correct one
    if (interaction.customId === 'suggestion') {
        // replies to the command
		await interaction.reply({ content: 'Your submission was received successfully!' });

        //finds the correct channel
        const suggestionchan = client.channels.cache.get(config.channels.suggestion_channel);

        // creates the embed with the modals input fields content
        const embed = new discord.EmbedBuilder()
            .setTitle(`📝Suggestion📝`)
            .addFields(
                {name: `Suggestion`, value: `${interaction.fields.getTextInputValue('shortText')}`, inline: true},
                {name: `Explenation`, value: `${interaction.fields.getTextInputValue('longText')}`, inline: true}
            )
            .addFields({name: `User`, value: `${interaction.member}`})
            .setColor(`${config.colors.default}`)
        // sends the embed to the suggestion channel
        suggestionchan.send({embeds: [embed]})
	}

    // checks if the modals custom id is the correct one
    if (interaction.customId === 'bug') {
        // replies to the command
		await interaction.reply({ content: 'Your submission was received successfully!' });

        //finds the correct channel
        const bugchan = client.channels.cache.get(config.channels.bug_channel);

        // creates the embed with the modals input fields content
        const embed = new discord.EmbedBuilder()
            .setTitle(`🐛Bug Report🐛`)
            .addFields(
                {name: `Bug`, value: `${interaction.fields.getTextInputValue('shortText')}`, inline: true},
                {name: `How they got it`, value: `${interaction.fields.getTextInputValue('longText')}`, inline: true}
            )
            .addFields({name: `User`, value: `${interaction.member}`})
            .setColor(`${config.colors.default}`)
        // sends the embed to the bug channel
        bugchan.send({embeds: [embed]})
	}
});