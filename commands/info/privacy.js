const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('policy')
        .setDescription('View the policy of the bot'),
    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle('__Policy:__')
            .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
            .setColor(`${config.colors.default}`)
            .addFields(
                { name: 'What data do we collect?', value: `We store only __**user ids**__ incase we need to blacklist someone from the bot.`, inline: true },
                { name: 'Is the data secret and can anyone view it?', value: `The only people who can view the data are the __**developers**__ of the bot.`, inline: true },
                { name: 'Can we request to delete the data?', value: `You can request the deletion of the data **__by joining the support server and dm'ing one of the developers__**.`, inline: true },
            )
            .setTimestamp()


        
        interaction.reply({embeds: [embed]});
    },
};