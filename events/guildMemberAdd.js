const { Guilds } = require('../dbObjects.js');

module.exports = {
	name: 'guildMemberAdd',
	async execute(guildMember) {
		const guild = guildMember.guild;
        const DBGuild = await Guilds.findOne({ where: { guildId: guild.id } });
        
        if(!DBGuild) return;
        
        if(DBGuild.welcomeSetting === false) return;

        const welcomeChan = guild.channels.cache.get(DBGuild.welcomeChan);
        const embed = new discord.EmbedBuilder()
            .setColor(`${config.colors.green}`)
            .setTitle(`${guildMember.user.username} has joined the server!`)
            .setThumbnail(guildMember.user.avatarURL({dynamic: true}))
            .setDescription(DBGuild.welcomeMessage.replace(/{user}/g, guildMember.user))
            .setTimestamp();
        welcomeChan.send({embeds: [embed]});
	},
};