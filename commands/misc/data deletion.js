const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('data_deletion')
		.setDescription('Suggest a feature!'),
	async execute(interaction) {
        // build the modal
        const modal = new ModalBuilder()
            .setTitle('Ask to delete your data')
            .setCustomId('data-deletion')

        // new short inputfield
        const input = new TextInputBuilder()
            .setCustomId('longText')
            .setLabel('Enter your reason for deleting your data')
            .setStyle(TextInputStyle.Paragraph)

        // An action row only holds one text input,
		// so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(input);

        // Add inputs to the modal
        modal.addComponents(firstActionRow);

        // Show the modal to the user
		await interaction.showModal(modal);
	},
};
