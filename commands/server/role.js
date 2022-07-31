const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Role management')
        .addSubcommand(subcommand => subcommand
            .setName('add')
            .setDescription('Adds a role to a user')
            .addUserOption(option => option.setName('user').setDescription(`The user to add the role to`).setRequired(true))
            .addRoleOption(option => option.setName('role').setDescription(`The role to add to the user`).setRequired(true))
        )
        .addSubcommand(subcommand => subcommand
            .setName('remove')
            .setDescription('Removes a role from a user')
            .addUserOption(option => option.setName('user').setDescription(`The user to remove the role from`).setRequired(true))
            .addRoleOption(option => option.setName('role').setDescription(`The role to remove from the user`).setRequired(true))
        )
        .addSubcommand(subcommand => subcommand
            .setName('create')
            .setDescription('Creates a role')
            .addStringOption(option => option.setName('name').setDescription(`The name of the role`).setRequired(true))
            .addStringOption(option => option.setName('color').setDescription(`The color of the role`).setRequired(true))
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
            .addStringOption(option => option.setName('color').setDescription(`The color of the role`))
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
        // here it checks which subcommand the user has executed
        const sub = interaction.options.getSubcommand();
        if (sub === 'add') {
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
            interaction.reply({content: `Added role ${role} to ${user}.`});
        }
	},
};
