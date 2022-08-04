const { SlashCommandBuilder, ButtonStyle } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("abuse")
    .setDescription("You are loved so much by CaptainMod and the team."),
  async execute(interaction) {
    
    const embed = new discord.EmbedBuilder()
      .setTitle(`Abuse Hotlines:`)
      .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
      .setColor(`${config.colors.default}`)
      .setTimestamp()


    const { usa1, al1, ar1, arm1, aus1 } = require('../../suicidal.json');

    embed.addFields({name: `__United States:__`, value: `${usa1.toString().replace(/,/g, ",\n")}`, inline: true})

    embed.addFields({name: `__Algeria:__`, value: `${al1.toString().replace(/,/g, ",\n")}`, inline: true})

    embed.addFields({name: `__Argentina:__`, value: `${ar1.toString().replace(/,/g, ",\n")}`, inline: true})

    embed.addFields({name: `__Armenia:__`, value: `${arm1.toString().replace(/,/g, ",\n")}`, inline: true})

    embed.addFields({name: `__Australia:__`, value: `${aus1.toString().replace(/,/g, ",\n")}`, inline: true})

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