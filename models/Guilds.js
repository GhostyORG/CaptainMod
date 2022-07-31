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

	}, {
		timestamps: false,
	});
};