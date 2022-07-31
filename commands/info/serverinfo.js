const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Gets info of this stupid server'),
	async execute(interaction) {
        const guild = interaction.guild;
        const owner = guild.owner;
        const afkChannel = guild.afkChannel;
        const afkTimeout = guild.afkTimeout;
        const aproxmemcount = guild.approximateMemberCount
        const banner = guild.banner;
        const channels = guild.channels.cache;
        const createdAt = guild.createdAt;
        const defaultChannel = guild.defaultChannel;
        const emojis = guild.emojis.size;
        const desc = guild.description;
        const bancount = guild.bans;
        const large = guild.large;
        const guildName = guild.name;
        const premium = guild.premiumSubscriptionCount;
        const icon = guild.iconURL({dynamic: true});
        const vanity = guild.vanityURLCode;
        const vanityUses = guild.vanityURLUses;
        const verificationLevel = guild.verificationLevel;

        const embed = new discord.EmbedBuilder()
            .setTitle(`Server Info:`)
            .setThumbnail(icon)
            .setColor(`${config.colors.default}`)
            .addFields({name: `__General:__`, value: `\`\`\`\nName: ${guildName}\nID: ${guild.id}\nOwner: ${owner}\nCreated at: ${createdAt}\n\`\`\``, inline: true})
            .addFields({name: `__Members:__`, value: `\`\`\`\nTotal: ${guild.memberCount}\nAprox.: ${aproxmemcount}\n\`\`\``, inline: true})
            .addFields({name: `__Channels:__`, value: `\`\`\`\nTotal: ${channels.size}\nText: ${channels.filter(c => c.type === 'text').size}\nVoice: ${channels.filter(c => c.type === 'voice').size}\n\`\`\``, inline: true})
            .addFields({name: `__Roles:__`, value: `\`\`\`\nTotal: ${guild.roles.size}\n\`\`\``, inline: true})
            .addFields({name: `__Emojis:__`, value: `\`\`\`\nTotal: ${emojis}\n\`\`\``, inline: true})
            .addFields({name: `__Bans:__`, value: `\`\`\`\nTotal: ${bancount}\n\`\`\``, inline: true})
            .addFields({name: `__Verification:__`, value: `\`\`\`\nLevel: ${verificationLevel}\n\`\`\``, inline: true})
            .addFields({name: `__Features:__`, value: `\`\`\`\nPremium: ${premium}\nLarge: ${large}\nVanity: ${vanity}\nVanity uses: ${vanityUses}\n\`\`\``, inline: true})
            .addFields({name: `__Other:__`, value: `\`\`\`\nAFK Channel: ${afkChannel}\nAFK Timeout: ${afkTimeout}\nBanner: ${banner}\n\`\`\``, inline: true})
            .addFields({name: `__Description:__`, value: `\`\`\`\n${desc}\n\`\`\``, inline: true})
            .setTimestamp();
        interaction.reply({embeds: [embed]});


	},
};
