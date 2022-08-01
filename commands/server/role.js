const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Role management')
        .addSubcommand(subcommand => subcommand
            .setName('add')
            .setDescription('Adds a role to a stupid user')
            .addUserOption(option => option.setName('user').setDescription(`The user to add the role to`).setRequired(true))
            .addRoleOption(option => option.setName('role').setDescription(`The role to add to the user`).setRequired(true))
        )
        .addSubcommand(subcommand => subcommand
            .setName('remove')
            .setDescription('Removes a role from the stupid user')
            .addUserOption(option => option.setName('user').setDescription(`The user to remove the role from`).setRequired(true))
            .addRoleOption(option => option.setName('role').setDescription(`The role to remove from the user`).setRequired(true))
        )
        .addSubcommand(subcommand => subcommand
            .setName('create')
            .setDescription('Creates a dumb role')
            .addStringOption(option => option.setName('name').setDescription(`The name of the role`).setRequired(true))
            .addStringOption(option => option.setName('color').setDescription(`The color of the role in hex`).setRequired(true))
            .addBooleanOption(option => option.setName('hoist').setDescription(`Whether the role is hoisted`))
            .addBooleanOption(option => option.setName('mentionable').setDescription(`Whether the role is mentionable`))
        )
        .addSubcommand(subcommand => subcommand
            .setName('delete')
            .setDescription('Deletes a role')
            .addRoleOption(option => option.setName('role').setDescription(`The role to delete`).setRequired(true))
        )
        .addSubcommand(subcommand => subcommand
            .setName('edit')
            .setDescription('Edits a role')
            .addRoleOption(option => option.setName('role').setDescription(`The role to edit`).setRequired(true))
            .addStringOption(option => option.setName('name').setDescription(`The name of the role`))
            .addStringOption(option => option.setName('color').setDescription(`The color of the role in hex`))
            .addBooleanOption(option => option.setName('hoist').setDescription(`Whether the role is hoisted`))
            .addBooleanOption(option => option.setName('mentionable').setDescription(`Whether the role is mentionable`))
        ),
	async execute(interaction) {
        const cmduser = interaction.user;
        const cmdGuildMember = interaction.guild.members.cache.get(cmduser.id);
        
        if(!cmdGuildMember.permissions.has(PermissionsBitField.Flags.ManageRoles)){
            interaction.reply({content: `You don't have the required permissions to use this command.`});
            return;
        }

        function roleCheck(role, user) {
            const rolePos = role.position;
            const guildMember = interaction.guild.members.cache.get(user.id);
            const memHighRole = guildMember.roles.highest.position;
            if(rolePos >= memHighRole) {
                return true;
            }  
            else {
                return false
            }   
        }

        function clientCheck(role) {
            const rolePos = role.position;
            const clientHighRole = interaction.guild.members.me.roles.highest.position;
            if(rolePos >= clientHighRole) {
                return true;
            }
            else {
                return false
            }   
        }




        // here it checks which subcommand the user has executed
        const sub = interaction.options.getSubcommand();
        if (sub === 'add') {
            var memRoleCheck = roleCheck(interaction.guild.roles.cache.get(interaction.options.getRole('role').id), interaction.user);
            if(memRoleCheck === true) {
                interaction.reply({content: `You can't give a role that's higher than your highest role.`});
                return;
            }

            var clientRoleCheck = clientCheck(interaction.guild.roles.cache.get(interaction.options.getRole('role').id));
            if(clientRoleCheck === true) {
                interaction.reply({content: `You can't give a role that's higher than the bot's highest role.`});
                return;
            }
            // gets the user
            const user = interaction.options.getUser('user');
            const member = interaction.guild.members.cache.get(user.id);
            if (!member) {
                interaction.reply({content: `The user you specified doesn't exist.`});
                return;
            }
            // make the user a servers member object
            
            const role = interaction.options.getRole('role');
            // check if the server has this role
            if(!interaction.guild.roles.cache.find(r => r.id === role.id)){
                interaction.reply({content: `The role you specified doesn't exist.`});
                return;
            }
            // checks if the user has the role
            if (member.roles.cache.some(r => r.id === role.id)) {
                interaction.reply({content: `The role you specified is already taken by this user`})
                return;
            }
            // add the role to the user
            member.roles.add(role);
            const embed = new EmbedBuilder()
                .setTitle(`Role added`)
                .setDescription(`${member.user.tag} has been given the role: **${role.name}**`)
                .setColor(role.color)
                .setThumbnail(client.user.avatarURL({dynamic: true}))
                .setTimestamp()
            interaction.reply({embeds: [embed]});
        }
        if(sub === 'remove'){
            var memRoleCheck = roleCheck(interaction.guild.roles.cache.get(interaction.options.getRole('role').id), interaction.user);
            if(memRoleCheck === true) {
                interaction.reply({content: `You can't remove a role that's higher than your highest role.`});
                return;
            }

            var clientRoleCheck = clientCheck(interaction.guild.roles.cache.get(interaction.options.getRole('role').id));
            if(clientRoleCheck === true) {
                interaction.reply({content: `You can't remove a role that's higher than the bot's highest role.`});
                return;
            }
            // gets the user
            const user = interaction.options.getUser('user');
            const member = interaction.guild.members.cache.get(user.id);
            if (!member) {
                interaction.reply({content: `The user you specified doesn't exist.`});
                return;
            }
            // make the user a servers member object
            
            const role = interaction.options.getRole('role');
            // check if the server has this role
            if(!interaction.guild.roles.cache.find(r => r.id === role.id)){
                interaction.reply({content: `The role you specified doesn't exist.`});
                return;
            }
            // checks if the user has the role
            if (!member.roles.cache.some(r => r.id === role.id)) {
                interaction.reply({content: `This user doesn't have that role`})
                return;
            }
            // removes the role to the user
            member.roles.remove(role);
            const embed = new EmbedBuilder()
                .setTitle(`Role Removed`)
                .setColor(role.color)
                .setDescription(`${member.user.tag} has been removed from the role: **${role.name}**`)
                .setThumbnail(client.user.avatarURL({dynamic: true}))
                .setTimestamp()
            interaction.reply({embeds: [embed]});
        }
        if(sub === 'create'){
            // gets the name of the role
            const name = interaction.options.getString('name');
            // gets the color of the role
            const color = interaction.options.getString('color');
            // gets whether the role is hoisted
            const hoist = interaction.options.getBoolean('hoist');
            // gets whether the role is mentionable
            const mentionable = interaction.options.getBoolean('mentionable');
            // creates the role
            const role = await interaction.guild.roles.create({
                name: name,
                color: color,
                hoist: hoist,
                mentionable: mentionable
            });
            const embed = new EmbedBuilder()
                .setTitle(`Role created`)
                .setDescription(`The role ${role} has been created.`)
                .setColor(role.color)
                .setThumbnail(client.user.avatarURL({dynamic: true}))
                .setTimestamp()

            interaction.reply({embeds: [embed]});
        }
        if(sub === 'delete'){
            var memRoleCheck = roleCheck(interaction.guild.roles.cache.get(interaction.options.getRole('role').id), interaction.user);
            if(memRoleCheck === true) {
                interaction.reply({content: `You can't delete a role that's higher than your highest role.`});
                return;
            }

            var clientRoleCheck = clientCheck(interaction.guild.roles.cache.get(interaction.options.getRole('role').id));
            if(clientRoleCheck === true) {
                interaction.reply({content: `You can't delete a role that's higher than the bot's highest role.`});
                return;
            }
            // finds the role
            const role = interaction.options.getRole('role');
            role.delete();
            const embed = new EmbedBuilder()
                .setTitle(`Deleted role ${role.name}`)
                .setColor(config.colors.red)
                .setThumbnail(client.user.avatarURL({dynamic: true}))
                .setTimestamp()
            interaction.reply({embeds: [embed]});
        }
        if(sub === 'edit'){
            var memRoleCheck = roleCheck(interaction.guild.roles.cache.get(interaction.options.getRole('role').id), interaction.user);
            if(memRoleCheck === true) {
                interaction.reply({content: `You can't edit a role that's higher than your highest role.`});
                return;
            }

            var clientRoleCheck = clientCheck(interaction.guild.roles.cache.get(interaction.options.getRole('role').id));
            if(clientRoleCheck === true) {
                interaction.reply({content: `You can't edit a role that's higher than the bot's highest role.`});
                return;
            }
            // finds the role
            const role = interaction.options.getRole('role');
            const hoist = interaction.options.getBoolean('hoist');
            const mentionable = interaction.options.getBoolean('mentionable');
            const name = interaction.options.getString('name');
            const color = interaction.options.getString('color');

            let data = "";
            if(name){
                role.setName(name);
                data = data+"\nName: "+name;
            } if(color){
                role.setColor(color);
                data = data+"\nColor: "+color;
            } if(hoist){
                role.setHoist(hoist);
                data = data+"\nHoist: "+hoist;
            } if(mentionable){
                role.setMentionable(mentionable);
                data = data+"\nMentionable: "+mentionable;
            }
            const embed = new EmbedBuilder()
                .setTitle("Role Edited")
                .setDescription(`Role ${role.name} was edited.`+data)
                .setColor(await role.color)
                .setTimestamp()
                .setThumbnail(client.user.avatarURL({dynamic: true}))

            interaction.reply({embeds: [embed]});
        }
	},
};
