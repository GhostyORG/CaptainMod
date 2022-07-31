const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('kick a user')
        .addUserOption(option => option.setName('user').setDescription(`The user to kick`).setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription(`The reason for kicked the user`)),
	async execute(interaction) {
        const user = interaction.user;
        const guildMember = interaction.guild.members.cache.get(user.id);
        if (!guildMember.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply({content: `You don't have the permissions to do this idiot!`});
        }
        const userToKick = interaction.options.getUser('user');
        const guildMemberToKick = interaction.guild.members.cache.get(userToKick.id);
        if(!guildMemberToKick) return interaction.reply({content: `That user doesn't exist!`});
        if (guildMemberToKick.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({content: `You can't ban someone who have admin, you stupid`});
        }
        var reason = interaction.options.getString('reason');
        if(!reason) reason = "There wasn't a reason, just be gone";

        const embed = new EmbedBuilder()
            .setTitle(`kick`)
            .setDescription(`${userToKick.username} has been Kicked.`)
            .addFields({name: `Reason`, value: `${reason}`})
            .setColor(`${config.colors.mod}`)
            .setThumbnail(client.user.displayAvatarURL({ dyanmic: true }))
            .setTimestamp();
        
        await userToKick.send({content: `You've been kicked from ${interaction.guild.name} for: ${reason}`})
        await guildMemberToKick.kick(reason).then(async () => {
            await interaction.reply({embeds: [embed]});
        }).catch(error => {
            console.log(error);
            interaction.followUp({content: `Something went wrong, please try again later.`});
        })
	},
};
