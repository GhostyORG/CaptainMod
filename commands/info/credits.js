const { SlashCommandBuilder, ButtonStyle } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("credits")
    .setDescription("Bot Credits idiot."),
  async execute(interaction) {
    
    const embed = new discord.EmbedBuilder()
      .setTitle(`Credits:`)
      .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
      .setColor(`${config.colors.credit}`)
      .setTimestamp()


    const { devs, head_admin, admin, moderators, support } = require('../../credits.json');

    embed.addFields({name: `__Developers:__`, value: `${devs.toString().replace(/,/g, ",\n")}`, inline: true})

    embed.addFields({name: `__Head Admins:__`, value: `${head_admin.toString().replace(/,/g, ",\n")}`, inline: true})

    embed.addFields({name: `__Admins:__`, value: `${admin.toString().replace(/,/g, ",\n")}`, inline: true})

    embed.addFields({name: `__Moderators:__`, value: `${moderators.toString().replace(/,/g, ",\n")}`, inline: true})

    embed.addFields({name: `__General Support:__`, value: `${support.toString().replace(/,/g, ",\n")}`, inline: true})

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