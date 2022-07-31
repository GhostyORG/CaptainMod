const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Purge messages in a channel!')
        .addNumberOption(option => option.setName('amount').setDescription('The amount of messages to purge.').setRequired(true)),
	async execute(interaction) {
        // gets the amount of messages to purge
        const amount = interaction.options.getNumber('amount');
        // gets the channel of the interaction
        const channel = interaction.channel;

        // if the amount is greater then 100 then it sends a message that you can't delete more then 100 messages
        if (amount > 100) {
            return interaction.reply('You can only purge up to 100 messages at once.');
        } 
        // if the amount is the same as 0 then it sends a message that you can't delete 0 messages
        else if(amount === 0) {
            return interaction.reply('You must specify an amount of messages to purge.');
        }
        channel.bulkDelete(amount, true)
        // if an error occurs then it sends a message that an error has occured
        .catch(err => {
            console.error(err);
            interaction.reply('An error occurred while purging messages.');
        })
        //fetches the amount of messages deleted and sends that in the chat
        .then(messages => {
            interaction.reply({content: `Removed ${messages.size} messages from the server cuz i didn't like 'em`, ephemeral: true});
        });
	},
};
