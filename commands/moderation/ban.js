const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a user')
        .addUserOption(option => option.setName('user').setDescription(`The user to ban`).setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription(`The reason for banning the user`)),
	async execute(interaction) {
        const user = interaction.user;
        const guildMember = interaction.guild.members.cache.get(user.id);

        if (!guildMember.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({content: `You don't have the permissions to do this idiot!`});
        }
        const userToBan = interaction.options.getUser('user');
        const guildMemberToBan = interaction.guild.members.cache.get(userToBan.id);
        if(!guildMemberToBan) return interaction.reply({content: `That user doesn't exist!`});
        
        if (guildMemberToBan.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({content: `You can't ban someone who have admin, you stupid`});
        }
        var reason = interaction.options.getString('reason');
        if(!reason) reason = "There wasn't a reason, just be gone";

        const embed = new EmbedBuilder()
            .setTitle(`Ban`)
            .setDescription(`${userToBan.username} has been banned.`)
            .addFields({name: `Reason`, value: `${reason}`})
            .setColor(`${config.colors.mod}`)
            .setTimestamp();
        
        await userToBan.send({content: `You've been banned from ${interaction.guild.name} for: ${reason}`})
        await guildMemberToBan.ban({reason: reason}).then(async () => {
            await interaction.reply({embeds: [embed]});
        })
	},
};
