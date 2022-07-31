const { SlashCommandBuilder, ButtonStyle } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Gives you all the commands"),
  async execute(interaction) {
    
    const embed = new discord.EmbedBuilder()
      .setTitle(`Commands:`)
      .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
      .setColor(`${config.colors.default}`)


    const { infocmd, modcmd, miscmd } = require('../../commands.json');

    embed.addFields({name: `__INFORMATION:__`, value: `${infocmd.toString().replace(/,/g, ",\n")}`, inline: true})

    embed.addFields({name: `__MODERATION:__`, value: `${modcmd.toString().replace(/,/g, ",\n")}`, inline: true})

    embed.addFields({name: `__MISCELLANEOUS:__`, value: `${miscmd.toString().replace(/,/g, ",\n")}`, inline: true})

    const row = new discord.ActionRowBuilder()
			.addComponents(
				new discord.ButtonBuilder()
					.setURL(config.links.invite)
					.setLabel('Invite me!')
					.setStyle(5),
			)
            .addComponents(
				new discord.ButtonBuilder()
					.setURL(config.links.support)
					.setLabel('Support')
					.setStyle(5),
			);
    await interaction.reply({ components: [row], embeds: [embed]})
  }
}