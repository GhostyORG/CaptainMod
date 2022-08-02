const { Guilds } = require('../dbObjects.js');

module.exports = {
	name: 'guildMemberRemove',
	async execute(guildMember) {
		const guild = guildMember.guild;
        const DBGuild = await Guilds.findOne({ where: { guildId: guild.id } });
        
        if(!DBGuild) return;
        
        if(DBGuild.welcomeSetting === false) return;

        const leaveChan = guild.channels.cache.get(DBGuild.leaveChan);
        const embed = new discord.EmbedBuilder()
            .setColor(`${config.colors.red}`)
            .setTitle(`${guildMember.user.username} has left the server!`)
            .setThumbnail(guildMember.user.avatarURL({dynamic: true}))
            .setDescription(DBGuild.leaveMessage.replace(/{user}/g, guildMember.user).replace(/{username}/g, guildMember.user.username))
            .setTimestamp();
        leaveChan.send({embeds: [embed]});
	},
};