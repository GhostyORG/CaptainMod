module.exports = (sequelize, DataTypes) => {
	return sequelize.define('guilds', {
		guildId: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
        welcomeChan: {
            type: DataTypes.STRING,
        },
        joinRole: {
            type: DataTypes.STRING,
        },
        leaveChan: {
            type: DataTypes.STRING,
        },
        log_chan: {
            type: DataTypes.STRING,
        },
        welcomeSetting: {
            type: DataTypes.BOOLEAN,
        },
        joinRoleSetting: {
            type: DataTypes.BOOLEAN,
        },
        leaveMessage: {
            type: DataTypes.STRING,
        },
        welcomeMessage: {
            type: DataTypes.STRING,
        },

	}, {
		timestamps: false,
	});
};