const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('Suggest a feature!'),
	async execute(interaction) {
        // build the modal
        const modal = new ModalBuilder()
            .setTitle('Suggest something!')
            .setCustomId('suggestion')

        // new short inputfield
        const input = new TextInputBuilder()
            .setCustomId('shortText')
            .setLabel('Enter your suggestion idiot')
            .setStyle(TextInputStyle.Short)

        // new long inputfield
        const input2 = new TextInputBuilder()
        .setCustomId('longText')
        .setLabel('Explain your stupid suggestion')
        .setStyle(TextInputStyle.Paragraph)

        // An action row only holds one text input,
		// so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(input);
        const secondActionRow = new ActionRowBuilder().addComponents(input2);

        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow);

        // Show the modal to the user
		await interaction.showModal(modal);
	},
};
